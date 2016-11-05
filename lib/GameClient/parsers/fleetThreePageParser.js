import cheerio from 'cheerio';

export const fleetThreePageParser = (page) => {
  const root = cheerio.load(page);
  const token = root('input[name=token]').attr('value');
  return {
    token: token,
  };
};

export default fleetThreePageParser;
