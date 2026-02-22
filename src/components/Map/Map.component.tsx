"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import type { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import MarkerDrawer from "../Markers/MarkerDrawer.component";
import { Stop } from "@/domain";

export type MapProps = {
	center: LatLngExpression | LatLngTuple;
	zoom?: number;
	markers?: Stop[];
};

export default function MapComponent({
	center,
	zoom = 13,
	markers = [],
}: MapProps) {
	return (
		<MapContainer
			center={center}
			zoom={zoom}
			scrollWheelZoom={false}
			style={{ height: "100%", width: "100%" }}
		>
			<TileLayer
				attribution=""
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<MarkerDrawer stops={markers} />
		</MapContainer>
	);
}
