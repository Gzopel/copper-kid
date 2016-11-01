import cheerio from 'cheerio';

export const loginPageParser = (page) => {
  const root = cheerio.load(page);
  const serverLogin = cheerio.load(root('#serverLogin').html());
  const options = serverLogin('option');
  const universes = {};
  for(let i = 0; i < options.length; i++) {
    const option = options[i];
    const universeName = option.children[0].data.trim();
    const server = option.attribs.value;
    universes[universeName] = server;
  }
  return {
    universes: universes,
  };
};

export default loginPageParser;
