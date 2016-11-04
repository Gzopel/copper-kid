import cheerio from 'cheerio';
import { GAME_ELEMENTS } from '../GameElements';
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
        [GAME_ELEMENTS.LIGHT_FIGHTER.code]: parseMilitary(GAME_ELEMENTS.LIGHT_FIGHTER.code),
        [GAME_ELEMENTS.HEAVY_FIGHTER.code]: parseMilitary(GAME_ELEMENTS.HEAVY_FIGHTER.code),
        [GAME_ELEMENTS.CRUISER.code]: parseMilitary(GAME_ELEMENTS.CRUISER.code),
        [GAME_ELEMENTS.BATTLESHIP.code]: parseMilitary(GAME_ELEMENTS.BATTLESHIP.code),
        [GAME_ELEMENTS.BATTLECRUISER.code]: parseMilitary(GAME_ELEMENTS.BATTLECRUISER.code),
        [GAME_ELEMENTS.BOMBER.code]: parseMilitary(GAME_ELEMENTS.BOMBER.code),
        [GAME_ELEMENTS.DESTROYER.code]: parseMilitary(GAME_ELEMENTS.DESTROYER.code),
        [GAME_ELEMENTS.DEATHSTAR.code]: parseMilitary(GAME_ELEMENTS.DEATHSTAR.code),
        [GAME_ELEMENTS.SMALL_CARGO.code]: parseCivil(GAME_ELEMENTS.SMALL_CARGO.code),
        [GAME_ELEMENTS.LARGE_CARGO.code]: parseCivil(GAME_ELEMENTS.LARGE_CARGO.code),
        [GAME_ELEMENTS.RECYCLER.code]: parseCivil(GAME_ELEMENTS.RECYCLER.code),
        [GAME_ELEMENTS.COLONY_SHIP.code]: parseCivil(GAME_ELEMENTS.COLONY_SHIP.code),
        [GAME_ELEMENTS.ESPIONAGE_PROBE.code]: parseCivil(GAME_ELEMENTS.ESPIONAGE_PROBE.code),
        [GAME_ELEMENTS.SOLAR_SATELLITE.code]: parseCivil(GAME_ELEMENTS.SOLAR_SATELLITE.code),
      },
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default shipyardPageParser;
