import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { overviewPageParser } from '../lib/parsers/overviewPageParser';

const overviewPage =  fs.readFileSync(path.resolve('testPages', 'overview.html'), { encoding: 'utf8' });
const overviewMultiplePlanetsPage =  fs.readFileSync(path.resolve('testPages', 'overviewMultiplePlanets.html'), { encoding: 'utf8' });
const overviewAttackPage =  fs.readFileSync(path.resolve('testPages', 'overviewAttack.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = overviewPageParser(overviewPage);
    assert.equal(parseResult.timestamp.getTime(), 1477936188);
    assert.equal(parseResult.planets.length, 1);
    assert.equal(parseResult.planet.planetName, 'Homeworld');
    assert.equal(parseResult.planet.planetId, '33628551');
    assert.equal(parseResult.planet.planetType, 'planet');
    assert.equal(parseResult.planet.coordinates.galaxy, 2);
    assert.equal(parseResult.planet.coordinates.system, 31);
    assert.equal(parseResult.planet.coordinates.planet, 12);
    assert.equal(parseResult.planet.resources.metal, 20903);
    assert.equal(parseResult.planet.resources.crystal, 6827);
    assert.equal(parseResult.planet.resources.deuterium, 6535);
    assert.equal(parseResult.planet.resources.energy, 36);
    assert.equal(parseResult.planet.buildingCountdown, 16 * 60 + 37);
    assert.equal(parseResult.planet.researchCountdown, 11 * 60 + 28);
    assert.equal(parseResult.planet.shipyardCountdown, 39);
    assert.equal(parseResult.enemyAttacks.length, 0);
    done();
  });

  it('Should parse own planets list', (done) => {
    const parseResult = overviewPageParser(overviewMultiplePlanetsPage);
    assert.equal(parseResult.planets.length, 3);
    assert(parseResult.planets.indexOf('33628551') > -1);
    assert(parseResult.planets.indexOf('33632988') > -1);
    assert(parseResult.planets.indexOf('33633342') > -1);
    done();
  });

/*
  it('Should detect an attack', () => {
    const parseResult = overviewPageParser(overviewAttackPage);
    assert.equal(parseResult.enemyAttacks.length, 1);
  });
*/
  //TODO test more than just one mission

});
