import cheerio from 'cheerio';

export const parseGameElementLevel = (html, code) => {
  const element = cheerio.load(html(`.supply${code}`).html());
  const level = cheerio.load(element('.level').html());
  level('.textlabel').remove();
  return parseInt(level.text(), 10);
}

const parseMetaElement = (html, name) => html(`meta[name=${name}]`).attr('content');

export const parsePlanetId = html => parseMetaElement(html, 'ogame-planet-id');

export const parsePlanetName = html => parseMetaElement(html, 'ogame-planet-name');

export const parsePlanetCoordinates = (html) => {
  const coordinates = parseMetaElement(html, 'ogame-planet-coordinates').split(':');
  return {
    galaxy: parseInt(coordinates[0], 10),
    system: parseInt(coordinates[1], 10),
    planet: parseInt(coordinates[2], 10),
  };
}

export const parserResources = html => ({
  metal: parseInt(html('#resources_metal').text().replace('.', ''), 10),
  crystal: parseInt(html('#resources_crystal').text().replace('.', ''), 10),
  deuterium: parseInt(html('#resources_deuterium').text().replace('.', ''), 10),
  energy: parseInt(html('#resources_energy').text().replace('.', ''), 10),
})