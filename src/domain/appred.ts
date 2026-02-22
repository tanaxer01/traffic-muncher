export type Prediction = {
	licensePlate: string;
	machineId: string;
	color: string;
	avatarId: number;
	avatarBaseId: number;
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

export type StopInfo = {
	predictions: Prediction[];
};
