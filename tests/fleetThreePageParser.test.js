import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { fleetThreePageParser } from '../lib/GameClient/parsers/fleetThreePageParser.js';

const fleetThreePage =  fs.readFileSync(path.resolve('testPages', 'fleet3.html'), { encoding: 'utf8' });
describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = fleetThreePageParser(fleetThreePage);
    assert.equal(parseResult.token, 'beec4886f9f28121b25b5964e0ec6586');
    done();
  });
});