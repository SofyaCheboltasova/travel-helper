import axios from "axios";

import Category from "../../utils/interfaces/Category";
import { CityIdentifier } from "../../utils/interfaces/OpenTripMapApi/QueryCity";

export default class PlacesApi {
  private API_KEY: string = import.meta.env.VITE_2GIS_KEY;
  private radius: number = 10000;

  public async getCompaniesData(city: CityIdentifier, category: Category) {
    const params = {
      rubric_id: category.rubricId,
      point: `${city.lon}, ${city.lat}`,
      fields:
        "items.point,items.full_address_name,items.description,items.external_content,items.rubrics",
      radius: this.radius,
      key: this.API_KEY,
    };

    try {
      const response = await axios.get(
        "https://catalog.api.2gis.com/3.0/items",
        {
          params: params,
        }
      );
      return response.data.result.items;
    } catch (error) {
      console.error("No companies in category:", error);
    }
  }
}

