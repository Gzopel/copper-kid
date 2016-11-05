import { assert } from 'chai';
import GameClient from '../lib/GameClient';
import { account } from  '../config/account';

const client = new GameClient(account);
let gameState;
let galaxy;

describe(__filename, () => {
  it('1. Should login', (done) => {
    client.login()
      .then((overview) => {
        assert(overview.timestamp);
        assert(overview.planets.length);
        assert(overview.planet.planetName);
        assert(overview.planet.planetId);
        assert(overview.planet.coordinates.galaxy);
        assert(overview.planet.coordinates.system);
        assert(overview.planet.coordinates.planet);
        assert.equal(overview.planet.planetType, 'planet');
        assert.isNotNull(overview.planet.resources.metal);
        assert.isNotNull(overview.planet.resources.crystal);
        assert.isNotNull(overview.planet.resources.deuterium);
        assert.isNotNull(overview.planet.resources.energy);
      })
      .then(done)
      .catch(error => console.error('catch error', error));
  });

  it('2. Should get the game state', (done) => {
    client.fetchGameState()
      .then((state) => {
        // TODO some validations
        gameState = state;
        console.log(state);
      })
      .then(done)
      .catch(error => console.error('catch error', error));
  });

  it('3. I should scan the galaxy', (done) => {
    const coordinates = gameState.planets[Object.keys(gameState.planets)[0]].coordinates;
    client.galaxyScan(coordinates.galaxy, coordinates.system - 2, coordinates.system + 2)
      .then((galaxyScan) => {
        galaxy = galaxyScan;
        // TODO some validations
        console.log(galaxy);
      })
      .then(done)
      .catch(error => console.error('catch error', error));
  });
});