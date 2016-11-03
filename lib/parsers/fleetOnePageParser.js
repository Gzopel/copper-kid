import cheerio from 'cheerio';
import { CODES } from '../GameElements';
import {
  parsePlanetHeaders,
  parseTimestamp,
  parseEnemyAttacks,
} from './shared';

export const fleetOnePageParser = (page) => {
  const root = cheerio.load(page);
  const parseShip = (code) => {
    const element = cheerio.load(root(`#button${code}`).html());
    const level = cheerio.load(element('.level').html());
    level('.textlabel').remove();
    return parseInt(level.text(), 10);
  };
  return {
    timestamp: parseTimestamp(root),
    planet: {
      ...parsePlanetHeaders(root),
      ships: {
        [CODES.LIGHT_FIGHTER]: parseShip(CODES.LIGHT_FIGHTER),
        [CODES.HEAVY_FIGHTER]: parseShip(CODES.HEAVY_FIGHTER),
        [CODES.CRUISER]: parseShip(CODES.CRUISER),
        [CODES.BATTLESHIP]: parseShip(CODES.BATTLESHIP),
        [CODES.BATTLECRUISER]: parseShip(CODES.BATTLECRUISER),
        [CODES.BOMBER]: parseShip(CODES.BOMBER),
        [CODES.DESTROYER]: parseShip(CODES.DESTROYER),
        [CODES.DEATHSTAR]: parseShip(CODES.DEATHSTAR),
        [CODES.SMALL_CARGO]: parseShip(CODES.SMALL_CARGO),
        [CODES.LARGE_CARGO]: parseShip(CODES.LARGE_CARGO),
        [CODES.RECYCLER]: parseShip(CODES.RECYCLER),
        [CODES.COLONY_SHIP]: parseShip(CODES.COLONY_SHIP),
        [CODES.ESPIONAGE_PROBE]: parseShip(CODES.ESPIONAGE_PROBE),
      },
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default fleetOnePageParser;
