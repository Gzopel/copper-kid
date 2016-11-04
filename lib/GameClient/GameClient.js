import { loginPageParser } from './parsers/loginPageParser';
import { resourcesPageParser } from './parsers/resourcesPageParser';
import { overviewPageParser } from './parsers/overviewPageParser';
import { messagesPageParser } from './parsers/messagesPageParser';
import { spyDetailMessageParser } from './parsers/spyDetailMessageParser';
import { Browser } from './Browser';

const PAGES = {
  OVERVIEW: 'overview',
  RESOURCES: 'resources',
  RESEARCH: 'research',
  STATION: 'station',
  SHIPYARD: 'shipyard',
  DEFENSE: 'defense',
  FLEET: 'fleet1',
  GALAXY: 'galaxy',
  MESSAGES: 'messages',
};

const PARSERS = {
  [PAGES.OVERVIEW]: overviewPageParser,
  [PAGES.RESOURCES]: resourcesPageParser,
  [PAGES.MESSAGES]: messagesPageParser,
}

export class GameClient {
  constructor(account) {
    this.account = account;
    this.browser = new Browser();
    this.lastPlanet = null;
  }

  login = () => {
    return this.browser.getHomePage(this.account.server)
      .then((html) => {
        const universeServers = loginPageParser(html);
        this.account.universeServer = universeServers.universes[this.account.universeName];
        return this.browser.login(this.account);
      })
      .then((html) => {
        const overview = overviewPageParser(html);
        this.lastPlanet = overview.planet.planetId;
        return overview;
      });
  }

  /*
  * getGameState()
  *   for each planet
  *     - resources
  *     - station
  *     - defense
  *     - fleet1
  *   + research
  *   + messages
  * */


  //getAllSpyMessages(prevMessages = []) {
  //  return this.browser.getView(PAGES.MESSAGES,this.lastPlanet)
  //   .then(messagesPageParser)
  //   .then((parseResult)=> {
  //     if (!parseResult.messages.length) {
  //       return prevMessages;
  //     }
  //     const promises = parseResult.messages.map((message) => {
  //       return new Promise((resolve) => {
  //         if (!message.hasDetails) {
  //           resolve(message.id);
  //         }
  //         this.browser
  //          .getMessageDetail(message.id)
  //          .then(detail => prevMessages.push(spyDetailMessageParser(detail)))
  //           .then(() => message.id);
  //       }).then(id => this.browser.deleteMessage(id));
  //     });
  //     return Promise.all(promises).then(() => getAllSpyMessages(prevMessages));
  //   });
  //}


  // updateView

  //invest(page, planet, code) {
  //  return new Promise((resolve, reject) => {
  //    if (planet === this.lastPlanet) {
  //      return resolve();
  //    }
  //    return this.browser.getView(page, planet)
  //      .then(resolve)
  //      .catch(reject);
  //  }).then(this.browser.invest(page, code))
  //    .then(PARSERS[page]);
  //}
}

export default GameClient;
