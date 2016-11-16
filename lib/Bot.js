import { CODES, GAME_ELEMENTS, buildingCostByLevel, storageByLevel } from './GameElements';
import GameClient from './GameClient';

// Code below call for a refactor into a Resource class.

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

const totalResources = (resources) => {
  return resources.metal +
    resources.crystal +
    resources.deuterium;
}

const subsResources = (resourceOne, resourceTwo) => {
  return {
    metal: resourceOne.metal - resourceTwo.metal,
    crystal: resourceOne.crystal - resourceTwo.crystal,
    deuterium: resourceOne.deuterium - resourceTwo.deuterium,
    energy: resourceOne.energy - resourceTwo.energy,
  };
}

const multResources = (resourceOne, scalar) => {
  return {
    metal: resourceOne.metal * scalar,
    crystal: resourceOne.crystal * scalar,
    deuterium: resourceOne.deuterium * scalar,
    energy: resourceOne.energy * scalar,
  };
}

const contains = (resourceOne, resourceTwo, type) =>
  resourceTwo[type] ? resourceOne[type] / resourceTwo[type] : Infinity;

const resourceContainsTimes = (resourceOne, resourceTwo) => {
  const metal = contains(resourceOne, resourceTwo, 'metal');
  const crystal = contains(resourceOne, resourceTwo, 'crystal');
  const deuterium = contains(resourceOne, resourceTwo, 'metal');
  return Math.floor(Math.min(metal, crystal, deuterium));
}

const getBuildingInvestment = (planet) => {
  if (planet.buildingCountdown) {
    console.log('Already building something');
    return null;
  }
  const resources = planet.resources;
  const metalMineLevel = planet.resourceBuildings[CODES.METAL_MINE];
  const crystalMineLevel = planet.resourceBuildings[CODES.CRYSTAL_MINE];
  const solarPlantLevel = planet.resourceBuildings[CODES.SOLAR_PLANT];
  const metalStorageLevel = planet.resourceBuildings[CODES.METAL_STORAGE];
  const crystalStorageLevel = planet.resourceBuildings[CODES.CRYSTAL_STORAGE];
  const deuteriumTankLevel = planet.resourceBuildings[CODES.DEUTERIUM_TANK];
  let investmentCode;
  let investmentLevel;
  if (metalMineLevel < crystalMineLevel + 2) {
    investmentCode = CODES.METAL_MINE;
    investmentLevel = metalMineLevel + 1;
  } else {
    investmentCode = CODES.CRYSTAL_MINE;
    investmentLevel = crystalMineLevel + 1;
  }
  let cost = buildingCostByLevel(investmentCode, investmentLevel);
  if (cost.energy > resources.energy) {
    investmentCode = CODES.SOLAR_PLANT;
    investmentLevel = solarPlantLevel + 1;
  }
  cost = buildingCostByLevel(investmentCode, investmentLevel);
  if (cost.metal > storageByLevel(metalStorageLevel)) {
    investmentCode = CODES.METAL_STORAGE;
    investmentLevel = metalStorageLevel + 1;
  } else if (cost.crystal > storageByLevel(crystalStorageLevel)) {
    investmentCode = CODES.CRYSTAL_STORAGE;
    investmentLevel = crystalStorageLevel + 1;
  } else if (resources.deuterium >= storageByLevel(deuteriumTankLevel)) {
    investmentCode = CODES.DEUTERIUM_TANK;
    investmentLevel = deuteriumTankLevel + 1;
  }
  cost = buildingCostByLevel(investmentCode, investmentLevel);
  if (cost.metal > resources.metal || cost.crystal > resources.metal) {
    console.log('Not enough resources', resources);
    return null;
  }
  return investmentCode;
}

const getDefenceInvestment = (planet) => {
  const investments = [];
  let resources = planet.resources;
  const metalStorageLevel = planet.resourceBuildings[CODES.METAL_STORAGE];
  const crystalStorageLevel = planet.resourceBuildings[CODES.CRYSTAL_STORAGE];
  const deuteriumTankLevel = planet.resourceBuildings[CODES.DEUTERIUM_TANK];
  const totalStorage = storageByLevel(metalStorageLevel) +
    storageByLevel(crystalStorageLevel) +
    storageByLevel(deuteriumTankLevel) +
    getUnitCosts(planet.ships); // consider fleet as a resource
  const defenceCost = getUnitCosts(planet.defences);
  if (2 * totalStorage < defenceCost) {
    console.log('No need for building defence');
    return investments;
  }
  if (planet.facilitiesBuildings[CODES.SHIPYARD] >= 6) {
    // this requires more verification, but for my accounts work ;)
    const cost = GAME_ELEMENTS[CODES.GAUSS_CANNON].baseCost;
    const amount = resourceContainsTimes(resources, cost);
    if (amount > 0) {
      investments.push({ code: CODES.GAUSS_CANNON, amount: amount });
      resources = subsResources(resources, multResources(cost, amount));
    }
  }
  if (planet.facilitiesBuildings[CODES.SHIPYARD] > 1) {
    const llCost = GAME_ELEMENTS[CODES.LIGHT_LASER].baseCost;
    const llAmount = resourceContainsTimes(resources, llCost);
    if (llAmount > 0) {
      investments.push({ code: CODES.LIGHT_LASER, amount: llAmount });
      resources = subsResources(resources, multResources(llCost, llAmount));
    }
    const rlCost = GAME_ELEMENTS[CODES.ROCKET_LAUNCHER].baseCost;
    const rlAmount = resourceContainsTimes(resources, rlCost);
    if (rlAmount > 0) {
      investments.push({ code: CODES.ROCKET_LAUNCHER, amount: rlAmount });
    }
  }
  return investments;
}

