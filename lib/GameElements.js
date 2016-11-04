export const GAME_ELEMENTS = {
  METAL_MINE: {
    code: 1,
    baseCost: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      energy: 11,
    },
  },
  CRYSTAL_MINE: {
    code: 2,
    baseCost: {
      metal: 48,
      crystal: 24,
      deuterium: 0,
      energy: 11,
    },
  },
  DEUTERIUM_SYNTHESIZER: {
    code: 3,
    baseCost: {
      metal: 225,
      crystal: 75,
      deuterium: 0,
      energy: 22,
    },
  },
  SOLAR_PLANT: {
    code: 4,
    baseCost: {
      metal: 75,
      crystal: 30,
      deuterium: 0,
      energy: 0,
    },
  },
  FUSION_REACTOR: {
    code: 12,
    baseCost: {
      metal: 900,
      crystal: 360,
      deuterium: 180,
      energy: 0,
    },
  },
  ROBOTICS_FACTORY: {
    code: 14,
    baseCost: {
      metal: 400,
      crystal: 120,
      deuterium: 200,
      energy: 0,
    },
  },
  NANITE_FACTORY: {
    code: 15,
    baseCost: {
      metal: 1000000,
      crystal: 500000,
      deuterium: 100000,
      energy: 0,
    },
  },
  SHIPYARD: {
    code: 21,
    baseCost: {
      metal: 400,
      crystal: 200,
      deuterium: 100,
      energy: 0,
    },
  },
  METAL_STORAGE: {
    code: 22,
    baseCost: {
      metal: 1000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
    },
  },
  CRYSTAL_STORAGE: {
    code: 23,
    baseCost: {
      metal: 1000,
      crystal: 500,
      deuterium: 0,
      energy: 0,
    },
  },
  DEUTERIUM_TANK: {
    code: 24,
    baseCost: {
      metal: 1000,
      crystal: 1000,
      deuterium: 0,
      energy: 0,
    },
  },
  RESEARCH_LAB: {
    code: 31,
    baseCost: {
      metal: 200,
      crystal: 400,
      deuterium: 200,
      energy: 0,
    },
  },
  TERRAFORMER: {
    code: 33,
    baseCost: {
      metal: 0,
      crystal: 50000,
      deuterium: 100000,
      energy: 1000,
    },
  },
  ALLIANCE_DEPOT: {
    code: 34,
    baseCost: {
      metal: 20000,
      crystal: 40000,
      deuterium: 0,
      energy: 0,
    },
  },
  SPACE_DOCK: {
    code: 36,
    baseCost: {
      metal: 200,
      crystal: 0,
      deuterium: 50,
      energy: 50,
    },
  },
  MISSILE_SILO: {
    code: 44,
    baseCost: {
      metal: 20000,
      crystal: 20000,
      deuterium: 1000,
      energy: 0,
    },
  },
  ESPIONAGE_TECHNOLOGY: {
    code: 106,
    baseCost: {
      metal: 200,
      crystal: 1000,
      deuterium: 200,
      energy: 0,
    },
  },
  COMPUTER_TECHNOLOGY: {
    code: 108,
    baseCost: {
      metal: 0,
      crystal: 400,
      deuterium: 600,
      energy: 0,
    },
  },
  WEAPONS_TECHNOLOGY: {
    code: 109,
    baseCost: {
      metal: 800,
      crystal: 200,
      deuterium: 0,
      energy: 0,
    },
  },
  SHIELDING_TECHNOLOGY: {
    code: 110,
    baseCost: {
      metal: 200,
      crystal: 600,
      deuterium: 0,
      energy: 0,
    },
  },
  ARMOUR_TECHNOLOGY: {
    code: 111,
    baseCost: {
      metal: 1000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
    },
  },
  ENERGY_TECHNOLOGY: {
    code: 113,
    baseCost: {
      metal: 0,
      crystal: 800,
      deuterium: 400,
      energy: 0,
    },
  },
  HYPERSPACE_TECHNOLOGY: {
    code: 114,
    baseCost: {
      metal: 0,
      crystal: 4000,
      deuterium: 2000,
      energy: 0,
    },
  },
  COMBUSTION_DRIVE: {
    code: 115,
    baseCost: {
      metal: 400,
      crystal: 0,
      deuterium: 600,
      energy: 0,
    },
  },
  IMPULSE_DRIVE: {
    code: 117,
    baseCost: {
      metal: 2000,
      crystal: 4000,
      deuterium: 600,
      energy: 0,
    },
  },
  HYPERSPACE_DRIVE: {
    code: 118,
    baseCost: {
      metal: 10000,
      crystal: 20000,
      deuterium: 6000,
      energy: 0,
    },
  },
  LASER_TECHNOLOGY: {
    code: 120,
    baseCost: {
      metal: 200,
      crystal: 100,
      deuterium: 0,
      energy: 0,
    },
  },
  ION_TECHNOLOGY: {
    code: 121,
    baseCost: {
      metal: 1000,
      crystal: 300,
      deuterium: 100,
      energy: 0,
    },
  },
  PLASMA_TECHNOLOGY: {
    code: 122,
    baseCost: {
      metal: 2000,
      crystal: 4000,
      deuterium: 1000,
      energy: 0,
    },
  },
  INTERGALACTIC_RESEARCH_NETWORK: {
    code: 123,
    baseCost: {
      metal: 240000,
      crystal: 400000,
      deuterium: 160000,
      energy: 0,
    },
  },
  ASTROPHYSICS: {
    code: 124,
    baseCost: {
      metal: 4000,
      crystal: 8000,
      deuterium: 4000,
      energy: 0,
    },
  },
  GRAVITON_TECHNOLOGY: {
    code: 199,
    baseCost: {
      metal: 0,
      crystal: 0,
      deuterium: 0,
      energy: 300000,
    },
  },
  SMALL_CARGO: {
    code: 202,
    baseCost: {
      metal: 2000,
      crystal: 2000,
      deuterium: 0,
      energy: 0,
    },
  },
  LARGE_CARGO: {
    code: 203,
    baseCost: {
      metal: 6000,
      crystal: 6000,
      deuterium: 0,
      energy: 0,
    },
  },
  LIGHT_FIGHTER: {
    code: 204,
    baseCost: {
      metal: 3000,
      crystal: 1000,
      deuterium: 0,
      energy: 0,
    },
  },
  HEAVY_FIGHTER: {
    code: 205,
    baseCost: {
      metal: 6000,
      crystal: 4000,
      deuterium: 0,
      energy: 0,
    },
  },
  CRUISER: {
    code: 206,
    baseCost: {
      metal: 20000,
      crystal: 7000,
      deuterium: 2000,
      energy: 0,
    },
  },
  BATTLESHIP: {
    code: 207,
    baseCost: {
      metal: 45000,
      crystal: 15000,
      deuterium: 0,
      energy: 0,
    },
  },
  COLONY_SHIP: {
    code: 208,
    baseCost: {
      metal: 10000,
      crystal: 20000,
      deuterium: 10000,
      energy: 0,
    },
  },
  RECYCLER: {
    code: 209,
    baseCost: {
      metal: 10000,
      crystal: 6000,
      deuterium: 2000,
      energy: 0,
    },
  },
  ESPIONAGE_PROBE: {
    code: 210,
    baseCost: {
      metal: 0,
      crystal: 1000,
      deuterium: 0,
      energy: 0,
    },
  },
  BOMBER: {
    code: 211,
    baseCost: {
      metal: 50000,
      crystal: 25000,
      deuterium: 15000,
      energy: 0,
    },
  },
  SOLAR_SATELLITE: {
    code: 212,
    baseCost: {
      metal: 0,
      crystal: 2000,
      deuterium: 500,
      energy: 0,
    },
  },
  DESTROYER: {
    code: 213,
    baseCost: {
      metal: 60000,
      crystal: 50000,
      deuterium: 15000,
      energy: 0,
    },
  },
  DEATHSTAR: {
    code: 214,
    baseCost: {
      metal: 5000000,
      crystal: 4000000,
      deuterium: 1000000,
      energy: 0,
    },
  },
  BATTLECRUISER: {
    code: 215,
    baseCost: {
      metal: 30000,
      crystal: 40000,
      deuterium: 15000,
      energy: 0,
    },
  },
  ROCKET_LAUNCHER: {
    code: 401,
    baseCost: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      energy: 0,
    },
  },
  LIGHT_LASER: {
    code: 402,
    baseCost: {
      metal: 1500,
      crystal: 500,
      deuterium: 0,
      energy: 0,
    },
  },
  HEAVY_LASER: {
    code: 403,
    baseCost: {
      metal: 6000,
      crystal: 2000,
      deuterium: 0,
      energy: 0,
    },
  },
  GAUSS_CANNON: {
    code: 404,
    baseCost: {
      metal: 20000,
      crystal: 15000,
      deuterium: 2000,
      energy: 0,
    },
  },
  ION_CANNON: {
    code: 405,
    baseCost: {
      metal: 2000,
      crystal: 6000,
      deuterium: 0,
      energy: 0,
    },
  },
  PLASMA_TURRET: {
    code: 406,
    baseCost: {
      metal: 50000,
      crystal: 50000,
      deuterium: 30000,
      energy: 0,
    },
  },
  SMALL_SHIELD_DOME: {
    code: 407,
    baseCost: {
      metal: 10000,
      crystal: 10000,
      deuterium: 0,
      energy: 0,
    },
  },
  LARGE_SHIELD_DOME: {
    code: 408,
    baseCost: {
      metal: 50000,
      crystal: 50000,
      deuterium: 0,
      energy: 0,
    },
  },
  ANTI_BALLISTIC_MISSILE: {
    code: 502,
    baseCost: {
      metal: 8000,
      crystal: 0,
      deuterium: 2000,
      energy: 0,
    },
  },
  INTERPLANETARY_MISSILE: {
    code: 503,
    baseCost: {
      metal: 12500,
      crystal: 2500,
      deuterium: 10000,
      energy: 0,
    },
  },
};

export default GAME_ELEMENTS;
