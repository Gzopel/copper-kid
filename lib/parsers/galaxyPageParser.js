import cheerio from 'cheerio';
import {
  parsePlanetId,
  parsePlanetName,
  parsePlanetCoordinates,
  parserResources,
  parseTimestamp,
  parsePlanetType,
  parseEnemyAttacks,
} from './shared';

const parsePlanets = (html) => {
  const galaxy = html('.row');
  const planets = [];
  for (let i = 0; i < 15; i++) {
    const planet = galaxy[i];
    if (planet.attribs.class.indexOf('empty_filter') === -1) {
      const planetPosition = planet.children[1].children[0].data;
      const planetId = planet.children[2].next.attribs['data-planet-id'];
    }
  }
  return planets;
}

export const galaxyPageParser = (page) => {
  const root = cheerio.load(page);
  return {
    planet: {
      coordinates: parsePlanetCoordinates(root),
      planetId: parsePlanetId(root),
      planetName: parsePlanetName(root),
      resources: parserResources(root),
      timestamp: parseTimestamp(root),
      planetType: parsePlanetType(root),
    },
    galaxy: {
      planets: parsePlanets(root),
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default galaxyPageParser;
