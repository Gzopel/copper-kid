import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { galaxyPageParser } from '../lib/parsers/galaxyPageParser';

const galaxyPage =  fs.readFileSync(path.resolve('testPages', 'galaxy.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = galaxyPageParser(galaxyPage);
    assert.equal(parseResult.timestamp.getTime(), 1478030413);
    assert.equal(parseResult.planet.planetName, 'Homeworld');
    assert.equal(parseResult.planet.planetId, '33628551');
    assert.equal(parseResult.planet.planetType, 'planet');
    assert.equal(parseResult.planet.coordinates.galaxy, 2);
    assert.equal(parseResult.planet.coordinates.system, 31);
    assert.equal(parseResult.planet.coordinates.planet, 12);
    assert.equal(parseResult.planet.resources.metal, 69493);
    assert.equal(parseResult.planet.resources.crystal, 27490);
    assert.equal(parseResult.planet.resources.deuterium, 5738);
    assert.equal(parseResult.planet.resources.energy, 7);
    assert.equal(parseResult.enemyAttacks.length, 0);
    done();
  });
});
