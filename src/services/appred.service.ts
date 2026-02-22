import { StopInfo } from "@/domain/appred";

const APP_RED_URL = "https://appred2.tstgo.cl/phone/v9/";

export async function get_stop_info(
	stop_code: string,
	mode: string,
): Promise<StopInfo> {
	try {
		const res = await request(
			"get",
			`stopInfo?stopCode=${stop_code}&mode=${mode}`,
		);

		return res;
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	} catch (jsSucks: any) {
		// this bish cant even make a http return right >:C
		if (jsSucks.cause.code === "HPE_INVALID_HEADER_TOKEN") {
			const body = jsSucks.cause.data.split("\r\n").pop();
			const jsonBody = JSON.parse(body);

			return jsonBody;
		}

		throw jsSucks;
	}
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
async function request(method: string, endpoint: string): Promise<any> {
	const res = await fetch(APP_RED_URL + endpoint, {
		method,
		cache: "default",
		headers: {
			"Phone-id": "aaa",
		},
	});

	if (!res.ok) throw Error(res.statusText);

	const body = await res.json();
	return body;
}
