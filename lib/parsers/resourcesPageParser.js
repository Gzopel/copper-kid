import cheerio from 'cheerio';
import CODES from '../GameElements';
import {
  parseEnemyAttacks,
  parseGameElementLevel,
  parsePlanetId,
  parsePlanetName,
  parsePlanetCoordinates,
  parserResources,
  parseBuildingCountdown,
  parseTimestamp,
  parsePlanetType,
} from './shared';

export const resourcesPageParser = (page) => {
  const root = cheerio.load(page);
  const parseSupplyLevel = code => parseGameElementLevel(root, 'supply', code);
  return {
    planet: {
      coordinates: parsePlanetCoordinates(root),
      planetId: parsePlanetId(root),
      planetName: parsePlanetName(root),
      resources: parserResources(root),
      buildingCountdown: parseBuildingCountdown(root),
      timestamp: parseTimestamp(root),
      planetType: parsePlanetType(root),
      buildings: {
        [CODES.METAL_MINE]: parseSupplyLevel(CODES.METAL_MINE),
        [CODES.CRYSTAL_MINE]: parseSupplyLevel(CODES.CRYSTAL_MINE),
        [CODES.DEUTERIUM_SYNTHESIZER]: parseSupplyLevel(CODES.DEUTERIUM_SYNTHESIZER),
        [CODES.SOLAR_PLANT]: parseSupplyLevel(CODES.SOLAR_PLANT),
        [CODES.FUSION_REACTOR]: parseSupplyLevel(CODES.FUSION_REACTOR),
        [CODES.METAL_STORAGE]: parseSupplyLevel(CODES.METAL_STORAGE),
        [CODES.CRYSTAL_STORAGE]: parseSupplyLevel(CODES.CRYSTAL_STORAGE),
        [CODES.DEUTERIUM_TANK]: parseSupplyLevel(CODES.DEUTERIUM_TANK),
      },
      ships: {
        [CODES.SOLAR_SATELLITE]: parseSupplyLevel(CODES.SOLAR_SATELLITE),
      },
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default resourcesPageParser;
