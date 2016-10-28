import cheerio from 'cheerio';
import CODES from '../GameElements';

const parseGameElementLevel = (html, code) => {
  const element = cheerio.load(html(`.supply${code}`).html());
  const level = cheerio.load(element('.level').html());
  level('.textlabel').remove();
  return parseInt(level.text(),10);
}

const parseMetaElement = (html, name) => {
  return html(`meta[name=${name}]`).attr('content');
}

const parsePlanetId = (html) => parseMetaElement(html, 'ogame-planet-id');

const parsePlanetName = (html) => parseMetaElement(html, 'ogame-planet-name');

const parsePlanetCoordinates = (html) => {
  const coordinates = parseMetaElement(html, 'ogame-planet-coordinates').split(':');
  return {
    galaxy: parseInt(coordinates[0], 10),
    system: parseInt(coordinates[1], 10),
    planet: parseInt(coordinates[2], 10),
  }
}

export const resourcesPageParser = (page) => {
  const root = cheerio.load(page);
  return {
    coordinates: parsePlanetCoordinates(root),
    planetId: parsePlanetId(root),
    planetName: parsePlanetName(root),
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