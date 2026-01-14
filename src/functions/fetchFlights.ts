import { fetchFromRadar } from "../../node_modules/flightradar24-client";

export async function fetchFlights(north:any, west:any, south:any, east:any) {
  try {
    const response = await fetchFromRadar(Number(north), Number(west), Number(south), Number(east));
    return response; 
  } catch (error) {
    throw new Error('Failed to fetch flights: ' + (error as Error).message);
  }
}
