import { fetchFromRadar } from "flightradar24-client";

export async function fetchFlights(north, west, south, east) {
  const response = await fetchFromRadar(Number(north), Number(west), Number(south), Number(east));
  return response;
}
