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

      const categoryIds: string = response.data.result.items
        .map((item: { id: string }) => item.id)
        .join(",");

      this.categoryIdCache.set(name, categoryIds);
      return categoryIds;
    } catch (error) {
      console.error("Error fetching catalog items:", error);
      throw error;
    }
  }

  private async getCompaniesData(city: CityIdentifier, category: Category) {
    /*
		Change rubric_id: category.rubricId to rubricId to make requests
			const regionId: string = await this.getRegionIdByName(city.name);
    	const rubricId = await this.getCategoryIdByName(category.name, regionId);
		*/

    try {
      const response = await axios.get(
        "https://catalog.api.2gis.com/3.0/items",
        {
          params: {
            rubric_id: category.rubricId,
            point: `${city.lon}, ${city.lat}`,
            radius: this.radius,
            key: this.API_KEY,
          },
        }
      );
      return response.data.result.items;
    } catch (error) {
      console.error("No companies in category:", error);
      throw error;
    }
  }

  private async getPointByAddress(name: string, address: string) {
    try {
      const response = await axios.get(
        "https://catalog.api.2gis.com/3.0/items/geocode",
        {
          params: {
            q: `${name} ${address}`,
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

    const locations: Coordinates[] = await Promise.all(
      companiesData.map(
        async (company: { name: string; address_name: string }) => {
          const response = await this.getPointByAddress(
            company.name,
            company.address_name
          );
          if (response && response.items) {
            return response.items[0].point;
          }
        }
      )
    );
    return locations;
  }
}

