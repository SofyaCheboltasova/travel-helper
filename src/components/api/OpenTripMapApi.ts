import {
  CityParams,
  CityResponse,
} from "../../utils/interfaces/OpenTripMapApi/QueryCity";
import {
  Lang,
  RadiusParams,
  RadiusResponse,
} from "../../utils/interfaces/OpenTripMapApi/QueryRadius";

export default class OpenTripMapApi {
  private lang: Lang = "ru";
  private apiKey: string;
  private radiusParams: RadiusParams;
  private cityParams: CityParams;

  private url: string = `http://api.opentripmap.com/0.1/${this.lang}/places/`;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENTRIP_KEY;

    this.cityParams = { name: "Москва" };

    this.radiusParams = {
      radius: 1000,
      lon: 0,
      lat: 0,
      rate: "1",
      format: "json",
      limit: 10,
    };
  }

  private async handleFetch(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description);
    }
    return data.result;
  }

  private createQueryUrl(
    endpoint: string,
    params: RadiusParams | CityParams
  ): string {
    const filteredParams = Object.entries(params)
      .filter(([, value]) => value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const queryParams = new URLSearchParams(filteredParams);
    queryParams.append("apikey", this.apiKey);

    return `${this.url}${endpoint}?${queryParams.toString()}`;
  }

  private setQueryRadiusParams(lon: number, lat: number, radius?: number) {
    this.radiusParams = {
      ...this.radiusParams,
      lat: lat,
      lon: lon,
      radius: radius || 1000,
    };
  }

  public async getPlacesInRadius(lon: number, lat: number, radius?: number) {
    this.setQueryRadiusParams(lon, lat, radius);
    const queryUrl = this.createQueryUrl("radius", this.radiusParams);

    const places: RadiusResponse[] = await this.handleFetch(queryUrl);
    return places;
  }

  private setQueryCityParams(name: string) {
    this.cityParams = {
      ...this.cityParams,
      name: name,
    };
  }

  public async getCityCoordinates(name: string) {
    this.setQueryCityParams(name);
    const queryUrl = this.createQueryUrl("geoname", this.cityParams);
    const city: CityResponse = await this.handleFetch(queryUrl);

    return {
      lon: city.lon,
      lat: city.lat,
    };
  }
}

