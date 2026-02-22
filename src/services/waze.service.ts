const WAZE_URL = "https://www.waze.com/live-map/api/georss?";

export type Coords = {
  top: string;
  bottom: string;
  left: string;
  right: string;
};

export async function get_alerts({ top, bottom, left, right }: Coords) {
  const coords = `top=${top}&bottom=${bottom}&left=${left}&right=${right}`;
  const info = `types=alerts&env=row`;

  const res = await request("GET", coords + "&" + info);
  return res;
}

export async function get_traffic({ top, bottom, left, right }: Coords) {
  const coords = `top=${top}&bottom=${bottom}&left=${left}&right=${right}`;
  const info = `types=traffic&env=row`;

  const res = await request("GET", coords + "&" + info);
  return res;
}

export async function get_all_info({ top, bottom, left, right }: Coords) {
  const coords = `top=${top}&bottom=${bottom}&left=${left}&right=${right}`;
  const info = `types=traffic,alerts&env=row`;

  const res = await request("GET", coords + "&" + info);
  return res;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
async function request(method: string, endpoint: string): Promise<any> {
  const res = await fetch(WAZE_URL + endpoint, { method });
  if (!res.ok) throw Error(res.statusText);

  const body = await res.json();
  return body;
}
