import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { loginPageParser } from '../lib/parsers/loginPageParser';

const loginPage =  fs.readFileSync(path.resolve('testPages', 'login.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = loginPageParser(loginPage);
    assert(parseResult.universes);
    assert.equal(parseResult.universes['Event server'], 's205-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Betelgeuse, 's128-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Cygnus, 's129-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Deimos, 's130-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Eridanus, 's131-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Fidis, 's132-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Ganimed, 's133-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Hyperion, 's134-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Izar, 's135-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Japetus, 's136-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Kallisto, 's137-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Libra, 's138-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Nusakan, 's140-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Oberon, 's141-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Polaris, 's142-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Unity, 's139-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Quantum, 's117-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Rigel, 's118-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Taurus, 's120-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Vega, 's122-en.ogame.gameforge.com');
    assert.equal(parseResult.universes.Wasat, 's123-en.ogame.gameforge.com');
    assert.equal(parseResult.universes['1. Universe'], 's1-en.ogame.gameforge.com');
    done();
  });
});
