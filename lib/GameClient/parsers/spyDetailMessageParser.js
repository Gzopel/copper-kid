import cheerio from 'cheerio';
import { parseNumber, parseCoordinates } from './shared';

const parseSpyCoordinates = (html) => {
  const title = html('.msg_title').text();
  return parseCoordinates(title.slice(title.indexOf('[')));
};

const parseResources = html => ({
  metal: parseNumber(html('.metal').next().text()),
  crystal: parseNumber(html('.crystal').next().text()),
  deuterium: parseNumber(html('.deuterium').next().text()),
  energy: parseNumber(html('.energy').next().text()),
});

const hasNoData = list => !!list('.detail_list_fail').length;

const parseList = (html, type, prefix) => {
  const details = cheerio.load(html(`ul[data-type=${type}]`).html());
  if (hasNoData(details)) {
    return null;
  }
  const elements = {};
  const detailList = details('.detail_list_el');
  for (let i = 0; i < detailList.length; i++) {
    const code = detailList[i].children[1].children[1].attribs.class.replace(prefix, '');
    const amount = parseNumber(detailList[i].children[5].children[0].data);
    elements[code] = amount;
  }
  return elements;
}

const parseFleet = html => parseList(html, 'ships', 'tech');

const parseDefense = html => parseList(html, 'defense', 'defense');

const parseBuildings = html => parseList(html, 'buildings', 'building');

const parseTechnologies = html => parseList(html, 'research', 'research');

export const spyDetailMessageParser = (page) => {
  const root = cheerio.load(page);
  return {
    coordinates: parseSpyCoordinates(root), // TODO if is moon
    resources: parseResources(root),
    fleet: parseFleet(root),
    defences: parseDefense(root),
    buildings: parseBuildings(root),
    technologies: parseTechnologies(root),
  };
};

export default spyDetailMessageParser;
