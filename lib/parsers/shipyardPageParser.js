import cheerio from 'cheerio';
import { CODES } from '../GameElements';
import {
  parseGameElementLevel,
  parsePlanetHeaders,
  parseTimestamp,
  parseEnemyAttacks,
  parsePlanets,
} from './shared';

export const shipyardPageParser = (page) => {
  const root = cheerio.load(page);
  const parseCivil = code => parseGameElementLevel(root, 'civil', code);
  const parseMilitary = code => parseGameElementLevel(root, 'military', code);
  return {
    timestamp: parseTimestamp(root),
    planets: parsePlanets(root),
    planet: {
      ...parsePlanetHeaders(root),
      ships: {
        [CODES.LIGHT_FIGHTER]: parseMilitary(CODES.LIGHT_FIGHTER),
        [CODES.HEAVY_FIGHTER]: parseMilitary(CODES.HEAVY_FIGHTER),
        [CODES.CRUISER]: parseMilitary(CODES.CRUISER),
        [CODES.BATTLESHIP]: parseMilitary(CODES.BATTLESHIP),
        [CODES.BATTLECRUISER]: parseMilitary(CODES.BATTLECRUISER),
        [CODES.BOMBER]: parseMilitary(CODES.BOMBER),
        [CODES.DESTROYER]: parseMilitary(CODES.DESTROYER),
        [CODES.DEATHSTAR]: parseMilitary(CODES.DEATHSTAR),
        [CODES.SMALL_CARGO]: parseCivil(CODES.SMALL_CARGO),
        [CODES.LARGE_CARGO]: parseCivil(CODES.LARGE_CARGO),
        [CODES.RECYCLER]: parseCivil(CODES.RECYCLER),
        [CODES.COLONY_SHIP]: parseCivil(CODES.COLONY_SHIP),
        [CODES.ESPIONAGE_PROBE]: parseCivil(CODES.ESPIONAGE_PROBE),
        [CODES.SOLAR_SATELLITE]: parseCivil(CODES.SOLAR_SATELLITE),
      },
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default shipyardPageParser;
