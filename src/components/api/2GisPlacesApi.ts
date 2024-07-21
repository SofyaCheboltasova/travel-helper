import { BoundingBox } from "../../redux/types";
import Category from "../../utils/interfaces/Category";
import axios from "axios";
import { Coordinates } from "../../utils/interfaces/OpenTripMapApi/QueryCity";
/**
 * @param {PlacesApiProps} props
 *
 * Called, when following states change:
 * - Zoom out
 * - Category added
 * - Map moved
 */

export default class PlacesApi {
  private API_KEY: string = import.meta.env.VITE_2GIS_KEY;

  /**
	 * 
	 * @example
	 * https://docs.2gis.com/ru/api/search/regions/overview
	 * Ответ на запрос возвращается в формате JSON:
		{
			"result": {
				"items": [
					{
						"id": "32",
						"name": "Москва",
						"type": "region"
					}
				],
				"total": 1
			}
		}
	 * 
	*/

  private async getRegionIdByName(cityName: string): Promise<string> {
    const response = await fetch(
      `https://catalog.api.2gis.com/2.0/region/search?q=${cityName}&key=${this.API_KEY}`
    );
    if (!response.ok) {
      console.error("Error finding region:", response.statusText);
    }

    const data = await response.json();
    const regionId: string = data.result.items[0].id;
    return regionId;
  }

  private async getCategoryIdByName(
    name: string,
    regionId: string
  ): Promise<string> {
    const response = await fetch(
      `https://catalog.api.2gis.com/2.0/catalog/rubric/search?region_id=${regionId}&q=${name}&key=${this.API_KEY}`
    );
    if (!response.ok) {
      console.error("Error finding region:", response.statusText);
    }

    const data = await response.json();
    const categoryId: string = data.result.items[0].id;
    return categoryId;
  }

  private boundingBoxToPoints(boundingBox: BoundingBox): {
    point1: string;
    point2: string;
  } {
    const { southWest, northEast } = boundingBox;
    const point1 = `${southWest[0]},${northEast[1]}`;
    const point2 = `${northEast[0]},${southWest[1]}`;

    return { point1, point2 };
  }

  private async getCompaniesData(
    cityName: string,
    categories: Category[],
    boundingBox: BoundingBox
  ) {
    const regionId: string = await this.getRegionIdByName(cityName);
    const rubricIds = await Promise.all(
      categories.map(
        async (category) =>
          await this.getCategoryIdByName(category.name, regionId)
      )
    );

    const rubricIdsString = rubricIds.join(",");
    const { point1, point2 } = this.boundingBoxToPoints(boundingBox);

    try {
      const response = await axios.get(
        "https://catalog.api.2gis.com/3.0/items",
        {
          params: {
            rubric_id: rubricIdsString,
            point1: point1,
            point2: point2,
            key: this.API_KEY,
          },
        }
      );
      return response.data.result;
    } catch (error) {
      console.error("Error fetching catalog items:", error);
      throw error;
    }
  }

  private async getPointByAddress(address: string) {
    try {
      const response = await axios.get(
        "https://catalog.api.2gis.com/3.0/items/geocode",
        {
          params: {
            q: address,
            fields: "items.point",
            key: this.API_KEY,
          },
        }
      );
      return response.data.result;
    } catch (error) {
      console.error("Error fetching catalog items:", error);
      throw error;
    }
  }

  public async getCompaniesLocations(
    cityName: string,
    categories: Category[],
    boundingBox: BoundingBox
  ) {
    const companiesData = await this.getCompaniesData(
      cityName,
      categories,
      boundingBox
    );

    if (!companiesData.items) {
      console.error("No companies in category");
      return;
    }

    const points: Coordinates[] = await Promise.all(
      companiesData.items.map(
        async (company: { full_name: string; address_name: string }) => {
          const response = await this.getPointByAddress(company.full_name);
          if (response && response.items.length > 0) {
            return response.items[0].point;
          }
        }
      )
    );

    return points;
  }
}

