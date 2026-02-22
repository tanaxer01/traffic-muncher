import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const params = request.nextUrl.searchParams;
	const id = params.get("stop_id");
	const mode = params.get("mode");

	if (!id || !mode)
		return NextResponse.json({
			error: `missing query params in request - received: ${params.toString()}`,
		});

	const options = {
		method: "GET",
		headers: {
			Host: "appred2.tstgo.cl",
			Accept: "*/*",
			"User-Agent": "Darwin 18.3 - 2.16.8",
			"App-Version": "2.16.8",
			"Accept-Language": "en-US,en;q=0.9",
			"Accept-Encoding": "gzip, deflate, br",
			Connection: "keep-alive",
			"Phone-id": "aaa",
		},
	};

	try {
		const res = await fetch(
			`https://appred2.tstgo.cl/phone/v9/stopInfo?stopCode=${id}&mode=${mode}`,
			options,
		);

		const body = await res.json();
		return Response.json(body, { status: 200 });

		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	} catch (jsSucks: any) {
		// this bish cant even make a http return right >:C
		if (jsSucks.cause.code === "HPE_INVALID_HEADER_TOKEN") {
			const body = jsSucks.cause.data.split("\r\n").pop();

			const jsonBody = JSON.parse(body);
			return Response.json(jsonBody, { status: 200 });
		}

		return Response.json(jsSucks, { status: 500 });
	}
}
