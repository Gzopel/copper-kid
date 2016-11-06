import { account } from './config/account';
import { GAME_ELEMENTS } from './lib/GameElements';
import GameClient from './lib/GameClient';

const spyProbes = 1;
const attackRange = 10;

const client = new GameClient(account);

let gameState;
let galaxy = [];

const updateGalaxy = (planets) => {
  const newPlanets = planets.map(planet => planet.planetId);
  galaxy = galaxy.filter((planet) => {
    return newPlanets.indexOf(planet.planetId) === -1
  }).concat(planets);
}

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

const spyAll = (targets, planet) => {
  if (!targets.length) {
    return Promise.resolve();
  }
  if (gameState.ownMissions === gameState.maxOwnMissions) { 
    console.log('waiting 2 min...')
    return new Promise((resolve) => {
      setTimeout(resolve, 2 * 60 * 1000 )
    })
    .then(client.updateFleetState)
    .then((state) => {
      gameState = state;
      return spyAll(targets, planet);
    });
  }
  const target = targets.shift().coordinates;
  console.log('spying', target);
  return client.spyPlanet(target, spyProbes, planet)
    .then((fleet) => {
      console.log(`Fleets ${fleet.ownMissions}/${fleet.maxOwnMissions}`);
      gameState.ownMissions = fleet.ownMissions;
      gameState.maxOwnMissions = fleet.maxOwnMissions;
      return spyAll(targets, planet);
    });
}

const attackAll = (planet, targets) => {
  if (!targets.length || 
    gameState.ownMissions === gameState.maxOwnMissions ||
    (!gameState.planets[planet].ships[GAME_ELEMENTS.SMALL_CARGO.code] && 
     !gameState.planets[planet].ships[GAME_ELEMENTS.LARGE_CARGO.code])) { 
    return Promise.resolve();
  }
  const target = targets.shift();
  const plunder = calculatePlunder(target);

  const ship = gameState.planets[planet].ships[GAME_ELEMENTS.LARGE_CARGO.code] ?
    GAME_ELEMENTS.LARGE_CARGO.code : 
    GAME_ELEMENTS.SMALL_CARGO.code;

  const cargoCapacity = gameState.planets[planet].ships[GAME_ELEMENTS.LARGE_CARGO.code] ?
    GAME_ELEMENTS.LARGE_CARGO.cargoCapacity : 
    GAME_ELEMENTS.SMALL_CARGO.cargoCapacity;

  const amount = Math.min(
    gameState.planets[planet].ships[ship],
    Math.ceil(plunder / cargoCapacity)
  );

  console.log(`Attacking with ${ship} x ${amount} for ${plunder}`,target.coordinates);

  if (!amount) {
    return Promise.resolve();
  }

  return client.attackPlanet(
      target.coordinates, 
      {
        [ship]: amount,
      },
      planet
    ).then((fleet) => {
      console.log(`Fleets ${fleet.ownMissions}/${fleet.maxOwnMissions}`);
      gameState.ownMissions = fleet.ownMissions;
      gameState.maxOwnMissions = fleet.maxOwnMissions;
      gameState.planets[planet].ships = {
        ...gameState.planets[planet].ships,
        ...fleet.planet.ships,
      }
      return attackAll(planet, targets)
    });
}

const farm = (attackingPlanets) => { // infinite loop
  if (!attackingPlanets.length) {
    return Promise.reject('No attackingPlanets');
  }

  if (gameState.ownMissions === gameState.maxOwnMissions) {
    console.log('waiting 10 min...')
    return new Promise((resolve) => {
      setTimeout(resolve, 10 * 60 * 1000 )
    })
    .then(client.updateFleetState)
    .then((state) => {
      gameState = state;
      return farm(attackingPlanets);
    })
  }
  const planet = gameState.planets[attackingPlanets[0]];
  const coordinates = planet.coordinates;
  console.log('Starting farming routine', coordinates);
  return client.galaxyScan(coordinates.galaxy, coordinates.system - attackRange, coordinates.system + attackRange)
    .then((newPlanets) => {
      updateGalaxy(newPlanets);
      const inactive = newPlanets.filter((planet) => planet.playerStatus === 'inactive');
      console.log(`Got ${inactive.length} spy targets`);
      return spyAll(inactive, planet.planetId);
    })
    .then(() => {
      console.log('wait for the messages...');
      return new Promise((resolve) => {
        setTimeout(resolve, 2 * 60 * 1000);
      })
    })
    .then(client.updateFleetState)
    .then((state) => {
      gameState = state;
    })
    .then(client.getAllSpyMessages)
    .then((messages) => {
      console.log(`Got ${messages.length} messages`);
      return messages.filter((message) => {
        return ( 
          message.fleet &&
          message.defences &&
          Object.keys(message.fleet).length === 0 &&
          Object.keys(message.defences).length === 0 
        )
      }).sort((messageOne, messageTwo) => {
        return resourcesValue(messageTwo.resources) - resourcesValue(messageOne.resources);
      });
    })
    .then((targets) => attackAll(planet.planetId, targets))
    .then(() => {
      return farm(attackingPlanets.concat(attackingPlanets.shift()));
    });

}

const getAttackingPlanets = () => {
  return Object.keys(gameState.planets).filter((key) => {
    const ships = gameState.planets[key].ships;
    return ( ships[GAME_ELEMENTS.SMALL_CARGO.code] + ships[GAME_ELEMENTS.LARGE_CARGO.code] >= 10 ) &&
      ships[GAME_ELEMENTS.ESPIONAGE_PROBE.code] >= 10;
  })
}

const play = () => {
  client.login()
    .then(client.fetchGameState)
    .then((state) => {
      gameState = state;
    })
    .then(client.getAllSpyMessages)// discard old messages
    .then(getAttackingPlanets)
    .then((attackingPlanets) => {
      console.log('attackingPlanets',attackingPlanets);
      return farm(attackingPlanets);
    })
    .catch((error) => {
      console.log(`Got fatal error ${error}. Restarting`)
      play()
    });
};

play();