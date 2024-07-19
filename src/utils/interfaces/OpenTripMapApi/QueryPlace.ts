import { Coordinates } from "./QueryCity";

interface PlaceResponse {
  xid: string;
  point: Coordinates;
  name: string;
  kinds: string;
  wikipedia?: string;
  rate: "2" | "3" | "2h" | "3h";
  preview?: {
    height: number;
    sources: string;
    width: number;
  };
  wikipedia_extracts?: {
    html: string;
    text: string;
    title: string;
  };
}

export type { PlaceResponse };

