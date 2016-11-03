import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { CODES } from '../lib/GameElements';
import { defencePageParser } from '../lib/parsers/defencePageParser';

const defencePage =  fs.readFileSync(path.resolve('testPages', 'defense.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = defencePageParser(defencePage);
    assert.equal(parseResult.timestamp.getTime(), 1477961834);
    assert.equal(parseResult.planet.planetName, 'Homeworld');
    assert.equal(parseResult.planet.planetId, '33628551');
    assert.equal(parseResult.planet.planetType, 'planet');
    assert.equal(parseResult.planet.coordinates.galaxy, 2);
    assert.equal(parseResult.planet.coordinates.system, 31);
    assert.equal(parseResult.planet.coordinates.planet, 12);
    assert.equal(parseResult.planet.resources.metal, 16923);
    assert.equal(parseResult.planet.resources.crystal, 6193);
    assert.equal(parseResult.planet.resources.deuterium, 9580);
    assert.equal(parseResult.planet.resources.energy, 160);
    assert.equal(parseResult.planet.defences[CODES.ROCKET_LAUNCHER], 60);
    assert.equal(parseResult.planet.defences[CODES.LIGHT_LASER], 40);
    assert.equal(parseResult.planet.defences[CODES.HEAVY_LASER], 5);
    assert.equal(parseResult.planet.defences[CODES.GAUSS_CANNON], 0);
    assert.equal(parseResult.planet.defences[CODES.ION_CANNON], 0);
    assert.equal(parseResult.planet.defences[CODES.SMALL_SHIELD_DOME], 1);
    assert.equal(parseResult.planet.defences[CODES.LARGE_SHIELD_DOME], 0);
    assert.equal(parseResult.planet.defences[CODES.ANTI_BALLISTIC_MISSILE], 0);
    assert.equal(parseResult.planet.defences[CODES.INTERPLANETARY_MISSILE], 0);
    assert.equal(parseResult.enemyAttacks.length, 0);
    done();
  });
});