const getUnitCosts = (units) => {
  let cost = 0;
  Object.keys(units).forEach((key) => {
    const amount = units[key];
    cost += amount * totalResources(GAME_ELEMENTS[key].baseCost);
  });
  return cost;
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

  spyAll = (targets, planet, retries = 0) => {
    if (!targets.length || retries >= 6) {
      return Promise.resolve();
    }
    if ((this.gameState.ownMissions === this.gameState.maxOwnMissions)
     || (this.gameState.planets[planet].ships[CODES.ESPIONAGE_PROBE]) < this.spyProbes) {
      console.log('waiting 30 secs...')
      return new Promise((resolve) => {
        setTimeout(resolve, 30 * 1000);
      })
        .then(this.client.updateFleetState)
        .then((state) => {
          this.gameState = state;
          return this.spyAll(targets, planet, retries + 1);
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
    if (!targets.length || !this.hasFreeSlotsForAttack() || !this.hasAttackingFleet(planet)) {
      return Promise.resolve();
    }
    const target = targets.shift();
    const plunder = calculatePlunder(target);

    const ship = this.gameState.planets[planet].ships[CODES.LARGE_CARGO] ?
      CODES.LARGE_CARGO :
      CODES.SMALL_CARGO;

    const cargoCapacity = GAME_ELEMENTS[ship].cargoCapacity;

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

  hasAttackingFleet(planet) {
    return (this.gameState.planets[planet].ships[CODES.SMALL_CARGO] ||
      this.gameState.planets[planet].ships[CODES.LARGE_CARGO]);
  }

  invest = () => {
    return this.client.fetchGameState()
      .then((state) => {
        this.gameState = state;
        return this._doInvest(Object.keys(state.planets));
      });
  }

  _doInvest = (planets) => {
    if (!planets || !planets.length) {
      return Promise.resolve();
    }
    const planetId = planets.shift();
    const planet = this.gameState.planets[planetId];
    const buildingInvestment = getBuildingInvestment(planet);
    if (buildingInvestment) {
      return this.client.invest(buildingInvestment, planetId)
        .then(() => this._doInvest(planets));
    }
    const defenceInvestment = getDefenceInvestment(planet);
    return this._doUnitInvest(planetId, defenceInvestment)
      .then(() => this._doInvest(planets));
  }

  _doUnitInvest = (planetId, defenceInvestment) => {
    if (!defenceInvestment || !defenceInvestment.length) {
      return Promise.resolve();
    }
    const investment = defenceInvestment.shift();
    return this.client.buildUnit(investment.code, investment.amount, planetId)
      .then(() => this._doUnitInvest(planetId, defenceInvestment));
  }

  farm = (attackingPlanets) => {
    if (!attackingPlanets.length) {
      return Promise.reject('No attackingPlanets');
    }

    if (!this.hasFreeSlotsForAttack()) {
      console.log(`${new Date().getMinutes()} waiting 20 min...`)
      return new Promise((resolve) => {
        setTimeout(resolve, 20 * 60 * 1000);
      })
        .then(this.client.updateFleetState)
        .then((state) => {
          this.gameState = state;
          return this.farm(attackingPlanets);
        })
        .catch((error) => {
          console.log('Got error', error);
          return this.client.login()
            .then(this.client.getAllSpyMessages)
            .then(this.client.fetchGameState)
            .then((state) => {
              this.gameState = state;
              return this.farm(attackingPlanets);
            });
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
        console.log('waiting for messages...');
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
        return this.invest()
          .then(() => this.farm(attackingPlanets.concat(attackingPlanets.shift())));// infinite loop
      })
      .catch((error) => {
        console.log('Got error', error);
        return this.client.login()
          .then(this.client.getAllSpyMessages)
          .then(this.client.fetchGameState)
          .then((state) => {
            this.gameState = state;
            return this.farm(attackingPlanets);
          });
      });
  }

  getAttackingPlanets = () => {
    return Object.keys(this.gameState.planets).filter((key) => {
      const ships = this.gameState.planets[key].ships;
      return (
        ships[CODES.SMALL_CARGO] +
        ships[CODES.LARGE_CARGO] >= 4) &&
        ships[CODES.ESPIONAGE_PROBE] >= 10;
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
