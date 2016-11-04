import cheerio from 'cheerio';
import { GAME_ELEMENTS } from '../../GameElements';
import {
  parseEnemyAttacks,
  parseGameElementLevel,
  parsePlanetHeaders,
  parseTimestamp,
  parsePlanets,
} from './shared';

export const facilitiesPageParser = (page) => {
  const root = cheerio.load(page);
  const parseFacilitiesLevel = code => parseGameElementLevel(root, 'station', code);
  return {
    timestamp: parseTimestamp(root),
    planets: parsePlanets(root),
    planet: {
      ...parsePlanetHeaders(root),
      facilitiesBuildings: {
        [GAME_ELEMENTS.ROBOTICS_FACTORY.code]: parseFacilitiesLevel(GAME_ELEMENTS.ROBOTICS_FACTORY.code),
        [GAME_ELEMENTS.SHIPYARD.code]: parseFacilitiesLevel(GAME_ELEMENTS.SHIPYARD.code),
        [GAME_ELEMENTS.RESEARCH_LAB.code]: parseFacilitiesLevel(GAME_ELEMENTS.RESEARCH_LAB.code),
        [GAME_ELEMENTS.ALLIANCE_DEPOT.code]: parseFacilitiesLevel(GAME_ELEMENTS.ALLIANCE_DEPOT.code),
        [GAME_ELEMENTS.MISSILE_SILO.code]: parseFacilitiesLevel(GAME_ELEMENTS.MISSILE_SILO.code),
        [GAME_ELEMENTS.NANITE_FACTORY.code]: parseFacilitiesLevel(GAME_ELEMENTS.NANITE_FACTORY.code),
        [GAME_ELEMENTS.TERRAFORMER.code]: parseFacilitiesLevel(GAME_ELEMENTS.TERRAFORMER.code),
        [GAME_ELEMENTS.SPACE_DOCK.code]: parseFacilitiesLevel(GAME_ELEMENTS.SPACE_DOCK.code),
      },
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default facilitiesPageParser;
