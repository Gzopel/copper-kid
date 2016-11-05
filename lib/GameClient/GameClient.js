import { GAME_ELEMENTS } from '../GameElements';
import { loginPageParser } from './parsers/loginPageParser';
import { overviewPageParser } from './parsers/overviewPageParser';
import { resourcesPageParser } from './parsers/resourcesPageParser';
import { facilitiesPageParser } from './parsers/facilitiesPageParser';
import { defencePageParser } from './parsers/defencePageParser';
import { fleetOnePageParser } from './parsers/fleetOnePageParser';
import { fleetThreePageParser } from './parsers/fleetThreePageParser';
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
    this.planetList = [];
    this.state = {
      planets: {},
    };
    // this lastPage
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
        this.planetList = overview.planets;
        return overview;
      });
  }

  fetchGameState = () => {
    const promises = this.planetList.map((planet) => {
      return this.browser.getView(planet, PAGES.RESOURCES)
        .then((html) => {
          const resources = resourcesPageParser(html);
          this.state.planets[planet] = resources.planet;
          return this.browser.getView(planet, PAGES.STATION);
        })
        .then((html) => {
          const facilities = facilitiesPageParser(html);
          this.state.planets[planet] = {
            ...this.state.planets[planet],
            ...facilities.planet,
          };
          return this.browser.getView(planet, PAGES.DEFENSE);
        })
        .then((html) => {
          const defences = defencePageParser(html);
          this.state.planets[planet] = {
            ...this.state.planets[planet],
            ...defences.planet,
          };
          return this.browser.getView(planet, PAGES.FLEET);
        })
        .then((html) => {
          const fleet = fleetOnePageParser(html);
          this.state.planets[planet].ships = {
            ...this.state.planets[planet].ships,
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
    return Promise.all(promises).then(() => this.state);
  };

  galaxyScan = (galaxy, fromSystem, toSystem, planet = this.lastPlanet) => {
    // TODO refactor to make a single request at a time.
    return this.browser.getView(planet, PAGES.GALAXY).then(() => {
      return this._doGalaxyScan(galaxy, fromSystem, toSystem);
    });
  };

  _doGalaxyScan = (galaxy, fromSystem, toSystem, planets = []) => {
    return this.browser.getGalaxyView(galaxy, fromSystem)
      .then((json) => {
        planets = planets.concat(galaxyPageParser(json.galaxy));
        fromSystem++;
        if (fromSystem <= toSystem) {
          return this._doGalaxyScan(galaxy, fromSystem, toSystem, planets);
        }
        return planets;
      });
  };

  spyPlanet = (coordinates, probes = 1, planet = this.lastPlanet) => {
    const fleetToSend = {};
    return this.browser.getView(planet, PAGES.FLEET).then((html) => {
      const fleetOnPlanet = fleetOnePageParser(html).planet.ships;
      console.log('Fleet on planet', fleetOnPlanet);
      Object.keys(fleetOnPlanet).forEach((type) => { // this is silly but is what we have to send.
        fleetToSend[type] = parseInt(type, 10) === GAME_ELEMENTS.ESPIONAGE_PROBE.code ? probes : null;
      });
      const fromCoordinates = this.state.planets[planet].coordinates;
      return this.browser.postFleetSelect(fromCoordinates, fleetToSend);
    }).then(() => {
      // TODO check we are in the correct screen
      return this.browser.postTargetAndSpeedSelect(coordinates, fleetToSend);
    }).then((html) => {
      const token = fleetThreePageParser(html).token;
      // TODO check we are in the correct screen
      return this.browser.sendFleet(coordinates, fleetToSend, 6, token); // TODO create mission constants
    }).then(() => {
      this.lastPlanet = planet;
      return this.browser.getView(planet, PAGES.FLEET)
        .then(fleetOnePageParser);
    });
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
