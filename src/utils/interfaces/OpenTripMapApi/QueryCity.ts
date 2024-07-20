interface CityResponse {
  country: string;
  timezone: string;
  name: string;
  lon: number;
  lat: number;
  population: number;
}

interface Coordinates {
  lon: number;
  lat: number;
}

interface CityParams {
  name: string;
}

type CityIdentifier = CityParams & Coordinates;

export type { CityIdentifier, CityParams, CityResponse, Coordinates };

