export const CODES = {
  METAL_MINE: 1,
  CRYSTAL_MINE: 2,
  DEUTERIUM_SYNTHESIZER: 3,
  SOLAR_PLANT: 4,
  FUSION_REACTOR: 12,
  ROBOTICS_FACTORY: 14,
  NANITE_FACTORY: 15,
  SHIPYARD: 21,
  METAL_STORAGE: 22,
  CRYSTAL_STORAGE: 23,
  DEUTERIUM_TANK: 24,
  RESEARCH_LAB: 31,
  TERRAFORMER: 33,
  ALLIANCE_DEPOT: 34,
  SPACE_DOCK: 36,
  MISSILE_SILO: 44,
  ESPIONAGE_TECHNOLOGY: 106,
  COMPUTER_TECHNOLOGY: 108,
  WEAPONS_TECHNOLOGY: 109,
  SHIELDING_TECHNOLOGY: 110,
  ARMOUR_TECHNOLOGY: 111,
  ENERGY_TECHNOLOGY: 113,
  HYPERSPACE_TECHNOLOGY: 114,
  COMBUSTION_DRIVE: 115,
  IMPULSE_DRIVE: 117,
  HYPERSPACE_DRIVE: 118,
  LASER_TECHNOLOGY: 120,
  ION_TECHNOLOGY: 121,
  PLASMA_TECHNOLOGY: 122,
  INTERGALACTIC_RESEARCH_NETWORK: 123,
  ASTROPHYSICS: 124,
  GRAVITON_TECHNOLOGY: 199,
  SMALL_CARGO: 202,
  LARGE_CARGO: 203,
  LIGHT_FIGHTER: 204,
  HEAVY_FIGHTER: 205,
  CRUISER: 206,
  BATTLESHIP: 207,
  COLONY_SHIP: 208,
  RECYCLER: 209,
  ESPIONAGE_PROBE: 210,
  BOMBER: 211,
  SOLAR_SATELLITE: 212,
  DESTROYER: 213,
  DEATHSTAR: 214,
  BATTLECRUISER: 215,
  ROCKET_LAUNCHER: 401,
  LIGHT_LASER: 402,
  HEAVY_LASER: 403,
  GAUSS_CANNON: 404,
  ION_CANNON: 405,
  PLASMA_TURRET: 406,
  SMALL_SHIELD_DOME: 407,
  LARGE_SHIELD_DOME: 408,
  ANTI_BALLISTIC_MISSILE: 502,
  INTERPLANETARY_MISSILE: 503,
};

