import cheerio from 'cheerio';
import { GAME_ELEMENTS } from '../GameElements';
import {
  parseEnemyAttacks,
  parseGameElementLevel,
  parseBuildingCountdown,
  parseTimestamp,
  parsePlanetHeaders,
  parsePlanets,
} from './shared';

export const resourcesPageParser = (page) => {
  const root = cheerio.load(page);
  const parseSupplyLevel = code => parseGameElementLevel(root, 'supply', code);
  return {
    timestamp: parseTimestamp(root),
    planets: parsePlanets(root),
    planet: {
      ...parsePlanetHeaders(root),
      buildingCountdown: parseBuildingCountdown(root),
      resourceBuildings: {
        [GAME_ELEMENTS.METAL_MINE.code]: parseSupplyLevel(GAME_ELEMENTS.METAL_MINE.code),
        [GAME_ELEMENTS.CRYSTAL_MINE.code]: parseSupplyLevel(GAME_ELEMENTS.CRYSTAL_MINE.code),
        [GAME_ELEMENTS.DEUTERIUM_SYNTHESIZER.code]: parseSupplyLevel(GAME_ELEMENTS.DEUTERIUM_SYNTHESIZER.code),
        [GAME_ELEMENTS.SOLAR_PLANT.code]: parseSupplyLevel(GAME_ELEMENTS.SOLAR_PLANT.code),
        [GAME_ELEMENTS.FUSION_REACTOR.code]: parseSupplyLevel(GAME_ELEMENTS.FUSION_REACTOR.code),
        [GAME_ELEMENTS.METAL_STORAGE.code]: parseSupplyLevel(GAME_ELEMENTS.METAL_STORAGE.code),
        [GAME_ELEMENTS.CRYSTAL_STORAGE.code]: parseSupplyLevel(GAME_ELEMENTS.CRYSTAL_STORAGE.code),
        [GAME_ELEMENTS.DEUTERIUM_TANK.code]: parseSupplyLevel(GAME_ELEMENTS.DEUTERIUM_TANK.code),
      },
      ships: {
        [GAME_ELEMENTS.SOLAR_SATELLITE.code]: parseSupplyLevel(GAME_ELEMENTS.SOLAR_SATELLITE.code),
      },
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default resourcesPageParser;
