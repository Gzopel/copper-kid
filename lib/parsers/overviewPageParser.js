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
  parseEnemyAttacks,
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
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default overviewPageParser;
