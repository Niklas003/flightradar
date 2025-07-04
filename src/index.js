import express from "express";
import { fetchFlights } from "./functions/fetchFlights.js";
import path from "path";
import { getAirportByIATA, getAirportByICAO } from "./functions/getAirport.js";

const app = express();
const port = 4000;
app.listen(port, () => console.log(`The server is listening on port ${port}`));
app.use("/logos", express.static(path.join(process.cwd(), "public", "logos")));
app.use(
  "/banners",
  express.static(path.join(process.cwd(), "public", "banners"))
);

//http://localhost:4000/flights?north=53&west=13&south=52&east=14
app.get("/flights", async (req, res) => {
  try {
    let response = await fetchFlights(
      req.query.north,
      req.query.west,
      req.query.south,
      req.query.east
    );
    res.json(response);
  } catch {
    res.status(404).json({ error: "Not Found" });
  }
  res.json(response);
});

//http://localhost:4000/logo?icao=dlh
app.get("/logo", (req, res) => {
  const icao = req.query.icao;
  const banner = req.query.banner;
  if (!icao) {
    return res.status(400).json({ error: "Missing ICAO param" });
  }
  const fileName = `${icao.toString().toUpperCase()}.png`;

  let filePath;
  if (banner && banner.toLowerCase() === "true") {
    filePath = path.resolve(process.cwd(), "public", "banners", fileName);
  } else {
    filePath = path.resolve(process.cwd(), "public", "logos", fileName); // korrekt absoluter Pfad
  }
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "Logo not found" });
    }
  });
});

//http://localhost:4000/airport?icao=EDDF
app.get("/airport", (req, res) => {
  const icao = req.query.icao;
  const iata = req.query.iata;
  if (!icao && !iata) {
    return res.status(400).json({ error: "Missing Airport Code" });
  }
  try {
    let airport;
    if (icao) {
      airport = getAirportByICAO(icao);
    } else if (iata) {
      airport = getAirportByIATA(iata);
    }
    res.json(airport);
  } catch (error) {
    return res.status(404).json({ error: "An error has occurred" });
  }
});
