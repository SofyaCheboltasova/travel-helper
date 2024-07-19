interface CityParams {
  name: string;
  country?: string;
}

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

export type { CityParams, CityResponse, Coordinates };

