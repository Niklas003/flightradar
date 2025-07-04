import airports from '../../public/airports.json' with { type: 'json' };

export function getAirportByICAO(icao){
    const icaoLowerCase = icao.toLowerCase();
    const airport = airports.find(airport => {
        return airport.icao_code.toLowerCase() === icaoLowerCase;
    })
    if (!airport) {
        throw new Error('Airport not found'); // Throw an error if no airport is found
    }
    return airport
}

export function getAirportByIATA(iata){
    const iataLowerCase = iata.toLowerCase();
    const airport = airports.find(airport => {
        return airport.iata_code.toLowerCase() === iataLowerCase;
    })
    if (!airport) {
        throw new Error('Airport not found'); // Throw an error if no airport is found
    }
    return airport
}