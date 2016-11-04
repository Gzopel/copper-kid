import request from 'request';
import { CookieMonster } from './CookieMoster';

const baseHeaders = {
  'Upgrade-Insecure-Requests': 1,
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Encoding': 'text/plain',
  'Accept-Language': 'es,en-US;q=0.8,en;q=0.6',
  'Connection': 'keep-alive',
};

export class Browser {
  constructor() {
    this.lastRequest = 'https://en.ogame.gameforge.com/';
    this.cookieMonster = new CookieMonster();
  }

  getHomePage = (server) => {
    const url = `https://${server}/`;
    return new Promise((resolve, reject) => {
      request.defaults({
        headers: baseHeaders,
      })(url, (error, response, body) => {
        this.lastRequest = url;
        if (error) {
          reject(error);
        }
        console.log('Error', error);
        console.log(response.statusCode);
        console.log(response.headers);
        this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
        resolve(body);
      });
    });
  }

  login = (account) => {
    const url = `https://${account.server}/main/login`;
    const payload = {
      kid: '',
      uni: account.universeServer,
      login: account.user,
      pass: account.password,
    };
    return new Promise((resolve, reject) => {
      console.log('posting', url);
      request.defaults({
        headers: {
          ...baseHeaders,
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: this.cookieMonster.serializeCookies(),
          Host: account.server,
          Origin: this.lastRequest,
        },
      }).post(url)
        .form(payload)
        .on('response', (response) => {
          this.lastRequest = url;
          this.server = account.universeServer;
          console.log('STATUS', response.statusCode);
          console.log('HEADERS', response.headers);
          if (response.statusCode !== 303) {
            reject(response.statusCode);
          }
          this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
          this._doGetLogin(response.headers.location)
            .then(resolve)
            .catch(reject);
        })
        .on('error', cause => reject(cause));
    });
  }

  //getView(page, planet) {
  //  const url = `https://${this.server}/game/index.php?page=${page}&cp=${planet}`;
  //  return new Promise((resolve, reject) => {
  //    console.log('getting url', url)
  //    request.defaults({
  //      headers: {
  //        ...baseHeaders,
  //        Host: this.server,
  //        Cookie: this.cookieMonster.serializeCookies(),
  //        Origin: this.lastRequest,
  //      },
  //    })(url, (error, response) => {
  //      this.lastRequest = url;
  //      console.log('Error', error);
  //      console.log(response.statusCode);
  //      this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
  //    });
  //  }).then(PARSERS[page]);
  //}
  //
  //invest = (page, code) => {
  //  const url = `https://${this.server}/game/index.php?page=${page}&modus=1&type=${code}&menge=1`;
  //  return new Promise((resolve, reject) => {
  //    console.log('getting url', url)
  //    request.defaults({
  //      headers: {
  //        ...baseHeaders,
  //        Host: this.server,
  //        Cookie: this.cookieMonster.serializeCookies(),
  //        Origin: this.lastRequest,
  //      },
  //    })(url, (error, response) => {
  //      console.log('Error', error);
  //      console.log(response.statusCode);
  //      this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
  //      resolve();
  //    });
  //  });
  //}

  _doGetLogin = (url) => {
    return new Promise((resolve, reject) => {
      console.log('getting url', url)
      request.defaults({
        followRedirect: false,
        followAllRedirects: false,
        headers: {
          ...baseHeaders,
          Host: this.server,
          Cookie: this.cookieMonster.serializeCookies(),
          Origin: this.lastRequest,
        },
      })(url, (error, response) => {
        this.lastRequest = url;
        console.log('Error', error);
        if (error) {
          reject(error);
        }
        console.log(response.statusCode);
        console.log(response.headers);
        this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
        this._doGetReLogin(response.headers.location)
          .then(resolve)
          .catch(reject);
      });
    });
  }

  _doGetReLogin = (url) => {
    return new Promise((resolve, reject) => {
      console.log('getting url', url)
      request.defaults({
        headers: {
          ...baseHeaders,
          Host: this.server,
          Cookie: this.cookieMonster.serializeCookies(),
          Origin: this.lastRequest,
        },
      })(url, (error, response, body) => {
        this.lastRequest = url;
        console.log('Error', error);
        if (error) {
          reject(error);
        }
        console.log(response.statusCode);
        console.log(response.headers);
        this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
        resolve(body);
      });
    });
  }
}

export default Browser;
