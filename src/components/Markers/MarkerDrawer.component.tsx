import { useReducer, useState } from "react";
import { Circle, useMap, useMapEvent } from "react-leaflet";
import { Stop } from "@/domain";
import { get_stop_info } from "@/services/appred.service";
import PredictionMarker from "./PredictionMarker.component";
import Selected from "../Selected";

type drawerProps = {
	stops: Stop[];
};

const markerMapper = (input: any) => {
	switch (input.type) {
		case "stop": {
		}
	}
};

export default function MarkerDrawer({ stops }: drawerProps) {
	const map = useMap();
	const [selected, setSelected] = useState();
	const [test, setTest] = useState([]);
	const [visibleMarkers, dispatch] = useReducer(() => {
		return stops.filter(
			(m) =>
				map.getBounds().contains([m.stop_lat, m.stop_lon]) &&
				map.getZoom() > 13,
		);
	}, []);

	useMapEvent("move", () => dispatch());

	return (
		<>
			{visibleMarkers
				?.map((m, i: number) => (
					<CircleMarker
						key={`m${i}`}
						marker={m}
						setTest={setTest}
						setSelected={setSelected}
					/>
				))
				.concat(
					test.map((p, i: number) => (
						<PredictionMarker key={i} prediction={p} />
					)),
				)}
			<Selected selected={selected} />
		</>
	);
}

function CircleMarker({
	marker,
	setTest,
	setSelected,
}: {
	marker: Stop;
	setTest: any;
	setSelected: any;
}) {
	return (
		<Circle
			center={[marker.stop_lat, marker.stop_lon]}
			radius={5}
			eventHandlers={{
				click() {
					setSelected(marker);
					console.log("Searching...", marker.stop_id);

					fetch(`/api?stop_id=${marker.stop_id}&mode=3`)
						.then((res) => res.json())
						.then((res) => {
							console.log(res);
							setTest(res.predictions);
						});
				},
			}}
		/>
	);
}
