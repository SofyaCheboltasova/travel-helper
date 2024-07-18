interface QueryRadiusParams {
  radius: number;
  lon: number;
  lat: number;
  src_geom?: string;
  src_attr?: "osm" | "wikidata" | "snow" | "cultura.ru" | "rosnedra" | "user";
  kinds?: string;
  name?: string;
  rate?: "1" | "2" | "3" | "1h" | "2h" | "3h";
  format?: "json" | "geojson" | "count";
  limit?: number;
}

type Lang = "ru" | "en";

interface Point {
  lon: number;
  lat: number;
}

interface QueryRadiusResponse {
  name: string;
  osm: string;
  xid: string;
  wikidata?: string;
  kind: string;
  point: Point;
}

export type { QueryRadiusParams, QueryRadiusResponse, Lang };

