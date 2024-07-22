import axios from "axios";

import Category from "../../utils/interfaces/Category";
import {
  CityIdentifier,
  Coordinates,
} from "../../utils/interfaces/OpenTripMapApi/QueryCity";

export default class PlacesApi {
  private API_KEY: string = import.meta.env.VITE_2GIS_KEY;

  private regionIdCache: Map<string, string> = new Map();
  private categoryIdCache: Map<string, string> = new Map();

  private radius: number = 40000;

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
				]
			}
		}
	 * 
	*/

  private async getRegionIdByName(cityName: string): Promise<string> {
    if (this.regionIdCache.has(cityName)) {
      return this.regionIdCache.get(cityName)!;
    }

    try {
      const response = await axios.get(
        "https://catalog.api.2gis.com/2.0/region/search",
        {
          params: {
            q: cityName,
            key: this.API_KEY,
          },
        }
      );
      const regionId: string = response.data.result.items[0].id;
      this.regionIdCache.set(cityName, regionId);
      return regionId;
    } catch (error) {
      console.error("Error fetching catalog items:", error);
      throw error;
    }
  }

  private async getCategoryIdByName(
    name: string,
    regionId: string
  ): Promise<string> {
    if (this.categoryIdCache.has(name)) {
      return this.categoryIdCache.get(name)!;
    }

    try {
      const response = await axios.get(
        "https://catalog.api.2gis.com/2.0/catalog/rubric/search",
        {
          params: {
            region_id: regionId,
            q: name,
            key: this.API_KEY,
          },
        }
      );
      const categoryId: string = response.data.result.items[0].id;
      this.categoryIdCache.set(name, categoryId);
      return categoryId;
    } catch (error) {
      console.error("Error fetching catalog items:", error);
      throw error;
    }
  }

  private async getCompaniesData(city: CityIdentifier, category: Category) {
    const regionId: string = await this.getRegionIdByName(city.name);
    const rubricId = await this.getCategoryIdByName(category.name, regionId);

    try {
      const response = await axios.get(
        "https://catalog.api.2gis.com/3.0/items",
        {
          params: {
            rubric_id: rubricId,
            point: `${city.lon}, ${city.lat}`,
            radius: this.radius,
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
    city: CityIdentifier,
    category: Category | null
  ): Promise<Coordinates[] | undefined> {
    if (!category) return;
    const companiesData = await this.getCompaniesData(city, category);

    if (!companiesData.items) {
      console.error("No companies in category");
      return;
    }

    const locations: Coordinates[] = await Promise.all(
      companiesData.items.map(
        async (company: { full_name: string; address_name: string }) => {
          const response = await this.getPointByAddress(company.full_name);
          if (response && response.items) {
            return response.items[0].point;
          }
        }
      )
    );
    return locations;
  }
}

