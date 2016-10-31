import request from 'request';
import resourcesPageParser from './parsers/resourcesPageParser';

const baseHeaders = {
  'Upgrade-Insecure-Requests': 1,
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Encoding': 'text/plain',
  'Accept-Language':'es,en-US;q=0.8,en;q=0.6',
   //   'Cache-Control': 'max-age=0',
  'Connection': 'keep-alive'
};

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
    this.lastRequest = 'https://en.ogame.gameforge.com/';
    this.cookies = {};
  }
  
  login() {
    return this._getHomePage().then(()=>{
      return this._doLogin()
        .then((html) => {
          console.log(html); 
          this.isLoggedIn = true; 
        })
        .catch(error => console.error("Error2",error));
    }).catch(error => console.error("Error",error));
  }

  /*
  getView(page, planet) {
    this.lastPlanet = planet || this.lastPlanet;
    const url = `https://s142-${this.server}/game/index.php?page=${page}&cp=${this.lastPlanet}`;
    return makeGetRequest(url)
      .then(this._isLogginScreen)
      .then(PARSERS[page]);
  }*/

  _isLogginScreen = (html) => {
    // if( parseLoginMenu(html) !== null) {
    return html;
    // }
    // this.isLoggedIn = false;
    // throw new Error('LoggedOut')
  }

  _parseAndAddCookies(newCookies) {
    if (!newCookies) {
      return;
    }
    newCookies.forEach((cookieList) => {
      const pairs = cookieList.split(';');
      pairs.forEach((pair) => {
        const parts = pair.split('=');
        this.cookies[parts.shift().trim()] = decodeURI(parts.join('='))
      });
    });
  } 

  _serializeCookies() {
    let list = '';
    Object.keys(this.cookies).forEach((key)=>{
      if (this.cookies[key]) {
        list += ` ${key}=${this.cookies[key]};`;
      } else {
        list += ` ${key};`;
      }
    })
    console.log('Using cookies',list);
    return list.slice(0,-1);
  }

  _doLogin = () => {    
    const url = `https://${this.server}/main/login`;
    const payload = {
      kid: '',
      uni: `s142-${this.server}`,
      login: this.user,
      pass: this.password,
    };
    return new Promise((resolve, reject) => {
      console.log('posting', url);
      request.defaults({
        headers: {
          ...baseHeaders,
         'Content-Type':'application/x-www-form-urlencoded',
          Cookie: this._serializeCookies(),
          Host: 'en.ogame.gameforge.com',
          Origin: this.lastRequest,
        },
      }).post(url)
        .form(payload)
        .on('response', (response) => {
          this.lastRequest = url;
          console.log("STATUS",response.statusCode);
          console.log("HEADERS",response.headers);
          if (response.statusCode !== 303) {
            reject(response.statusCode)
          } 
          this._parseAndAddCookies(response.headers['set-cookie']);
          this._doGetLogin(response.headers.location)
            .then(resolve)
            .catch(reject);
        })
        .on('error', cause => reject(cause));
    });
  }

  _doGetLogin = (url) => {
    return new Promise((resolve, reject) => {
    console.log('getting url',url)
    request.defaults({
        headers: {
          ...baseHeaders,
          Host:'s142-en.ogame.gameforge.com',
          Cookie: this._serializeCookies(),
          Origin: this.lastRequest,
        },
      })(url, (error, response, body) => {
        this.lastRequest = url;
        console.log("Error",error);
        console.log(response.statusCode);
        console.log(response.headers);
        this._parseAndAddCookies(response.headers['set-cookie']);
        resolve(body)
      })
    });
  }

  _getHomePage = () => {
    const url = 'https://en.ogame.gameforge.com/';
    return new Promise((resolve, reject) => {
      request.defaults({
          headers: baseHeaders,
        })(url, (error, response, body) => {
          this.lastRequest = url;
          console.log("Error",error);
          console.log(response.statusCode);
          console.log(response.headers);
          this._parseAndAddCookies(response.headers['set-cookie']);
          resolve(body)
        })
    });
  }
}

export default Browser;
