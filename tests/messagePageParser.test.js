import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { messagesPageParser } from '../lib/GameClient/parsers/messagesPageParser';

const messagePage =  fs.readFileSync(path.resolve('testPages', 'spyMessages.html'), { encoding: 'utf8' });
const messageEnemyPage =  fs.readFileSync(path.resolve('testPages', 'spyMessagesEnemy.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = messagesPageParser(messagePage);
    assert.equal(parseResult.timestamp.getTime(), 1478272544);
    assert.equal(parseResult.planets.length, 3);
    assert.equal(parseResult.planet.planetName, 'Homeworld');
    assert.equal(parseResult.planet.planetId, '33628551');
    assert.equal(parseResult.planet.planetType, 'planet');
    assert.equal(parseResult.planet.coordinates.galaxy, 2);
    assert.equal(parseResult.planet.coordinates.system, 31);
    assert.equal(parseResult.planet.coordinates.planet, 12);
    assert.equal(parseResult.planet.resources.metal, 145291);
    assert.equal(parseResult.planet.resources.crystal, 82210);
    assert.equal(parseResult.planet.resources.deuterium, 10007);
    assert.equal(parseResult.planet.resources.energy, 207);
    assert.equal(parseResult.messages.length, 10);
    // TODO verify Ids and hasDetails
    assert.equal(parseResult.enemyAttacks.length, 0);
    done();
  });

  it('Should parse the test page', (done) => {
    const parseResult = messagesPageParser(messageEnemyPage);
    assert.equal(parseResult.timestamp.getTime(), 1478288909);
    assert.equal(parseResult.planets.length, 3);
    assert.equal(parseResult.planet.planetName, 'Homeworld');
    assert.equal(parseResult.planet.planetId, '33628551');
    assert.equal(parseResult.planet.planetType, 'planet');
    assert.equal(parseResult.planet.coordinates.galaxy, 2);
    assert.equal(parseResult.planet.coordinates.system, 31);
    assert.equal(parseResult.planet.coordinates.planet, 12);
    assert.equal(parseResult.planet.resources.metal, 116522);
    assert.equal(parseResult.planet.resources.crystal, 91185);
    assert.equal(parseResult.planet.resources.deuterium, 20422);
    assert.equal(parseResult.planet.resources.energy, -11);
    assert.equal(parseResult.messages.length, 10);
    // TODO verify Ids and hasDetails
    assert.equal(parseResult.enemyAttacks.length, 0);
    done();
  });
});
