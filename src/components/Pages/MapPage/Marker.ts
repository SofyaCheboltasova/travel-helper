import { load } from "@2gis/mapgl";
import { Map as GisMap, Marker as GisMarker } from "@2gis/mapgl/types";
import { Coordinates } from "../../../utils/interfaces/OpenTripMapApi/QueryCity";

export interface CompanyData {
  name: string;
  full_address_name: string;
  description: string;
  point: Coordinates;
  external_content: [{ main_photo_url: string }];
  rubrics: [{ name: string }];
}

export default class Marker {
  public openedMarker: GisMarker | undefined = undefined;

  public async getMarkers(
    gisMap: GisMap,
    companies: CompanyData[],
    iconPath: string,
    handleMarkerClick: (marker: CompanyData) => void
  ) {
    const mapglAPI = await load();

    const markers = companies.map((company) => {
      if (!company) return;

      const marker = new mapglAPI.Marker(gisMap, {
        coordinates: [company.point.lon, company.point.lat],
        icon: iconPath,
        size: [48, 48],
      });
      marker.show();
      marker.on("click", () => {
        this.openedMarker = marker;
        handleMarkerClick(company);
      });
      return marker;
    });
    return markers.filter((marker) => !!marker);
  }

  public removeMarkers = (markers: GisMarker[]) => {
    if (markers) {
      markers.forEach((marker) => {
        marker && marker.hide();
      });
    }
  };
}

