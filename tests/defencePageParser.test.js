import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { GAME_ELEMENTS } from '../lib/GameElements';
import { defencePageParser } from '../lib/parsers/defencePageParser';

const defencePage =  fs.readFileSync(path.resolve('testPages', 'defense.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = defencePageParser(defencePage);
    assert.equal(parseResult.planets.length, 1);
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
    assert.equal(parseResult.planet.defences[GAME_ELEMENTS.ROCKET_LAUNCHER.code], 60);
    assert.equal(parseResult.planet.defences[GAME_ELEMENTS.LIGHT_LASER.code], 40);
    assert.equal(parseResult.planet.defences[GAME_ELEMENTS.HEAVY_LASER.code], 5);
    assert.equal(parseResult.planet.defences[GAME_ELEMENTS.GAUSS_CANNON.code], 0);
    assert.equal(parseResult.planet.defences[GAME_ELEMENTS.ION_CANNON.code], 0);
    assert.equal(parseResult.planet.defences[GAME_ELEMENTS.SMALL_SHIELD_DOME.code], 1);
    assert.equal(parseResult.planet.defences[GAME_ELEMENTS.LARGE_SHIELD_DOME.code], 0);
    assert.equal(parseResult.planet.defences[GAME_ELEMENTS.ANTI_BALLISTIC_MISSILE.code], 0);
    assert.equal(parseResult.planet.defences[GAME_ELEMENTS.INTERPLANETARY_MISSILE.code], 0);
    assert.equal(parseResult.enemyAttacks.length, 0);
    done();
  });
});