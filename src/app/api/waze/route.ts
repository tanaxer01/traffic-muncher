import { get_alerts } from "@/services/waze.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const search_params = request.nextUrl.searchParams;
  const coords = {
    top: search_params.get("top") || "",
    bottom: search_params.get("bottom") || "",
    right: search_params.get("right") || "",
    left: search_params.get("left") || "",
  };

  const response = await get_alerts(coords);
  return Response.json(response);
}
