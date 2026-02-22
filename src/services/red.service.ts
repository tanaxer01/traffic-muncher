const RED_URL = "https://www.red.cl";

// Is this endpoint realy necesary if we have th gtms data ???
//
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function get_punto_parada(lat: number, lon: number): Promise<any> {
	const res = request(
		"GET",
		`/restservice/rest/getpuntoparada?lat=${lat}&lon=${lon}`,
	);

	return res;
}

export async function get_prediccion_parada(
	codsimt: string,
	codser: string,
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<any> {
	const res = request(
		"GET",
		`/predictor/prediccion?t=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3Mzk0NTc3OTY0MDR9.w0apURYDUgA4wfVBzkpxjWn32MpBQCDGUN0144iimzY&codsimt=${codsimt}&codser=${codser}`,
	);

	return res;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function get_recorrido(codsint: number): Promise<any> {
	const res = request(
		"GET",
		`/restservice_v2/rest/conocerecorrido?codsint=${codsint}`,
	);

	return res;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
async function request(method: string, endpoint: string): Promise<any> {
	const res = await fetch(RED_URL + endpoint, {
		method,
		cache: "default",
	});
	if (!res.ok) throw Error(res.statusText);

	const body = await res.json();
	return body;
}
