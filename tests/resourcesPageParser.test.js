import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { resourcesPageParser } from '../lib/GameClient/parsers/resourcesPageParser';
import { GAME_ELEMENTS } from '../lib/GameElements';

const resourcesPage =  fs.readFileSync(path.resolve('testPages', 'resources.html'), { encoding: 'utf8' });
const resourcesPageProduction =  fs.readFileSync(path.resolve('testPages', 'resourcesProduction.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = resourcesPageParser(resourcesPage);
    assert.equal(parseResult.timestamp.getTime(), 1477610828);
    assert.equal(parseResult.planets.length, 1);
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
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.METAL_MINE.code], 4);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.CRYSTAL_MINE.code], 1);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.DEUTERIUM_SYNTHESIZER.code], 0);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.SOLAR_PLANT.code], 4);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.METAL_STORAGE.code], 0);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.CRYSTAL_STORAGE.code], 0);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.DEUTERIUM_TANK.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.SOLAR_SATELLITE.code], 0);
    done();
  });

  it('Should parse the building construction countdown', (done) => {
    const parseResult = resourcesPageParser(resourcesPageProduction);
    assert.equal(parseResult.planets.length, 1);
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
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.METAL_MINE.code], 8);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.CRYSTAL_MINE.code], 5);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.DEUTERIUM_SYNTHESIZER.code], 3);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.SOLAR_PLANT.code], 8);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.METAL_STORAGE.code], 0);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.CRYSTAL_STORAGE.code], 0);
    assert.equal(parseResult.planet.resourceBuildings[GAME_ELEMENTS.DEUTERIUM_TANK.code], 0);
    assert.equal(parseResult.planet.ships[GAME_ELEMENTS.SOLAR_SATELLITE.code], 0);
    done();
  });
});
