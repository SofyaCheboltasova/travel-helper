import { Coordinates } from "./QueryCity";

interface PlaceResponse {
  xid: string;
  point: Coordinates;
  name: string;
  kinds: string;
  wikipedia: string;
  image: string;
  info: {
    descr: string;
  };
}

export type { PlaceResponse };

