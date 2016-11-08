import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { CODES } from '../lib/GameElements';
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
    assert.equal(parseResult.fleet[CODES.SMALL_CARGO], 6);
    assert.equal(parseResult.fleet[CODES.LIGHT_FIGHTER], 10);
    assert.equal(parseResult.fleet[CODES.HEAVY_FIGHTER], 8);
    assert.equal(parseResult.fleet[CODES.ESPIONAGE_PROBE], 1);
    assert.equal(parseResult.fleet[CODES.SOLAR_SATELLITE], 12);
    assert.equal(parseResult.defences[CODES.ROCKET_LAUNCHER], 4);
    assert.equal(parseResult.defences[CODES.LIGHT_LASER], 3);
    assert.equal(parseResult.buildings[CODES.METAL_MINE], 12);
    assert.equal(parseResult.buildings[CODES.CRYSTAL_MINE], 13);
    assert.equal(parseResult.buildings[CODES.DEUTERIUM_SYNTHESIZER], 12);
    assert.equal(parseResult.buildings[CODES.SOLAR_PLANT], 14);
    assert.equal(parseResult.buildings[CODES.FUSION_REACTOR], 4);
    assert.equal(parseResult.buildings[CODES.ROBOTICS_FACTORY], 5);
    assert.equal(parseResult.buildings[CODES.SHIPYARD], 4);
    assert.equal(parseResult.buildings[CODES.METAL_STORAGE], 4);
    assert.equal(parseResult.buildings[CODES.CRYSTAL_STORAGE], 2);
    assert.equal(parseResult.buildings[CODES.DEUTERIUM_TANK], 2);
    assert.equal(parseResult.buildings[CODES.RESEARCH_LAB], 5);
    assert.equal(parseResult.buildings[CODES.SPACE_DOCK], 3);
    assert.equal(parseResult.buildings[CODES.MISSILE_SILO], 1);
    assert(!parseResult.technologies);
    done();
  });

  it('Should parse the complete message', (done) => {
    const parseResult = spyDetailMessageParser(messageFullPage);
    assert.equal(parseResult.coordinates.galaxy, 2);
    assert.equal(parseResult.coordinates.system, 21);
    assert.equal(parseResult.coordinates.planet, 8);
    assert.equal(parseResult.resources.metal, 50136);
    assert.equal(parseResult.resources.crystal, 9967);
    assert.equal(parseResult.resources.deuterium, 4944);
    assert.equal(parseResult.resources.energy, 1505);
    assert.equal(parseResult.fleet[CODES.CRUISER], 6);
    assert.equal(parseResult.defences[CODES.ROCKET_LAUNCHER], 47);
    assert.equal(parseResult.buildings[CODES.METAL_MINE], 15);
    assert.equal(parseResult.buildings[CODES.CRYSTAL_MINE], 12);
    assert.equal(parseResult.buildings[CODES.DEUTERIUM_SYNTHESIZER], 11);
    assert.equal(parseResult.buildings[CODES.SOLAR_PLANT], 15);
    assert.equal(parseResult.buildings[CODES.FUSION_REACTOR], 5);
    assert.equal(parseResult.buildings[CODES.ROBOTICS_FACTORY], 4);
    assert.equal(parseResult.buildings[CODES.SHIPYARD], 6);
    assert.equal(parseResult.buildings[CODES.METAL_STORAGE], 6);
    assert.equal(parseResult.buildings[CODES.CRYSTAL_STORAGE], 4);
    assert.equal(parseResult.buildings[CODES.DEUTERIUM_TANK], 3);
    assert.equal(parseResult.buildings[CODES.RESEARCH_LAB], 6);
    assert.equal(parseResult.buildings[CODES.SPACE_DOCK], 2);
    assert.equal(parseResult.technologies[CODES.ESPIONAGE_TECHNOLOGY], 4);
    assert.equal(parseResult.technologies[CODES.COMPUTER_TECHNOLOGY], 2);
    assert.equal(parseResult.technologies[CODES.WEAPONS_TECHNOLOGY], 1);
    assert.equal(parseResult.technologies[CODES.ARMOUR_TECHNOLOGY], 6);
    assert.equal(parseResult.technologies[CODES.ENERGY_TECHNOLOGY], 6);
    assert.equal(parseResult.technologies[CODES.COMBUSTION_DRIVE], 4);
    assert.equal(parseResult.technologies[CODES.IMPULSE_DRIVE], 4);
    assert.equal(parseResult.technologies[CODES.LASER_TECHNOLOGY], 7);
    assert.equal(parseResult.technologies[CODES.ION_TECHNOLOGY], 2);
    assert.equal(parseResult.technologies[CODES.ASTROPHYSICS], 1);
    done();
  });

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
