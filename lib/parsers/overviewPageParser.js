import cheerio from 'cheerio';
import {
  parseTimestamp,
  parsePlanetHeaders,
  parseBuildingCountdown,
  parseResearchCountdown,
  parseShipyardCountdown,
  parseEnemyAttacks,
} from './shared';

export const overviewPageParser = (page) => {
  const root = cheerio.load(page);
  return {
    timestamp: parseTimestamp(root),
    planet: {
      ...parsePlanetHeaders(root),
      buildingCountdown: parseBuildingCountdown(root),
      researchCountdown: parseResearchCountdown(root),
      shipyardCountdown: parseShipyardCountdown(root),
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default overviewPageParser;
