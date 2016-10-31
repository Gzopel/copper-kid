import cheerio from 'cheerio';
import {
  parsePlanetId,
  parsePlanetName,
  parsePlanetCoordinates,
  parserResources,
  parseTimestamp,
  parsePlanetType,
  parseBuildingCountdown,
  parseResearchCountdown,
  parseShipyardCountdown,
} from './shared';

export const overviewPageParser = (page) => {
  const root = cheerio.load(page);
  return {
    planet: {
      coordinates: parsePlanetCoordinates(root),
      planetId: parsePlanetId(root),
      planetName: parsePlanetName(root),
      resources: parserResources(root),
      timestamp: parseTimestamp(root),
      planetType: parsePlanetType(root),
      buildingCountdown: parseBuildingCountdown(root),
      researchCountdown: parseResearchCountdown(root),
      shipyardCountdown: parseShipyardCountdown(root),
    },
  };
};

export default overviewPageParser;
