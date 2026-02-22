export type Stop = {
	stop_id: string;
	stop_code?: string;
	stop_name: string;
	stop_lat: number;
	stop_lon: number;
	stop_url?: string;
	wheelchair_boarding?: string;
	location_type?: string;
	parent_station?: string;
};

export type Bus = {
	licensePlate: string;
	machineId: string;
	color: number;
	avatarId: number; // meh
	avatarBaseId: number; // meh
	route: string;
	distanceLabel: string;
	timeLabel: string;
	valid: number;
	distance: number;
	passengerNumber: number;
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	events: any;
	latitude: number;
	longitude: number;
	direction: string;
	random: boolean;
	machineFaceDirection: string;
	resourceId: number;
};
