import cheerio from 'cheerio';
import { CODES } from '../GameElements';
import {
  parseGameElementLevel,
  parsePlanetHeaders,
  parseTimestamp,
  parseEnemyAttacks,
} from './shared';

export const defencePageParser = (page) => {
  const root = cheerio.load(page);
  const parseDefence = code => parseGameElementLevel(root, 'defense', code);
  return {
    timestamp: parseTimestamp(root),
    planet: {
      ...parsePlanetHeaders(root),
      defences: {
        [CODES.ROCKET_LAUNCHER]: parseDefence(CODES.ROCKET_LAUNCHER),
        [CODES.LIGHT_LASER]: parseDefence(CODES.LIGHT_LASER),
        [CODES.HEAVY_LASER]: parseDefence(CODES.HEAVY_LASER),
        [CODES.GAUSS_CANNON]: parseDefence(CODES.GAUSS_CANNON),
        [CODES.ION_CANNON]: parseDefence(CODES.ION_CANNON),
        [CODES.PLASMA_TURRET]: parseDefence(CODES.PLASMA_TURRET),
        [CODES.SMALL_SHIELD_DOME]: parseDefence(CODES.SMALL_SHIELD_DOME),
        [CODES.LARGE_SHIELD_DOME]: parseDefence(CODES.LARGE_SHIELD_DOME),
        [CODES.ANTI_BALLISTIC_MISSILE]: parseDefence(CODES.ANTI_BALLISTIC_MISSILE),
        [CODES.INTERPLANETARY_MISSILE]: parseDefence(CODES.INTERPLANETARY_MISSILE),
      },
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default defencePageParser;
