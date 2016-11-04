import cheerio from 'cheerio';
import { GAME_ELEMENTS } from '../../GameElements';
import {
  parseGameElementLevel,
  parsePlanetHeaders,
  parseTimestamp,
  parseEnemyAttacks,
  parsePlanets,
} from './shared';

export const defencePageParser = (page) => {
  const root = cheerio.load(page);
  const parseDefence = code => parseGameElementLevel(root, 'defense', code);
  return {
    timestamp: parseTimestamp(root),
    planets: parsePlanets(root),
    planet: {
      ...parsePlanetHeaders(root),
      defences: {
        [GAME_ELEMENTS.ROCKET_LAUNCHER.code]: parseDefence(GAME_ELEMENTS.ROCKET_LAUNCHER.code),
        [GAME_ELEMENTS.LIGHT_LASER.code]: parseDefence(GAME_ELEMENTS.LIGHT_LASER.code),
        [GAME_ELEMENTS.HEAVY_LASER.code]: parseDefence(GAME_ELEMENTS.HEAVY_LASER.code),
        [GAME_ELEMENTS.GAUSS_CANNON.code]: parseDefence(GAME_ELEMENTS.GAUSS_CANNON.code),
        [GAME_ELEMENTS.ION_CANNON.code]: parseDefence(GAME_ELEMENTS.ION_CANNON.code),
        [GAME_ELEMENTS.PLASMA_TURRET.code]: parseDefence(GAME_ELEMENTS.PLASMA_TURRET.code),
        [GAME_ELEMENTS.SMALL_SHIELD_DOME.code]: parseDefence(GAME_ELEMENTS.SMALL_SHIELD_DOME.code),
        [GAME_ELEMENTS.LARGE_SHIELD_DOME.code]: parseDefence(GAME_ELEMENTS.LARGE_SHIELD_DOME.code),
        [GAME_ELEMENTS.ANTI_BALLISTIC_MISSILE.code]: parseDefence(GAME_ELEMENTS.ANTI_BALLISTIC_MISSILE.code),
        [GAME_ELEMENTS.INTERPLANETARY_MISSILE.code]: parseDefence(GAME_ELEMENTS.INTERPLANETARY_MISSILE.code),
      },
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default defencePageParser;
