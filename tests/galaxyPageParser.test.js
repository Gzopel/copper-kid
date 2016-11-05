import { assert } from 'chai';
import { galaxyPageParser } from '../lib/GameClient/parsers/galaxyPageParser';
import galaxyResponse from '../testPages/galaxyView.json';

describe(__filename, () => {
  it('Should parse the test json', (done) => {
    const parseResult = galaxyPageParser(galaxyResponse.galaxy);
    //TODO validations
    done();
  });
});
