import { assert } from 'chai';
import GameClient from '../lib/GameClient';
import { account } from  '../config/account';

describe(__filename, () => {
  it.only('Should login', (done) => {
    const client = new GameClient(account);
    client.login().then(console.log).then(()=>done)
      .catch(console.error);
  });
});