export const GAME_ELEMENTS = {
  [CODES.METAL_MINE]: {
    code: 1,
    baseCost: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 11,
    },
  },
  [CODES.CRYSTAL_MINE]: {
    code: 2,
    baseCost: {
      metal: 48,
      crystal: 24,
      deuterium: 0,
      energy: 11,
    },
  },
  [CODES.DEUTERIUM_SYNTHESIZER]: {
    baseCost: {
      metal: 225,
      crystal: 75,
      deuterium: 0,
      energy: 22,
    },
  },
  [CODES.SOLAR_PLANT]: {
    baseCost: {
      metal: 75,
      crystal: 30,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.FUSION_REACTOR]: {
    baseCost: {
      metal: 900,
      crystal: 360,
      deuterium: 180,
      energy: 0,
    },
  },
  [CODES.ROBOTICS_FACTORY]: {
    baseCost: {
      metal: 400,
      crystal: 120,
      deuterium: 200,
      energy: 0,
    },
  },
  [CODES.NANITE_FACTORY]: {
    baseCost: {
      metal: 1000000,
      crystal: 500000,
      deuterium: 100000,
      energy: 0,
    },
  },
  [CODES.SHIPYARD]: {
    baseCost: {
      metal: 400,
      crystal: 200,
      deuterium: 100,
      energy: 0,
    },
  },
  [CODES.METAL_STORAGE]: {
    baseCost: {
      metal: 1000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.CRYSTAL_STORAGE]: {
    baseCost: {
      metal: 1000,
      crystal: 500,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.DEUTERIUM_TANK]: {
    baseCost: {
      metal: 1000,
      crystal: 1000,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.RESEARCH_LAB]: {
    baseCost: {
      metal: 200,
      crystal: 400,
      deuterium: 200,
      energy: 0,
    },
  },
  [CODES.TERRAFORMER]: {
    baseCost: {
      metal: 0,
      crystal: 50000,
      deuterium: 100000,
      energy: 1000,
    },
  },
  [CODES.ALLIANCE_DEPOT]: {
    baseCost: {
      metal: 20000,
      crystal: 40000,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.SPACE_DOCK]: {
    baseCost: {
      metal: 200,
      crystal: 0,
      deuterium: 50,
      energy: 50,
    },
  },
  [CODES.MISSILE_SILO]: {
    baseCost: {
      metal: 20000,
      crystal: 20000,
      deuterium: 1000,
      energy: 0,
    },
  },
  [CODES.ESPIONAGE_TECHNOLOGY]: {
    baseCost: {
      metal: 200,
      crystal: 1000,
      deuterium: 200,
      energy: 0,
    },
  },
  [CODES.COMPUTER_TECHNOLOGY]: {
    baseCost: {
      metal: 0,
      crystal: 400,
      deuterium: 600,
      energy: 0,
    },
  },
  [CODES.WEAPONS_TECHNOLOGY]: {
    baseCost: {
      metal: 800,
      crystal: 200,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.SHIELDING_TECHNOLOGY]: {
    baseCost: {
      metal: 200,
      crystal: 600,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.ARMOUR_TECHNOLOGY]: {
    baseCost: {
      metal: 1000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.ENERGY_TECHNOLOGY]: {
    baseCost: {
      metal: 0,
      crystal: 800,
      deuterium: 400,
      energy: 0,
    },
  },
  [CODES.HYPERSPACE_TECHNOLOGY]: {
    baseCost: {
      metal: 0,
      crystal: 4000,
      deuterium: 2000,
      energy: 0,
    },
  },
  [CODES.COMBUSTION_DRIVE]: {
    baseCost: {
      metal: 400,
      crystal: 0,
      deuterium: 600,
      energy: 0,
    },
  },
  [CODES.IMPULSE_DRIVE]: {
    baseCost: {
      metal: 2000,
      crystal: 4000,
      deuterium: 600,
      energy: 0,
    },
  },
  [CODES.HYPERSPACE_DRIVE]: {
    baseCost: {
      metal: 10000,
      crystal: 20000,
      deuterium: 6000,
      energy: 0,
    },
  },
  [CODES.LASER_TECHNOLOGY]: {
    baseCost: {
      metal: 200,
      crystal: 100,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.ION_TECHNOLOGY]: {
    baseCost: {
      metal: 1000,
      crystal: 300,
      deuterium: 100,
      energy: 0,
    },
  },
  [CODES.PLASMA_TECHNOLOGY]: {
    baseCost: {
      metal: 2000,
      crystal: 4000,
      deuterium: 1000,
      energy: 0,
    },
  },
  [CODES.INTERGALACTIC_RESEARCH_NETWORK]: {
    baseCost: {
      metal: 240000,
      crystal: 400000,
      deuterium: 160000,
      energy: 0,
    },
  },
  [CODES.ASTROPHYSICS]: {
    baseCost: {
      metal: 4000,
      crystal: 8000,
      deuterium: 4000,
      energy: 0,
    },
  },
  [CODES.GRAVITON_TECHNOLOGY]: {
    baseCost: {
      metal: 0,
      crystal: 0,
      deuterium: 0,
      energy: 300000,
    },
  },
  [CODES.SMALL_CARGO]: {
    baseCost: {
      metal: 2000,
      crystal: 2000,
      deuterium: 0,
      energy: 0,
    },
    cargoCapacity: 5000,
  },
  [CODES.LARGE_CARGO]: {
    baseCost: {
      metal: 6000,
      crystal: 6000,
      deuterium: 0,
      energy: 0,
    },
    cargoCapacity: 25000,
  },
  [CODES.LIGHT_FIGHTER]: {
    baseCost: {
      metal: 3000,
      crystal: 1000,
      deuterium: 0,
      energy: 0,
    },
    cargoCapacity: 50,
  },
  [CODES.HEAVY_FIGHTER]: {
    baseCost: {
      metal: 6000,
      crystal: 4000,
      deuterium: 0,
      energy: 0,
    },
    cargoCapacity: 100,
  },
  [CODES.CRUISER]: {
    baseCost: {
      metal: 20000,
      crystal: 7000,
      deuterium: 2000,
      energy: 0,
    },
    cargoCapacity: 800,
  },
  [CODES.BATTLESHIP]: {
    baseCost: {
      metal: 45000,
      crystal: 15000,
      deuterium: 0,
      energy: 0,
    },
    cargoCapacity: 1500,
  },
  [CODES.COLONY_SHIP]: {
    baseCost: {
      metal: 10000,
      crystal: 20000,
      deuterium: 10000,
      energy: 0,
    },
    cargoCapacity: 7500,
  },
  [CODES.RECYCLER]: {
    baseCost: {
      metal: 10000,
      crystal: 6000,
      deuterium: 2000,
      energy: 0,
    },
    cargoCapacity: 20000,
  },
  [CODES.ESPIONAGE_PROBE]: {
    baseCost: {
      metal: 0,
      crystal: 1000,
      deuterium: 0,
      energy: 0,
    },
    cargoCapacity: 0,
  },
  [CODES.BOMBER]: {
    baseCost: {
      metal: 50000,
      crystal: 25000,
      deuterium: 15000,
      energy: 0,
    },
    cargoCapacity: 500,
  },
  [CODES.SOLAR_SATELLITE]: {
    baseCost: {
      metal: 0,
      crystal: 2000,
      deuterium: 500,
      energy: 0,
    },
    cargoCapacity: 0,
  },
  [CODES.DESTROYER]: {
    baseCost: {
      metal: 60000,
      crystal: 50000,
      deuterium: 15000,
      energy: 0,
    },
    cargoCapacity: 2000,
  },
  [CODES.DEATHSTAR]: {
    baseCost: {
      metal: 5000000,
      crystal: 4000000,
      deuterium: 1000000,
      energy: 0,
    },
    cargoCapacity: 1000000,
  },
  [CODES.BATTLECRUISER]: {
    baseCost: {
      metal: 30000,
      crystal: 40000,
      deuterium: 15000,
      energy: 0,
    },
    cargoCapacity: 750,
  },
  [CODES.ROCKET_LAUNCHER]: {
    baseCost: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.LIGHT_LASER]: {
    baseCost: {
      metal: 1500,
      crystal: 500,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.HEAVY_LASER]: {
    baseCost: {
      metal: 6000,
      crystal: 2000,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.GAUSS_CANNON]: {
    baseCost: {
      metal: 20000,
      crystal: 15000,
      deuterium: 2000,
      energy: 0,
    },
  },
  [CODES.ION_CANNON]: {
    baseCost: {
      metal: 2000,
      crystal: 6000,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.PLASMA_TURRET]: {
    baseCost: {
      metal: 50000,
      crystal: 50000,
      deuterium: 30000,
      energy: 0,
    },
  },
  [CODES.SMALL_SHIELD_DOME]: {
    baseCost: {
      metal: 10000,
      crystal: 10000,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.LARGE_SHIELD_DOME]: {
    baseCost: {
      metal: 50000,
      crystal: 50000,
      deuterium: 0,
      energy: 0,
    },
  },
  [CODES.ANTI_BALLISTIC_MISSILE]: {
    baseCost: {
      metal: 8000,
      crystal: 0,
      deuterium: 2000,
      energy: 0,
    },
  },
  [CODES.INTERPLANETARY_MISSILE]: {
    baseCost: {
      metal: 12500,
      crystal: 2500,
      deuterium: 10000,
      energy: 0,
    },
  },
};

const getBaseExponentForBuilding = (code) => {
  switch (code) {
    case CODES.METAL_MINE:
    case CODES.DEUTERIUM_SYNTHESIZER:
    case CODES.SOLAR_PLANT:
      return 1.5;
    case CODES.CRYSTAL_MINE:
      return 1.6;
    case CODES.FUSION_REACTOR:
      return 1.8;
    default:
      return 2;
  }
}

export const buildingCostByLevel = (code, level) => {
  const multiplier = getBaseExponentForBuilding(code) ** (level - 1);
  const baseCost = GAME_ELEMENTS[code].baseCost;
  return {
    metal: Math.round(baseCost.metal * multiplier),
    crystal: Math.round(baseCost.crystal * multiplier),
    deuterium: Math.round(baseCost.deuterium * multiplier),
    energy: level > 1 ?
      Math.round(baseCost.energy * level * (1.1 ** (level - 1)) - baseCost.energy * level * (1.1 ** (level - 2)))
      : baseCost.energy, //ugly af
  };
}

export const storageByLevel = level => 5000 * Math.floor(2.5 * (Math.E ** (20 * level / 33)));
