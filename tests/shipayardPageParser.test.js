import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { GAME_ELEMENTS } from '../lib/GameElements';
import { shipyardPageParser } from '../lib/parsers/shipyardPageParser';

const shipyardPage =  fs.readFileSync(path.resolve('testPages', 'shipyard.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = shipyardPageParser(shipyardPage);
    assert.equal(parseResult.planets.length, 1);
    assert.equal(parseResult.timestamp.getTime(), 1478027776);
    assert.equal(parseResult.planet.planetName, 'Homeworld');
    assert.equal(parseResult.planet.planetId, '33628551');
    assert.equal(parseResult.planet.planetType, 'planet');
    assert.equal(parseResult.planet.coordinates.galaxy, 2);
    assert.equal(parseResult.planet.coordinates.system, 31);
    assert.equal(parseResult.planet.coordinates.planet, 12);
    assert.equal(parseResult.planet.resources.metal, 59960);
    assert.equal(parseResult.planet.resources.crystal, 23547);
    assert.equal(parseResult.planet.resources.deuterium, 4855);
    assert.equal(parseResult.planet.resources.energy, 7);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.LIGHT_FIGHTER.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.HEAVY_FIGHTER.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.CRUISER.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.BATTLESHIP.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.BATTLECRUISER.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.BOMBER.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.DESTROYER.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.DEATHSTAR.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.SMALL_CARGO.code], 3);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.LARGE_CARGO.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.RECYCLER.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.COLONY_SHIP.code], 1);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.ESPIONAGE_PROBE.code], 10);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.SOLAR_SATELLITE.code], 1);
    assert.equal(parseResult.enemyAttacks.length, 0);
    done();
  });
});