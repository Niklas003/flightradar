import fs from 'fs'
import path from 'path'

const airportsPath = path.resolve(process.cwd(), 'public', 'airports.json')
let airports: any[] = []
try {
  const raw = fs.readFileSync(airportsPath, 'utf-8')
  airports = JSON.parse(raw)
} catch (err) {
  console.error('Failed to load airports.json', err)
}

export function getAirportByICAO(icao: any){
    const parsedAirports = airports
    const icaoLowerCase = icao.toString().toLowerCase();
    const airport = parsedAirports.find(airport => {
        return airport.icao_code.toLowerCase() === icaoLowerCase || airport.gps_code.toLowerCase() === icaoLowerCase;
    })
    if (!airport) {
        throw new Error('Airport not found');
    }
    return airport
}

export function getAirportByIATA(iata: any){
    const parsedAirports = airports
    const iataLowerCase = iata.toString().toLowerCase();
    const airport = parsedAirports.find(airport => {
        return airport.iata_code.toLowerCase() === iataLowerCase;
    })
    if (!airport) {
        throw new Error('Airport not found');
    }
    return airport
}

export function getAirportByCity(city:any){
    const cityLowerCase = city.toString().toLowerCase();
    const parsedAirports = airports
    const airport = parsedAirports.filter((airport) => {
        const hasMatchingCityName = cityLowerCase
          .split(' ')
          .every((search: string) =>
            airport.municipality.toString().toLowerCase().includes(search.toLowerCase())
          );

        return hasMatchingCityName;
      });
    if (airport.length === 0) {
        throw new Error('Airport not found');
    }
    return airport
}