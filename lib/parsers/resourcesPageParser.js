import cheerio from 'cheerio';
import CODES from '../GameElements';
import {
  parseGameElementLevel,
  parsePlanetId,
  parsePlanetName,
  parsePlanetCoordinates,
  parserResources,
} from './shared';

const parseContructionCountdown = (html) => {
  const countdown = html('#Countdown').text();
  if (!countdown) {
    return 0;
  }
  const split = countdown.split(' ');
  let seconds = 0;
  split.forEach((t) => {
    if (t.indexOf('h') > 0) {
      seconds += parseInt(t.replace('h', ''), 10) * 60 * 60;
    } else if (t.indexOf('m') > 0) {
      seconds += parseInt(t.replace('m', ''), 10) * 60;
    } else if (t.indexOf('s') > 0) {
      seconds += parseInt(t.replace('s', ''), 10);
    } else {
      console.log('Unexpected token ', t);
    }
  });
  return seconds;
};

export const resourcesPageParser = (page) => {
  const root = cheerio.load(page);
  return {
    planet: {
      coordinates: parsePlanetCoordinates(root),
      planetId: parsePlanetId(root),
      planetName: parsePlanetName(root),
      resources: parserResources(root),
      buildingCountdown: parseContructionCountdown(root),
      buildings: {
        [CODES.METAL_MINE]: parseGameElementLevel(root, CODES.METAL_MINE),
        [CODES.CRYSTAL_MINE]: parseGameElementLevel(root, CODES.CRYSTAL_MINE),
        [CODES.DEUTERIUM_SYNTHESIZER]: parseGameElementLevel(root, CODES.DEUTERIUM_SYNTHESIZER),
        [CODES.SOLAR_PLANT]: parseGameElementLevel(root, CODES.SOLAR_PLANT),
        [CODES.FUSION_REACTOR]: parseGameElementLevel(root, CODES.FUSION_REACTOR),
        [CODES.METAL_STORAGE]: parseGameElementLevel(root, CODES.METAL_STORAGE),
        [CODES.CRYSTAL_STORAGE]: parseGameElementLevel(root, CODES.CRYSTAL_STORAGE),
        [CODES.DEUTERIUM_TANK]: parseGameElementLevel(root, CODES.DEUTERIUM_TANK),
      },
      ships: {
        [CODES.SOLAR_SATELLITE]: parseGameElementLevel(root, CODES.SOLAR_SATELLITE),
      },
    }
  }
};

export default resourcesPageParser;
