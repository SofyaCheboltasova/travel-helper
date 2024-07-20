import {
  CityParams,
  CityResponse,
  Coordinates,
} from "../../utils/interfaces/OpenTripMapApi/QueryCity";
import {
  PlaceIdentifier,
  PlaceResponse,
} from "../../utils/interfaces/OpenTripMapApi/QueryPlace";
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
      radius: 10000,
      lon: 0,
      lat: 0,
      format: "json",
      src_attr: "wikidata" && "osm",
      rate: "3" && "3h" && "2h" && "2",
      limit: 10,
    };
  }

  private async handleFetch(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  }

  private createQueryUrl(
    endpoint: string,
    params?: RadiusParams | CityParams
  ): string {
    const filteredParams = params
      ? Object.entries(params)
          .filter(([, value]) => value)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
      : "";

    const queryParams = new URLSearchParams(filteredParams);
    queryParams.append("apikey", this.apiKey);

    return `${this.url}${endpoint}?${queryParams.toString()}`;
  }

  private setQueryRadiusParams(coords: Coordinates, radius?: number) {
    this.radiusParams = {
      ...this.radiusParams,
      lat: coords.lat,
      lon: coords.lon,
      radius: radius || 1000,
    };
  }

  private async fetchPlaceData(xid: string): Promise<PlaceResponse> {
    const queryUrl = this.createQueryUrl(`xid/${xid}`);
    const placeResponse: PlaceResponse = await this.handleFetch(queryUrl);
    return placeResponse;
  }

  public async getAllPlaces(
    coords: Coordinates,
    radius?: number
  ): Promise<PlaceIdentifier[]> {
    this.setQueryRadiusParams(coords, radius);
    const queryUrl = this.createQueryUrl("radius", this.radiusParams);

    const places: RadiusResponse[] = await this.handleFetch(queryUrl);

    const sortedPlaces = places
      .sort((a, b) => {
        const rateOrder = ["3", "3h", "2", "2h", "1", "1h", "0"];
        return rateOrder.indexOf(b.rate) - rateOrder.indexOf(a.rate);
      })
      .map((place) => ({ xid: place.xid, point: place.point }));
    return sortedPlaces;
  }

  public async getPlacesData(curPlacesIdentifiers: PlaceIdentifier[]) {
    const fetchedPlacesData = await Promise.allSettled(
      curPlacesIdentifiers.map((place) => this.fetchPlaceData(place.xid))
    );

    const placesData: PlaceResponse[] = fetchedPlacesData
      .filter((data) => data.status === "fulfilled")
      .map((data) => (data as PromiseFulfilledResult<PlaceResponse>).value);

    return placesData;
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
      name: city.name,
      lon: city.lon,
      lat: city.lat,
    };
  }
}

