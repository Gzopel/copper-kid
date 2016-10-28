import request from 'request';
import resourcesPageParser from './parsers/resourcesPageParser';

const baseRequest = request.defaults({
  headers: {
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
    Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'text/plain',
    'Accept-Language':'es,en-US;q=0.8,en;q=0.6',
    'Cache-Control': 'max-age=0',
    Connection: 'keep-alive',
    'Content-Type':'application/x-www-form-urlencoded',
    //Cookie: cookie,
    // Host: 'en.ogame.gameforge.com',
    // Origin: lastRequest,
  },
});

const makeGetRequest = (url) => {
  return new Promise((resolve, reject) => {
    baseRequest
      .get(url)
      .on('response', (response) => {
        console.log(response.statusCode);
        console.log(response.headers);
        let data = '';
        response.on('data', chunk => data += chunk.toString('utf8'));
        response.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

const makePostRequest = (url, payload) => {
  return new Promise((resolve, reject) => {
    baseRequest
      .post(url)
      .form(payload)
      .on('response', (response) => {
        if (response.statusCode === 303) {
          console.log(response.headers['set-cookie'][0]);
          console.log('redirection to',response.headers.location)
          return makeGetRequest(response.headers.location, response.headers['set-cookie'][0]).then(resolve).catch(reject);
        }
        // let data = '';
        // response.on('data', chunk => data += chunk.toString('utf8'));
        // response.on('end', () => resolve(data));
      })
      .on('error', cause => reject(cause));
  });
}

export const PAGES = {
  OVERVIEW: 'overview',
  RESOURCES: 'resources',
  RESEARCH: 'research',
  STATION: 'station',
  SHIPYARD: 'shipyard',
  DEFENSE: 'defense',
  FLEET: 'fleet1',
  GALAXY: 'galaxy',
};

const PARSERS = {
  [PAGES.RESOURCES]: resourcesPageParser,
}

export class Browser {
  constructor(config) {
    this.user = config.user;
    this.password = config.password;
    this.universe = config.universe;
    this.server = config.server;
    this.isLoggedIn = false;
    this.lastPlanet = null;
  }
  
  login() {
    const url = `https://${this.server}/main/login`;
    const payload = {
      kid: '',
      uni: `s142-${this.server}`,
      login: this.user,
      pass: this.password,
    };
    return makePostRequest(url, payload).then(() => { this.isLoggedIn = true; }).catch(error => console.error("Error",error));
  }

  isLogginScreen = (html) => {
    // if( parseLoginMenu(html) !== null) {
    return html;
    // }
    // this.isLoggedIn = false;
    // throw new Error('LoggedOut')
  };
  
  getView(page, planet) {
    this.lastPlanet = planet || this.lastPlanet;
    const url = `https://s142-${this.server}/game/index.php?page=${page}&cp=${this.lastPlanet}`;
    return makeGetRequest(url)
      .then(this.isLogginScreen)
     // .then(PARSERS[page]);
  }
}

export default Browser;
