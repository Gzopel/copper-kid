import cheerio from 'cheerio';
import { CODES } from '../../GameElements';
import {
  parsePlanetHeaders,
  parseTimestamp,
  parseEnemyAttacks,
  parsePlanets,
} from './shared';

const parseFleetUsedOverMax = (html) => {
  const slots = html('span[title="Used/Total fleet slots"]').text(); // TODO localize
  return slots.slice(slots.indexOf(':') + 1).split('/');
}

const parseMaxFleet = html => parseInt(parseFleetUsedOverMax(html)[1], 10);

const parseUsedFleet = html => parseInt(parseFleetUsedOverMax(html)[0], 10);

export const fleetOnePageParser = (page) => {
  const root = cheerio.load(page);
  const parseShip = (code) => {
    let result = 0;
    try {
      const element = cheerio.load(root(`#button${code}`).html());
      const level = cheerio.load(element('.level').html());
      level('.textlabel').remove();
      result = parseInt(level.text(), 10);
    } catch (e) {};
    return result;
  };

  return {
    timestamp: parseTimestamp(root),
    planets: parsePlanets(root),
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
    maxOwnMissions: parseMaxFleet(root),
    ownMissions: parseUsedFleet(root),
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default fleetOnePageParser;
