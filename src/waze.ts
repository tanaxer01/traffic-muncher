type Coords = {
	top: number;
	bottom: number;
	left: number;
	right: number;
};

type Opts = {
	env: 'row';
	types: ('alerts' | 'traffic' | 'users')[];
};

export type Alert = {
	nThumbsUp: number;
	reportRating: number;
	reportByMunicipalityUser: string;
	reliability: number;
	type: string;
	fromNodeId: number;
	uuid: string;
	speed: number;
	reportMood: number;
	subtype: string;
	street?: string;
	provider: string;
	providerId: string;
	additionalInfo: string;
	toNodeId: number;
	id: string;
	nComments: number;
	reportBy: string;
	inscale: boolean;
	comments: [any]; //!!!
	confidence: number;
	magvar: number;
	wazeData: string;
	reportDescription: string;
	location: { x: number; y: number };
	pubMillis: any; //!!!
};

export type WazeResponse = {
	alerts: Alert[];
	traffic: any[]; //!!! Placeholder for traffic data
	users: any[]; //!!! Placeholder for user data
	endTimeMillis: any; // !!!,
	startTimeMillis: any; // !!!,
	startTime: string;
	endTime: string;
};

export async function fetch_waze({ top, bottom, left, right, env, types }: Coords & Opts): Promise<WazeResponse> {
	const coords = `top=${top}&bottom=${bottom}&left=${left}&right=${right}`;
	const opts = `env=${env}&types=${types}`;
	const url = `https://www.waze.com/live-map/api/georss?${coords}&${opts}`;
	console.log(url);

	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch Waze data: ${res.statusText}`);
	}

	const body: WazeResponse = await res.json();
	return body;
}
