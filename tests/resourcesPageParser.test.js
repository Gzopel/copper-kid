import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import resourcesPageParser from '../lib/parsers/resourcesPageParser';
import { CODES } from '../lib/GameElements';

const resourcesPage =  fs.readFileSync(path.resolve('testPages','resources.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = resourcesPageParser(resourcesPage);
    assert.equal(parseResult.planetName, 'Homeworld');
    assert.equal(parseResult.planetId, '33628551');
    assert.equal(parseResult.coordinates.galaxy, 2);
    assert.equal(parseResult.coordinates.system, 31);
    assert.equal(parseResult.coordinates.planet, 12);
    assert.equal(parseResult.buildings[CODES.METAL_MINE], 4);
    assert.equal(parseResult.buildings[CODES.CRYSTAL_MINE], 1);
    assert.equal(parseResult.buildings[CODES.DEUTERIUM_SYNTHETIZER], 0);
    assert.equal(parseResult.buildings[CODES.SOLAR_PLANT], 4);
    assert.equal(parseResult.buildings[CODES.METAL_STORAGE], 0);
    assert.equal(parseResult.buildings[CODES.CRYSTAL_STORAGE], 0);
    assert.equal(parseResult.buildings[CODES.DEUTERIUM_TANK], 0);
    assert.equal(parseResult.ships[CODES.SOLAR_SATELLITE], 0);
    done();
  })
});
