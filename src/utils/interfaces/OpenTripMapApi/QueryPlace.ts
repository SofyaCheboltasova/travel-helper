import { Coordinates } from "./QueryCity";

interface PlaceIdentifier {
  xid: string;
  point: Coordinates;
}

interface PlaceResponse extends PlaceIdentifier {
  name: string;
  wikipedia?: string;
  rate: "2" | "3" | "2h" | "3h";
  preview?: {
    height: number;
    source: string;
    width: number;
  };
  wikipedia_extracts?: {
    html: string;
    text: string;
    title: string;
  };
}

export type { PlaceResponse, PlaceIdentifier };
