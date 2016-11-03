import cheerio from 'cheerio';
import {
  parseCoordinates,
  parsePlanetHeaders,
  parseTimestamp,
  parseEnemyAttacks,
} from './shared';

const extractResources = text => parseInt(text.replace('.', '').split(':')[1], 10);

const parseDebris = (node) => {
  if (!node) {
    return null;
  }
  return {
    metal: extractResources(node.children[7].children[1].children[0].data),
    crystal: extractResources(node.children[7].children[3].children[0].data),
  };
}

const parsePlayerName = (nodes) => {
  if (nodes.length === 1) { // it is us
    return nodes[0].data.trim();
  }
  return nodes[1].children[0].data;
}

const parsePlanets = (html) => {
  const system = html('.row');
  const planets = [];
  for (let i = 0; i < 15; i++) {
    const planet = system[i];
    if (planet.attribs.class.indexOf('empty_filter') === -1) {
      const planetId = planet.children[3].attribs['data-planet-id'];
      // planet.children[3].children[0] TODO  parse activity
      const rawCoordinates = planet.children[3].children[5].children[5].children[1].children[0].children[0].data;
      const coordinates = parseCoordinates(rawCoordinates);
      const planetName = planet.children[5].children[0].data.trim();
      // planet.children[7] TODO moon
      const debris = parseDebris(planet.children[9].children[5]);
      const rawPlayerId = planet.children[11].children[1].attribs.rel;
      const playerId = rawPlayerId && rawPlayerId.replace('player', ''); // undefined if it us
      const player = planet.children[11].children[1].children;
      const playerName = parsePlayerName(player);
      const playerStatus = player[1] && player[1].attribs.class.replace('status_abbr_', '');// undefined if it us
      planets.push({
        coordinates: coordinates,
        planetName: planetName,
        debris: debris,
        planetId: planetId,
        playerId: playerId,
        playerName: playerName,
        playerStatus: playerStatus,
      });
    }
  }
  return planets;
}

export const galaxyPageParser = (page) => {
  const root = cheerio.load(page);
  return {
    timestamp: parseTimestamp(root),
    planet: {
      ...parsePlanetHeaders(root),
    },
    galaxy: {
      planets: parsePlanets(root),
    },
    enemyAttacks: parseEnemyAttacks(root),
  };
};

export default galaxyPageParser;
