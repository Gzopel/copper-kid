import { assert } from 'chai';
import { Browser, PAGES } from '../lib/Browser';
import account from  '../config/account';

describe.only(__filename, () => {
  it('Should login', (done) => {
    const browser = new Browser(account);
    browser.login()
      .then(() => browser.getView(PAGES.RESOURCES).then(console.log))
      .then(() => done())
      .catch(console.error);
  });
});