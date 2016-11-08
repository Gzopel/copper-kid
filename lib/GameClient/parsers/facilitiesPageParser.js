import cheerio from 'cheerio';
import { CODES } from '../../GameElements';
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
        [CODES.ROBOTICS_FACTORY]: parseFacilitiesLevel(CODES.ROBOTICS_FACTORY),
        [CODES.SHIPYARD]: parseFacilitiesLevel(CODES.SHIPYARD),
        [CODES.RESEARCH_LAB]: parseFacilitiesLevel(CODES.RESEARCH_LAB),
        [CODES.ALLIANCE_DEPOT]: parseFacilitiesLevel(CODES.ALLIANCE_DEPOT),
        [CODES.MISSILE_SILO]: parseFacilitiesLevel(CODES.MISSILE_SILO),
        [CODES.NANITE_FACTORY]: parseFacilitiesLevel(CODES.NANITE_FACTORY),
        [CODES.TERRAFORMER]: parseFacilitiesLevel(CODES.TERRAFORMER),
        [CODES.SPACE_DOCK]: parseFacilitiesLevel(CODES.SPACE_DOCK),
      },
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default facilitiesPageParser;
