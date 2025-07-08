import { fetchFromRadar } from "flightradar24-client";

export async function fetchFlights(north, west, south, east) {
  try {
    const response = await fetchFromRadar(Number(north), Number(west), Number(south), Number(east));
    return response; 
  } catch (error) {
    throw new Error('Failed to fetch flights: ' + error.message);
  }
}
