import { Coordinates } from "./QueryCity";

interface PlaceParams {
  xid: string;
}

interface PlaceResponse {
  point: Coordinates;
  name: string;
  wikipedia: string;
  image: string;
  info: {
    descr: string;
  };
}

export type { PlaceParams, PlaceResponse };

