import { promises as fs } from "fs";
import { Stop } from "@/domain";
import { LatLngTuple } from "leaflet";

const STAGE = process.env.STAGE;

export async function get_all_stops(): Promise<Stop[]> {
	if (STAGE !== "prod") console.time("Parsing stop file");

	const file = await fs.readFile(
		process.cwd() + "/src/assets/gtfs/stops.txt",
		"utf8",
	);
	if (STAGE !== "prod") console.timeLog("Parsing stop file");

	const stops = file
		?.split("\r\n")
		.slice(1)
		.map((s) => {
			const ss = s.split(",");
			return {
				stop_id: ss[0],
				stop_code: ss[1],
				stop_name: ss[2],
				stop_lat: parseFloat(ss[3]),
				stop_lon: parseFloat(ss[4]),
				stop_url: ss[5],
				wheelchair_boarding: ss[6],
				location_type: ss[7],
				parent_station: ss[8],
			};
		});
	if (STAGE !== "prod") console.timeEnd("Parsing stop file");

	return stops;
}

export async function get_all_routes(): Promise<any> {
	const file = await fs.readFile(
		process.cwd() + "/src/assets/gtfs/shapes.txt",
		"utf8",
	);
	const dots = file
		.split("\n")
		.slice(1)
		.reduce(
			(acc, curr) => {
				const line = curr.split(",");
				acc[line[0]] = [parseFloat(line[1]), parseFloat(line[2])];
				return acc;
			},
			{} as { [key: string]: LatLngTuple },
		);

	return dots;
}

// export function find_many_stops(filter) { }
