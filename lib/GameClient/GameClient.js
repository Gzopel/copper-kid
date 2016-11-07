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

const MISSIONS = {
  ATTACK: 1,
  ESPIONAGE: 6,
}

const MESSAGES = {
  SPY: 20,
}

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
    return this._getPlanetsState(this.planetList)
      .then(() => this.state);
    // TODO PARSE RESEARCH
    // TODO universe speed
  };

  _getPlanetsState = (planets) => {
    if (!planets.length) {
      return Promise.resolve();
    }
    const planet = planets[0];
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
        this.state.ownMissions = fleet.ownMissions;
        this.state.maxOwnMissions = fleet.maxOwnMissions;
        this.state.planets[planet].ships = {
          ...this.state.planets[planet].ships,
          ...fleet.planet.ships,
        };
        return this._getPlanetsState(planets.slice(1));
      });
  }

  updateFleetState = (planet = this.lastPlanet) => {
    return this.browser.getView(planet, PAGES.FLEET)
      .then((html) => {
        const fleet = fleetOnePageParser(html);
        this.state.ownMissions = fleet.ownMissions;
        this.state.maxOwnMissions = fleet.maxOwnMissions;
        this.state.planets[planet].ships = {
          ...this.state.planets[planet].ships,
          ...fleet.planet.ships,
        };
        return this.state;
      });
  }

  galaxyScan = (galaxy, fromSystem, toSystem, planet = this.lastPlanet) => {
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
    return this._sendFleet(
      coordinates,
      { [GAME_ELEMENTS.ESPIONAGE_PROBE.code]:probes },
      MISSIONS.ESPIONAGE,
      planet
    );
  };

  attackPlanet = (coordinates, fleet, planet = this.lastPlanet) => {
    return this._sendFleet(
      coordinates,
      fleet,
      MISSIONS.ATTACK,
      planet
    );
  };

  _sendFleet = (coordinates, fleet, mission, planet = this.lastPlanet) => {
    return this.browser.getView(planet, PAGES.FLEET).then(() => {
      const fromCoordinates = this.state.planets[planet].coordinates;
      return this.browser.postFleetSelect(fromCoordinates, fleet);
    }).then(() => {
      // TODO check we are in the correct screen
      return this.browser.postTargetAndSpeedSelect(coordinates, fleet);
    }).then((html) => {
      const token = fleetThreePageParser(html).token;
      // TODO check we are in the correct screen
      return this.browser.sendFleet(coordinates, fleet, mission, token);
    }).then(() => {
      this.lastPlanet = planet;
      return this.browser.getView(planet, PAGES.FLEET)
        .then(fleetOnePageParser);
    });
  };

  getAllSpyMessages = (prevMessages = []) => {
    return this.browser.getMessages(MESSAGES.SPY)
      .then(messagesPageParser)
      .then((parseResult) => {
        if (!parseResult.length) {
         return prevMessages;
        }
        const ownMessages = parseResult
          .filter(message =>  message.hasDetails)
          .map(message => message.id);

        const enemyMessages = parseResult
          .filter(message =>  !message.hasDetails)
          .map(message => message.id);

        return this._deleteMessages(enemyMessages)
          .then(() => this._readAndDeleteSpyMessages(ownMessages, prevMessages))
          .then((messages) => this.getAllSpyMessages(messages));
     });
  }

  _readAndDeleteSpyMessages(ids, messages = []) {
    if (!ids.length) {
      return Promise.resolve(messages);
    }
    const id = ids[0];
    return this.browser.getMessageDetail(id, MESSAGES.SPY)
      .then((html) => {
        messages.push(spyDetailMessageParser(html));
        return this.browser.deleteMessage(id);
      })
      .then(() => {
        return this._readAndDeleteSpyMessages(ids.slice(1), messages);
      });
  }

  _deleteMessages(ids) {
    if (!ids.length) {
      return Promise.resolve();
    }
    const id = ids[0];
    return this.browser.deleteMessage(id)
      .then(() => {
        return this._deleteMessages(ids.slice(1));
      });
  }

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
