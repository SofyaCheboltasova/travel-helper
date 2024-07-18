import {
  Lang,
  QueryRadiusParams,
  QueryRadiusResponse,
} from "../../utils/interfaces/OpenTripMapApi/QueryRadius";

export default class OpenTripMapApi {
  private lang: Lang = "ru";
  private apiKey: string;
  private queryString: string = "";
  private radiusParams: QueryRadiusParams;
  private url: string = `http://api.opentripmap.com/0.1/${this.lang}/places/`;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENTRIP_KEY;
    this.radiusParams = {
      radius: 1000,
      lon: 0,
      lat: 0,
      rate: "1",
      format: "json",
      limit: 10,
    };
  }

  private setQueryRadiusParams(lon: number, lat: number, radius?: number) {
    this.radiusParams = {
      ...this.radiusParams,
      lat: lat,
      lon: lon,
      radius: radius || 1000,
    };
  }

  private createQueryUrl(endpoint: string) {
    const filteredParams = Object.entries(this.radiusParams)
      .filter(([key, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const queryParams = new URLSearchParams(filteredParams);
    queryParams.append("apikey", this.apiKey);

    this.queryString = `${this.url}${endpoint}?${queryParams.toString()}`;
  }

  private async handleFetch(queryString: string) {
    const response = await fetch(queryString);

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description);
    }

    return data.result;
  }

  public async getPlacesInRadius(lon: number, lat: number, radius?: number) {
    this.setQueryRadiusParams(lon, lat, radius);
    this.createQueryUrl("radius");

    const radiusResponse: QueryRadiusResponse[] = await this.handleFetch(
      this.queryString
    );

    return radiusResponse;
  }
}

