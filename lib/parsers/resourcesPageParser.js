import cheerio from 'cheerio';
import CODES from '../GameElements';
import {
  parseGameElementLevel,
  parsePlanetId,
  parsePlanetName,
  parsePlanetCoordinates,
  parserResources,
} from './shared';

export const resourcesPageParser = (page) => {
  const root = cheerio.load(page);
  return {
    coordinates: parsePlanetCoordinates(root),
    planetId: parsePlanetId(root),
    planetName: parsePlanetName(root),
    resources: parserResources(root),
    buildings: {
      [CODES.METAL_MINE]: parseGameElementLevel(root,CODES.METAL_MINE), 
      [CODES.CRYSTAL_MINE]: parseGameElementLevel(root,CODES.CRYSTAL_MINE), 
      [CODES.DEUTERIUM_SYNTHETIZER]: parseGameElementLevel(root,CODES.DEUTERIUM_SYNTHETIZER), 
      [CODES.SOLAR_PLANT]: parseGameElementLevel(root,CODES.SOLAR_PLANT), 
      [CODES.FUSION_REACTOR]: parseGameElementLevel(root,CODES.FUSION_REACTOR), 
      [CODES.METAL_STORAGE]: parseGameElementLevel(root,CODES.METAL_STORAGE), 
      [CODES.CRYSTAL_STORAGE]: parseGameElementLevel(root,CODES.CRYSTAL_STORAGE), 
      [CODES.DEUTERIUM_TANK]: parseGameElementLevel(root,CODES.DEUTERIUM_TANK), 
    },
    ships: {
      [CODES.SOLAR_SATELLITE]: parseGameElementLevel(root,CODES.SOLAR_SATELLITE), 
    },
  }
};

export default resourcesPageParser;
