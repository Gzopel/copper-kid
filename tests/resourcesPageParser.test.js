import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { resourcesPageParser } from '../lib/parsers/resourcesPageParser';
import { CODES } from '../lib/GameElements';

const resourcesPage =  fs.readFileSync(path.resolve('testPages', 'resources.html'), { encoding: 'utf8' });
const resourcesPageProduction =  fs.readFileSync(path.resolve('testPages', 'resourcesProduction.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = resourcesPageParser(resourcesPage);
    assert.equal(parseResult.timestamp.getTime(), 1477610828);
    assert.equal(parseResult.planet.planetName, 'Homeworld');
    assert.equal(parseResult.planet.planetId, '33628551');
    assert.equal(parseResult.planet.buildingCountdown, 0);
    assert.equal(parseResult.planet.planetType, 'planet');
    assert.equal(parseResult.planet.coordinates.galaxy, 2);
    assert.equal(parseResult.planet.coordinates.system, 31);
    assert.equal(parseResult.planet.coordinates.planet, 12);
    assert.equal(parseResult.planet.resources.metal, 65);
    assert.equal(parseResult.planet.resources.crystal, 261);
    assert.equal(parseResult.planet.resources.deuterium, 0);
    assert.equal(parseResult.planet.resources.energy, 47);
    assert.equal(parseResult.planet.resourceBuildings[CODES.METAL_MINE], 4);
    assert.equal(parseResult.planet.resourceBuildings[CODES.CRYSTAL_MINE], 1);
    assert.equal(parseResult.planet.resourceBuildings[CODES.DEUTERIUM_SYNTHESIZER], 0);
    assert.equal(parseResult.planet.resourceBuildings[CODES.SOLAR_PLANT], 4);
    assert.equal(parseResult.planet.resourceBuildings[CODES.METAL_STORAGE], 0);
    assert.equal(parseResult.planet.resourceBuildings[CODES.CRYSTAL_STORAGE], 0);
    assert.equal(parseResult.planet.resourceBuildings[CODES.DEUTERIUM_TANK], 0);
    assert.equal(parseResult.planet.ships[CODES.SOLAR_SATELLITE], 0);
    done();
  });

  it('Should parse the building construction countdown', (done) => {
    const parseResult = resourcesPageParser(resourcesPageProduction);
    assert.equal(parseResult.planet.planetName, 'Homeworld');
    assert.equal(parseResult.planet.planetId, '33628551');
    assert.equal(parseResult.planet.buildingCountdown, 2 * 60 + 28);
    assert.equal(parseResult.planet.coordinates.galaxy, 2);
    assert.equal(parseResult.planet.coordinates.system, 31);
    assert.equal(parseResult.planet.coordinates.planet, 12);
    assert.equal(parseResult.planet.resources.metal, 7065);
    assert.equal(parseResult.planet.resources.crystal, 6872);
    assert.equal(parseResult.planet.resources.deuterium, 1778);
    assert.equal(parseResult.planet.resources.energy, 9);
    assert.equal(parseResult.planet.resourceBuildings[CODES.METAL_MINE], 8);
    assert.equal(parseResult.planet.resourceBuildings[CODES.CRYSTAL_MINE], 5);
    assert.equal(parseResult.planet.resourceBuildings[CODES.DEUTERIUM_SYNTHESIZER], 3);
    assert.equal(parseResult.planet.resourceBuildings[CODES.SOLAR_PLANT], 8);
    assert.equal(parseResult.planet.resourceBuildings[CODES.METAL_STORAGE], 0);
    assert.equal(parseResult.planet.resourceBuildings[CODES.CRYSTAL_STORAGE], 0);
    assert.equal(parseResult.planet.resourceBuildings[CODES.DEUTERIUM_TANK], 0);
    assert.equal(parseResult.planet.ships[CODES.SOLAR_SATELLITE], 0);
    done();
  });
});
