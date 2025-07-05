import airports from '../../public/airports.json' with { type: 'json' };

export function getAirportByICAO(icao){
    const icaoLowerCase = icao.toLowerCase();
    const airport = airports.find(airport => {
        return airport.icao_code.toLowerCase() === icaoLowerCase || airport.gps_code.toLowerCase() === icaoLowerCase;
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

export function getAirportByCity(city){
    const cityLowerCase = city.toLowerCase();
    const airport = airports.filter((airport) => {
        const hasMatchingCityName = cityLowerCase
          .split(' ')
          .every((search) =>
            airport.municipality.toString().toLowerCase().includes(search.toLowerCase())
          );
  
        return hasMatchingCityName;
      });
    if (airport.length === 0) {
        throw new Error('Airport not found'); // Throw an error if no airport is found
    }
    return airport
}