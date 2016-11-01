import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { CODES } from '../lib/GameElements';
import { fleetOnePageParser } from '../lib/parsers/fleetOnePageParser';

const fleetOnePage =  fs.readFileSync(path.resolve('testPages', 'fleet1.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = fleetOnePageParser(fleetOnePage);
    assert.equal(parseResult.planet.planetName, 'Homeworld');
    assert.equal(parseResult.planet.planetId, '33628551');
    assert.equal(parseResult.planet.planetType, 'planet');
    assert.equal(parseResult.planet.timestamp.getTime(), 1478028927);
    assert.equal(parseResult.planet.coordinates.galaxy, 2);
    assert.equal(parseResult.planet.coordinates.system, 31);
    assert.equal(parseResult.planet.coordinates.planet, 12);
    assert.equal(parseResult.planet.resources.metal, 64132);
    assert.equal(parseResult.planet.resources.crystal, 25272);
    assert.equal(parseResult.planet.resources.deuterium, 5241);
    assert.equal(parseResult.planet.resources.energy, 7);
    assert.equal(parseResult.planet.ships[CODES.LIGHT_FIGHTER], 0);
    assert.equal(parseResult.planet.ships[CODES.HEAVY_FIGHTER], 0);
    assert.equal(parseResult.planet.ships[CODES.CRUISER], 0);
    assert.equal(parseResult.planet.ships[CODES.BATTLESHIP], 0);
    assert.equal(parseResult.planet.ships[CODES.BATTLECRUISER], 0);
    assert.equal(parseResult.planet.ships[CODES.BOMBER], 0);
    assert.equal(parseResult.planet.ships[CODES.DESTROYER], 0);
    assert.equal(parseResult.planet.ships[CODES.DEATHSTAR], 0);
    assert.equal(parseResult.planet.ships[CODES.SMALL_CARGO], 3);
    assert.equal(parseResult.planet.ships[CODES.LARGE_CARGO], 0);
    assert.equal(parseResult.planet.ships[CODES.RECYCLER], 0);
    assert.equal(parseResult.planet.ships[CODES.COLONY_SHIP], 1);
    assert.equal(parseResult.planet.ships[CODES.ESPIONAGE_PROBE], 10);
    assert.equal(parseResult.enemyAttacks.length, 0);
    done();
  });
});