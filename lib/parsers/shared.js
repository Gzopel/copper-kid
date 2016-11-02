import cheerio from 'cheerio';

export const parseGameElementLevel = (html, type, code) => {
  const element = cheerio.load(html(`.${type}${code}`).html());
  const level = cheerio.load(element('.level').html());
  level('.textlabel').remove();
  return parseInt(level.text(), 10);
}

const parseMetaElement = (html, name) => html(`meta[name=${name}]`).attr('content');

export const parsePlanetId = html => parseMetaElement(html, 'ogame-planet-id');

export const parsePlanetName = html => parseMetaElement(html, 'ogame-planet-name');

export const parseTimestamp = html => new Date(parseInt(parseMetaElement(html, 'ogame-timestamp'), 10));

export const parsePlanetType = html => parseMetaElement(html, 'ogame-planet-type');

export const parseCoordinates = (coordinates) => {
  const split = coordinates.replace('[', '').replace(']', '').split(':');
  return {
    galaxy: parseInt(split[0], 10),
    system: parseInt(split[1], 10),
    planet: parseInt(split[2], 10),
  };
}

export const parsePlanetCoordinates = html => parseCoordinates(parseMetaElement(html, 'ogame-planet-coordinates'));

export const parserResources = html => ({
  metal: parseInt(html('#resources_metal').text().replace('.', ''), 10),
  crystal: parseInt(html('#resources_crystal').text().replace('.', ''), 10),
  deuterium: parseInt(html('#resources_deuterium').text().replace('.', ''), 10),
  energy: parseInt(html('#resources_energy').text().replace('.', ''), 10),
})


const parseCountdown = (html, countdownId) => {
  const countdown = html(countdownId).text();
  if (!countdown) {
    return 0;
  }
  const split = countdown.split(' ');
  let seconds = 0;
  split.forEach((t) => {
    if (t.indexOf('h') > 0) {
      seconds += parseInt(t.replace('h', ''), 10) * 60 * 60;
    } else if (t.indexOf('m') > 0) {
      seconds += parseInt(t.replace('m', ''), 10) * 60;
    } else if (t.indexOf('s') > 0) {
      seconds += parseInt(t.replace('s', ''), 10);
    } else {
      console.log('Unexpected token ', t);
    }
  });
  return seconds;
};

export const parseBuildingCountdown = html => parseCountdown(html, '#Countdown');

export const parseResearchCountdown = html => parseCountdown(html, '#researchCountdown');

export const parseShipyardCountdown = html => parseCountdown(html, '.shipAllCountdown');

export const parseEnemyAttacks = htmls => ([]);
