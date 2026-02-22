"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { MapProps } from "./Map.component";

export default function MapContainer(props: MapProps) {
	const MapComponent = useMemo(
		() => dynamic(() => import("./Map.component"), { ssr: false }),
		[],
	);

	return <MapComponent {...props} />;
}
