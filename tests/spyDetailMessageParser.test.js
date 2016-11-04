import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { GAME_ELEMENTS } from '../lib/GameElements';
import { spyDetailMessageParser } from '../lib/GameClient/parsers/spyDetailMessageParser';

const messagePage =  fs.readFileSync(path.resolve('testPages', 'spyMessageDetail.html'), { encoding: 'utf8' });
const messageFullPage =  fs.readFileSync(path.resolve('testPages', 'spyMessageFullDetail.html'), { encoding: 'utf8' });
const messageEmptyPage =  fs.readFileSync(path.resolve('testPages', 'spyMessageEmptyDetail.html'), { encoding: 'utf8' });

describe(__filename, () => {
  it('Should parse the test page', (done) => {
    const parseResult = spyDetailMessageParser(messagePage);
    assert.equal(parseResult.coordinates.galaxy, 2);
    assert.equal(parseResult.coordinates.system, 56);
    assert.equal(parseResult.coordinates.planet, 6);
    assert.equal(parseResult.resources.metal, 48977);
    assert.equal(parseResult.resources.crystal, 37323);
    assert.equal(parseResult.resources.deuterium, 13697);
    assert.equal(parseResult.resources.energy, 1658);
    assert.equal(parseResult.fleet[GAME_ELEMENTS.SMALL_CARGO.code], 6);
    assert.equal(parseResult.fleet[GAME_ELEMENTS.LIGHT_FIGHTER.code], 10);
    assert.equal(parseResult.fleet[GAME_ELEMENTS.HEAVY_FIGHTER.code], 8);
    assert.equal(parseResult.fleet[GAME_ELEMENTS.ESPIONAGE_PROBE.code], 1);
    assert.equal(parseResult.fleet[GAME_ELEMENTS.SOLAR_SATELLITE.code], 12);
    assert.equal(parseResult.defences[GAME_ELEMENTS.ROCKET_LAUNCHER.code], 4);
    assert.equal(parseResult.defences[GAME_ELEMENTS.LIGHT_LASER.code], 3);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.METAL_MINE.code], 12);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.CRYSTAL_MINE.code], 13);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.DEUTERIUM_SYNTHESIZER.code], 12);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.SOLAR_PLANT.code], 14);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.FUSION_REACTOR.code], 4);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.ROBOTICS_FACTORY.code], 5);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.SHIPYARD.code], 4);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.METAL_STORAGE.code], 4);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.CRYSTAL_STORAGE.code], 2);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.DEUTERIUM_TANK.code], 2);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.RESEARCH_LAB.code], 5);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.SPACE_DOCK.code], 3);
    assert.equal(parseResult.buildings[GAME_ELEMENTS.MISSILE_SILO.code], 1);
    assert(!parseResult.technologies);
    done();
  });

  describe(__filename, () => {
    it('Should parse the complete message', (done) => {
      const parseResult = spyDetailMessageParser(messageFullPage);
      assert.equal(parseResult.coordinates.galaxy, 2);
      assert.equal(parseResult.coordinates.system, 21);
      assert.equal(parseResult.coordinates.planet, 8);
      assert.equal(parseResult.resources.metal, 50136);
      assert.equal(parseResult.resources.crystal, 9967);
      assert.equal(parseResult.resources.deuterium, 4944);
      assert.equal(parseResult.resources.energy, 1505);
      assert.equal(parseResult.fleet[GAME_ELEMENTS.CRUISER.code], 6);
      assert.equal(parseResult.defences[GAME_ELEMENTS.ROCKET_LAUNCHER.code], 47);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.METAL_MINE.code], 15);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.CRYSTAL_MINE.code], 12);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.DEUTERIUM_SYNTHESIZER.code], 11);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.SOLAR_PLANT.code], 15);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.FUSION_REACTOR.code], 5);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.ROBOTICS_FACTORY.code], 4);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.SHIPYARD.code], 6);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.METAL_STORAGE.code], 6);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.CRYSTAL_STORAGE.code], 4);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.DEUTERIUM_TANK.code], 3);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.RESEARCH_LAB.code], 6);
      assert.equal(parseResult.buildings[GAME_ELEMENTS.SPACE_DOCK.code], 2);
      assert.equal(parseResult.technologies[GAME_ELEMENTS.ESPIONAGE_TECHNOLOGY.code], 4);
      assert.equal(parseResult.technologies[GAME_ELEMENTS.COMPUTER_TECHNOLOGY.code], 2);
      assert.equal(parseResult.technologies[GAME_ELEMENTS.WEAPONS_TECHNOLOGY.code], 1);
      assert.equal(parseResult.technologies[GAME_ELEMENTS.ARMOUR_TECHNOLOGY.code], 6);
      assert.equal(parseResult.technologies[GAME_ELEMENTS.ENERGY_TECHNOLOGY.code], 6);
      assert.equal(parseResult.technologies[GAME_ELEMENTS.COMBUSTION_DRIVE.code], 4);
      assert.equal(parseResult.technologies[GAME_ELEMENTS.IMPULSE_DRIVE.code], 4);
      assert.equal(parseResult.technologies[GAME_ELEMENTS.LASER_TECHNOLOGY.code], 7);
      assert.equal(parseResult.technologies[GAME_ELEMENTS.ION_TECHNOLOGY.code], 2);
      assert.equal(parseResult.technologies[GAME_ELEMENTS.ASTROPHYSICS.code], 1);
      done();
    });
  });
  describe(__filename, () => {
    it('Should parse the empty message', (done) => {
      const parseResult = spyDetailMessageParser(messageEmptyPage);
      assert.equal(parseResult.coordinates.galaxy, 2);
      assert.equal(parseResult.coordinates.system, 38);
      assert.equal(parseResult.coordinates.planet, 4);
      assert.equal(parseResult.resources.metal, 5151);
      assert.equal(parseResult.resources.crystal, 5075);
      assert.equal(parseResult.resources.deuterium, 0);
      assert.equal(parseResult.resources.energy, 0);
      assert(parseResult.fleet);
      assert(parseResult.defences);
      assert(parseResult.buildings);
      assert(parseResult.technologies);
      done();
    });
  });
});
