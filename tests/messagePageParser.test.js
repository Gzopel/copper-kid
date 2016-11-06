import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { messagesPageParser } from '../lib/GameClient/parsers/messagesPageParser';

const messagePage =  fs.readFileSync(path.resolve('testPages', 'spyMessages.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = messagesPageParser(messagePage);
    console.log(parseResult);
    done();
  });
});
