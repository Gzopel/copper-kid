import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { facilitiesPageParser } from '../lib/GameClient/parsers/facilitiesPageParser';
import { CODES } from '../lib/GameElements';

const facilitiesPage =  fs.readFileSync(path.resolve('testPages', 'facilities.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = facilitiesPageParser(facilitiesPage);
    assert.equal(parseResult.planets.length, 1);
    assert.equal(parseResult.timestamp.getTime(), 1478022408);
    assert.equal(parseResult.planet.planetName, 'Homeworld');
    assert.equal(parseResult.planet.planetId, '33628551');
    assert.equal(parseResult.planet.planetType, 'planet');
    assert.equal(parseResult.planet.coordinates.galaxy, 2);
    assert.equal(parseResult.planet.coordinates.system, 31);
    assert.equal(parseResult.planet.coordinates.planet, 12);
    assert.equal(parseResult.planet.resources.metal, 38900);
    assert.equal(parseResult.planet.resources.crystal, 15020);
    assert.equal(parseResult.planet.resources.deuterium, 2253);
    assert.equal(parseResult.planet.resources.energy, 7);
    assert.equal(parseResult.planet.facilitiesBuildings[CODES.ROBOTICS_FACTORY], 2);
    assert.equal(parseResult.planet.facilitiesBuildings[CODES.SHIPYARD], 6);
    assert.equal(parseResult.planet.facilitiesBuildings[CODES.RESEARCH_LAB], 6);
    assert.equal(parseResult.planet.facilitiesBuildings[CODES.ALLIANCE_DEPOT], 0);
    assert.equal(parseResult.planet.facilitiesBuildings[CODES.MISSILE_SILO], 0);
    assert.equal(parseResult.planet.facilitiesBuildings[CODES.NANITE_FACTORY], 0);
    assert.equal(parseResult.planet.facilitiesBuildings[CODES.TERRAFORMER], 0);
    assert.equal(parseResult.planet.facilitiesBuildings[CODES.SPACE_DOCK], 0);
    done();
  });
});
