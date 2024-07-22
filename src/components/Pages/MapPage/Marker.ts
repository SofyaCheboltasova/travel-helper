import { load } from "@2gis/mapgl";
import { Coordinates } from "../../../utils/interfaces/OpenTripMapApi/QueryCity";
import { Map as GisMap, Marker as GisMarker } from "@2gis/mapgl/types";

export default class Marker {
  public async getMarkers(gisMap: GisMap, locations: Coordinates[]) {
    const mapglAPI = await load();

    const markers = locations.map((loc) => {
      if (!loc) {
        return undefined;
      }
      const marker = new mapglAPI.Marker(gisMap, {
        coordinates: [loc.lon, loc.lat],
      });
      marker.show();
      return marker;
    });
    return markers.filter((marker) => marker !== undefined);
  }

  public removeMarkers = (markers: GisMarker[]) => {
    markers.forEach((marker) => {
      marker && marker.hide();
    });
  };
}

// useEffect(() => {
//   const setMarkers = async () => {
//     const mapglAPI = await load();

//     markersRef.current.forEach((marker) => marker.destroy());
//     markersRef.current = [];

//     currentPlaces.forEach((place) => {
//       const htmlContent = ReactDOMServer.renderToString(
//         <Marker name={place.xid} />
//       );
//       const marker = new mapglAPI.HtmlMarker(mapRef.current as Map, {
//         coordinates: [place.point.lon, place.point.lat],
//         html: htmlContent,
//         interactive: true,
//       });
//       markersRef.current.push(marker);
//     });
//   };

//   setMarkers();

//   return () => {
//     markersRef.current.forEach((marker) => marker.destroy());
//     markersRef.current = [];
//   };
// }, [currentPlaces]);

