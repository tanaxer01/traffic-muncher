import { Stop } from "@/domain";

type selectedProps = {
	selected?: Stop;
};

export default function Selected({ selected }: selectedProps) {
	if (!selected) return <div className="leaflet-top leaflet-right"></div>;
	return (
		<div className="leaflet-top leaflet-right">
			<div className="text-black bg-white leaflet-control leaflet-bar">
				<p className="text-xl">{selected.stop_name}</p>
			</div>
		</div>
	);
}
