import { loginPageParser } from './parsers/loginPageParser';
import { overviewPageParser } from './parsers/overviewPageParser';
import { resourcesPageParser } from './parsers/resourcesPageParser';
import { facilitiesPageParser } from './parsers/facilitiesPageParser';
import { defencePageParser } from './parsers/defencePageParser';
import { fleetOnePageParser } from './parsers/fleetOnePageParser';
import { galaxyPageParser } from './parsers/galaxyPageParser';
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

export class GameClient {
  constructor(account) {
    this.account = account;
    this.browser = new Browser();
    this.lastPlanet = null;
    this.planetList = []; // should be replaced with game state?
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
        this.planetList = overview.planets;
        return overview;
      });
  }

  fetchGameState = () => {
    const state = {
      planets: {},
    };
    const promises = this.planetList.map((planet) => {
      return this.browser.getView(planet, PAGES.RESOURCES)
        .then((html) => {
          const resources = resourcesPageParser(html);
          state.planets[planet] = resources.planet;
          return this.browser.getView(planet, PAGES.STATION);
        })
        .then((html) => {
          const facilities = facilitiesPageParser(html);
          state.planets[planet] = {
            ...state.planets[planet],
            ...facilities.planet,
          };
          return this.browser.getView(planet, PAGES.DEFENSE);
        })
        .then((html) => {
          const defences = defencePageParser(html);
          state.planets[planet] = {
            ...state.planets[planet],
            ...defences.planet,
          };
          return this.browser.getView(planet, PAGES.FLEET);
        })
        .then((html) => {
          const fleet = fleetOnePageParser(html);
          state.planets[planet].ships = {
            ...state.planets[planet].ships,
            ...fleet.planet.ships,
          };
        });
    });
    //promeses.push(
    //  new Promise((resolve) => {
    //    this.browser.getView(this.lastPlanet, PAGES.RESEARCH)
    //      .then((html) => {
    //        // TODO PARSE RESEARCH
    //        // TODO add fleet movements
    //        // TODO universe speed
    //      })
    //  })
    //);
    return Promise.all(promises).then(() => state);
  };

  galaxyScan = (galaxy, fromSystem, toSystem, planet = this.lastPlanet) => {
    return this.browser.getView(planet, PAGES.GALAXY).then(() => {
      const promises = [];
      let planets = [];
      for (let system = fromSystem; system <= toSystem; system++) {
        promises.push(new Promise((resolve) => {
          this.browser.getGalaxyView(galaxy, system)
            .then((json) => {
              planets = planets.concat(galaxyPageParser(json.galaxy));
              resolve();
            });
        }));
      }
      return Promise.all(promises).then(() => planets);
    })
  };

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
