import cheerio from 'cheerio';
import { GAME_ELEMENTS } from '../../GameElements';
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
        [GAME_ELEMENTS.LIGHT_FIGHTER.code]: parseShip(GAME_ELEMENTS.LIGHT_FIGHTER.code),
        [GAME_ELEMENTS.HEAVY_FIGHTER.code]: parseShip(GAME_ELEMENTS.HEAVY_FIGHTER.code),
        [GAME_ELEMENTS.CRUISER.code]: parseShip(GAME_ELEMENTS.CRUISER.code),
        [GAME_ELEMENTS.BATTLESHIP.code]: parseShip(GAME_ELEMENTS.BATTLESHIP.code),
        [GAME_ELEMENTS.BATTLECRUISER.code]: parseShip(GAME_ELEMENTS.BATTLECRUISER.code),
        [GAME_ELEMENTS.BOMBER.code]: parseShip(GAME_ELEMENTS.BOMBER.code),
        [GAME_ELEMENTS.DESTROYER.code]: parseShip(GAME_ELEMENTS.DESTROYER.code),
        [GAME_ELEMENTS.DEATHSTAR.code]: parseShip(GAME_ELEMENTS.DEATHSTAR.code),
        [GAME_ELEMENTS.SMALL_CARGO.code]: parseShip(GAME_ELEMENTS.SMALL_CARGO.code),
        [GAME_ELEMENTS.LARGE_CARGO.code]: parseShip(GAME_ELEMENTS.LARGE_CARGO.code),
        [GAME_ELEMENTS.RECYCLER.code]: parseShip(GAME_ELEMENTS.RECYCLER.code),
        [GAME_ELEMENTS.COLONY_SHIP.code]: parseShip(GAME_ELEMENTS.COLONY_SHIP.code),
        [GAME_ELEMENTS.ESPIONAGE_PROBE.code]: parseShip(GAME_ELEMENTS.ESPIONAGE_PROBE.code),
      },
    },
    maxOwnMissions: parseMaxFleet(root),
    ownMissions: parseUsedFleet(root),
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default fleetOnePageParser;
