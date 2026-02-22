import { LatLngTuple } from "leaflet";

import Map from "@/components/Map";
import { get_all_stops } from "@/services/gtfs.service";

const position: LatLngTuple = [-33.44386773877699, -70.6535822115763];

export default async function Home() {
  const stops = (await get_all_stops()).filter((s) => s.stop_lat && s.stop_lon);
  return (
    <div className="h-screen w-screen">
      <Map center={position} markers={stops} />
    </div>
  );
}
