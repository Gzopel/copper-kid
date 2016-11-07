import { GAME_ELEMENTS } from './GameElements';
import GameClient from './GameClient';

const calculatePlunder = (report) => {
  return (
      report.resources.metal +
      report.resources.crystal +
      report.resources.deuterium
    ) / 2;
}

const resourcesValue = (resources) => {
  return resources.metal +
    2 * resources.crystal +
    3 * resources.deuterium;
}

export class Bot {
  constructor(account) {
    this.spyProbes = account.spyProbes;
    this.attackRange = account.attackRange;
    this.reservedFleetSlots = account.reservedFleetSlots;
    this.gameState = {};
    this.galaxy = [];
    this.client = new GameClient(account);
  }

  updateGalaxy = (planets) => {
    const newPlanets = planets.map(planet => planet.planetId);
    this.galaxy = this.galaxy.filter((planet) => {
      return newPlanets.indexOf(planet.planetId) === -1;
    }).concat(planets);
  }

  spyAll = (targets, planet) => {
    if (!targets.length) {
      return Promise.resolve();
    }
    if (this.gameState.ownMissions === this.gameState.maxOwnMissions) {
      console.log('waiting 30 secs...')
      return new Promise((resolve) => {
        setTimeout(resolve, 30 * 1000);
      })
        .then(this.client.updateFleetState)
        .then((state) => {
          this.gameState = state;
          return this.spyAll(targets, planet);
        });
    }
    const target = targets.shift().coordinates;
    console.log('spying', target);
    return this.client.spyPlanet(target, this.spyProbes, planet)
      .then((fleet) => {
        console.log(`Fleets ${fleet.ownMissions}/${fleet.maxOwnMissions}`);
        this.gameState.ownMissions = fleet.ownMissions;
        this.gameState.maxOwnMissions = fleet.maxOwnMissions;
        return this.spyAll(targets, planet);
      });
  }

  attackAll = (planet, targets) => {
    if (!targets.length || !this.hasFreeSlotsForAttack() ||
      (!this.gameState.planets[planet].ships[GAME_ELEMENTS.SMALL_CARGO.code] &&
      !this.gameState.planets[planet].ships[GAME_ELEMENTS.LARGE_CARGO.code])) {
      return Promise.resolve();
    }
    const target = targets.shift();
    const plunder = calculatePlunder(target);

    const ship = this.gameState.planets[planet].ships[GAME_ELEMENTS.LARGE_CARGO.code] ?
      GAME_ELEMENTS.LARGE_CARGO.code :
      GAME_ELEMENTS.SMALL_CARGO.code;

    const cargoCapacity = this.gameState.planets[planet].ships[GAME_ELEMENTS.LARGE_CARGO.code] ?
      GAME_ELEMENTS.LARGE_CARGO.cargoCapacity :
      GAME_ELEMENTS.SMALL_CARGO.cargoCapacity;

    const amount = Math.min(
      this.gameState.planets[planet].ships[ship],
      Math.ceil(plunder / cargoCapacity)
    );

    console.log(`Attacking with ${ship} x ${amount} for ${plunder}`, target.coordinates);

    if (!amount) {
      return Promise.resolve();
    }

    return this.client.attackPlanet(
      target.coordinates,
      {
        [ship]: amount,
      },
      planet
    ).then((fleet) => {
      console.log(`Fleets ${fleet.ownMissions}/${fleet.maxOwnMissions}`);
      this.gameState.ownMissions = fleet.ownMissions;
      this.gameState.maxOwnMissions = fleet.maxOwnMissions;
      this.gameState.planets[planet].ships = {
        ...this.gameState.planets[planet].ships,
        ...fleet.planet.ships,
      }
      return this.attackAll(planet, targets);
    });
  }

  hasFreeSlotsForAttack() {
    return this.gameState.ownMissions < this.gameState.maxOwnMissions - this.reservedFleetSlots;
  }

  farm = (attackingPlanets) => { // infinite loop
    if (!attackingPlanets.length) {
      return Promise.reject('No attackingPlanets');
    }

    if (!this.hasFreeSlotsForAttack()) {
      console.log('waiting 10 min...')
      return new Promise((resolve) => {
        setTimeout(resolve, 10 * 60 * 1000);
      })
        .then(this.client.updateFleetState)
        .then((state) => {
          this.gameState = state;
          return this.farm(attackingPlanets);
        });
    }
    const planet = this.gameState.planets[attackingPlanets[0]];
    const coordinates = planet.coordinates;
    console.log('Starting farming routine', coordinates);
    return this.client.galaxyScan(
      coordinates.galaxy,
      coordinates.system - this.attackRange,
      coordinates.system + this.attackRange)
      .then((newPlanets) => {
        this.updateGalaxy(newPlanets);
        const inactive = newPlanets.filter(newPlanet => newPlanet.playerStatus === 'inactive');
        console.log(`Got ${inactive.length} spy targets`);
        return this.spyAll(inactive, planet.planetId);
      })
      .then(() => {
        console.log('wait for the messages...');
        return new Promise((resolve) => {
          setTimeout(resolve, 2 * 60 * 1000);
        });
      })
      .then(this.client.updateFleetState)
      .then((state) => {
        this.gameState = state;
      })
      .then(this.client.getAllSpyMessages)
      .then((messages) => {
        console.log(`Got ${messages.length} messages`);
        return messages.filter((message) => {
          return (
            message.fleet &&
            message.defences &&
            Object.keys(message.fleet).length === 0 &&
            Object.keys(message.defences).length === 0
          );
        }).sort((messageOne, messageTwo) => {
          return resourcesValue(messageTwo.resources) - resourcesValue(messageOne.resources);
        });
      })
      .then(targets => this.attackAll(planet.planetId, targets))
      .then(() => {
        return this.farm(attackingPlanets.concat(attackingPlanets.shift()));
      });
  }

  getAttackingPlanets = () => {
    return Object.keys(this.gameState.planets).filter((key) => {
      const ships = this.gameState.planets[key].ships;
      return (
        ships[GAME_ELEMENTS.SMALL_CARGO.code] +
        ships[GAME_ELEMENTS.LARGE_CARGO.code] >= 10) &&
        ships[GAME_ELEMENTS.ESPIONAGE_PROBE.code] >= 10;
    });
  }

  play = () => {
    this.client.login()
      .then(this.client.fetchGameState)
      .then((state) => {
        console.log(state);
        this.gameState = state;
      })
      .then(this.client.getAllSpyMessages)// discard old messages
      .then(this.getAttackingPlanets)
      .then((attackingPlanets) => {
        console.log('attackingPlanets', attackingPlanets);
        return this.farm(attackingPlanets);
      })
      .catch((error) => {
        console.log(`Got fatal error ${error}. Restarting`);
        this.play();
      });
  }
}

export default Bot;
