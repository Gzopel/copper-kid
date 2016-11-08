import cheerio from 'cheerio';
import { parseToken } from './shared';

export const fleetThreePageParser = (page) => {
  const root = cheerio.load(page);
  return {
    token: parseToken(root),
  };
};

export default fleetThreePageParser;
