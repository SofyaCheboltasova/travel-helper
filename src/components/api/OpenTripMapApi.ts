import axios from "axios";
import {
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

  private url: string = `https://api.opentripmap.com/0.1/${this.lang}/places`;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENTRIPMAP_TOKEN;
    this.radiusParams = {
      radius: 10000,
      lon: 0,
      lat: 0,
      format: "json",
      src_attr: "wikidata",
      rate: "3" && "3h" && "2h" && "2",
      limit: 10,
    };
  }

  private sortByPopularity(places: RadiusResponse[] | undefined) {
    const sortedPlaces =
      places &&
      places
        .sort((a, b) => {
          const rateOrder = ["3", "3h", "2", "2h", "1", "1h", "0"];
          return rateOrder.indexOf(b.rate) - rateOrder.indexOf(a.rate);
        })
        .map((place) => ({ xid: place.xid, point: place.point }));

    return sortedPlaces;
  }

  private async fetchData<T>(endpoint: string, params?: {}) {
    try {
      const response = await axios.get(`${this.url}/${endpoint}`, {
        params: {
          apikey: this.apiKey,
          ...params,
        },
      });

      const data: T = response.data;

      if (!data) {
        throw new Error(`Error fetching data from ${this.url}/${endpoint}`);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  public async getAllPlaces(
    coords: Coordinates,
    radius?: number
  ): Promise<PlaceIdentifier[] | []> {
    const params = {
      ...this.radiusParams,
      lat: coords.lat,
      lon: coords.lon,
      radius: radius || 1000,
    };

    const placesInRadius: RadiusResponse[] | undefined = await this.fetchData<
      RadiusResponse[]
    >("radius", params);

    const sortedPlaces = this.sortByPopularity(placesInRadius);
    return sortedPlaces || [];
  }

  private async getPlaceData(xid: string): Promise<PlaceResponse | undefined> {
    const placeData: PlaceResponse | undefined =
      await this.fetchData<PlaceResponse>(`xid/${xid}`);
    return placeData;
  }

  public async getPlacesData(curPlacesIdentifiers: PlaceIdentifier[]) {
    const fetchedPlacesData = await Promise.allSettled(
      curPlacesIdentifiers.map((place) => this.getPlaceData(place.xid))
    );

    const placesData: PlaceResponse[] = fetchedPlacesData
      .filter((data) => data.status === "fulfilled")
      .map((data) => data.value)
      .filter((data) => data !== undefined);
    return placesData;
  }

  public async getCityCoordinates(cityName: string) {
    const params = { name: cityName };
    const cityData: CityResponse | undefined =
      await this.fetchData<CityResponse>("geoname", params);

    return cityData
      ? {
          name: cityData.name,
          lon: cityData.lon,
          lat: cityData.lat,
        }
      : undefined;
  }
}
