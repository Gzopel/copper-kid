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
          ...this._getPostHeaders(),
          Host: account.server,
        },
      }).post(url)
        .form(payload)
        .on('response', (response) => {
          this.lastRequest = url;
          this.server = account.universeServer;
          if (response.statusCode !== 303 || !response.headers.location) {
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

  getView(planet, page) {
    const url = `https://${this.server}/game/index.php?page=${page}&cp=${planet}`;
    return new Promise((resolve, reject) => {
      console.log('getting url', url)
      request.defaults({
        headers: this._getGetHeaders(),
      })(url, (error, response, body) => {
        this.lastRequest = url;
        if (error) {
          console.log('Error', error);
          reject(error);
        }
        console.log(response.statusCode);
        this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
        resolve(body);
      });
    });
  }

  getGalaxyView(galaxy, system) {
    const url = `https://${this.server}/game/index.php?page=galaxyContent&ajax=1`;
    const payload = {
      galaxy: galaxy,
      system: system,
    };
    return new Promise((resolve, reject) => {
      console.log('posting', url);
      request.defaults({
        headers: this._getPostHeaders(),
      }).post(url)
        .form(payload)
        .on('response', (response) => {
          this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
          let data = '';
          response.on('data', chunk => data += chunk.toString('utf8'));
          response.on('end', () => resolve(JSON.parse(data)));
        })
        .on('error', cause => reject(cause));
    });
  }

  postFleetSelect(fromCoordinates, fleetToSend) {
    const url = `https://${this.server}/game/index.php?page=fleet2`;
    const payload = {
      galaxy: fromCoordinates.galaxy,
      system: fromCoordinates.system,
      position: fromCoordinates.planet,
      type: 1,
      mission: 0,
      speed: 10,
    };
    Object.keys(fleetToSend).forEach((type) => {
      payload[`am${type}`] = fleetToSend[type] || '';
    });
    return new Promise((resolve, reject) => {
      console.log('posting', url, payload);
      request.defaults({
        headers: this._getPostHeaders(),
      }).post(url)
        .form(payload)
        .on('response', (response) => {
          this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
          let data = '';
          response.on('data', chunk => data += chunk.toString('utf8'));
          response.on('end', () => resolve(data));
        })
        .on('error', cause => reject(cause));
    });
  }

  postTargetAndSpeedSelect(toCoordinates, fleetToSend) {
    const url = `https://${this.server}/game/index.php?page=fleet3`;
    const payload = {
      galaxy: toCoordinates.galaxy,
      system: toCoordinates.system,
      position: toCoordinates.planet,
      type: 1,
      union: 0,
      acsValues: '-',
      mission: 0,
      speed: 10,
    };
    Object.keys(fleetToSend).forEach((type) => {
      if (fleetToSend[type]) {
        payload[`am${type}`] = fleetToSend[type];
      }
    });
    return new Promise((resolve, reject) => {
      console.log('posting', url, payload);
      request.defaults({
        headers: this._getPostHeaders(),
      }).post(url)
        .form(payload)
        .on('response', (response) => {
          this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
          let data = '';
          response.on('data', chunk => data += chunk.toString('utf8'));
          response.on('end', () => resolve(data));
        })
        .on('error', cause => reject(cause));
    });
  }


  sendFleet(toCoordinates, fleetToSend, mission, token) {
    // TODO load resources 
    const url = `https://${this.server}/game/index.php?page=movement`;
    const payload = {
      galaxy: toCoordinates.galaxy,
      system: toCoordinates.system,
      position: toCoordinates.planet,
      holdingtime: 1,
      expeditiontime: 1,
      token: token,
      type: 1,
      mission: mission,
      union2: 0,
      holdingOrExpTime: 0,
      speed: 10,
      acsValues: '-',
      prioMetal: 1,
      prioCrystal: 2,
      prioDeuterium: 3,
      metal: 0,
      crystal: 0,
      deuterium: 0,
    };
    Object.keys(fleetToSend).forEach((type) => {
      if (fleetToSend[type]) {
        payload[`am${type}`] = fleetToSend[type];
      }
    });
    return new Promise((resolve, reject) => {
      console.log('posting', url, payload);
      request.defaults({
        headers: this._getPostHeaders(),
      }).post(url)
        .form(payload)
        .on('response', (response) => {
          this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
          resolve();
        })
        .on('error', cause => reject(cause));
    });
  }

  getMessages(tab = 20) {
    const url = `https://${this.server}/game/index.php?page=messages&tab=${tab}&ajax=1`;
    return new Promise((resolve, reject) => {
      console.log('getting url', url)
      request.defaults({
        headers: this._getGetHeaders(),
      })(url, (error, response, body) => {
        this.lastRequest = url;
        if (error) {
          console.log('Error', error);
          reject(error);
        }
        console.log(response.statusCode);
        this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
        resolve(body);
      });
    });
  }

  getMessageDetail(id, tabId) {
    // what is tabid ???
    const url = `https://${this.server}/game/index.php?page=messages&messageId=${id}&tabid=${tabId}&ajax=1`
    return new Promise((resolve) => {
      request.defaults({
          headers: this._getGetHeaders(),
        })(url, (error, response, body) => {
          this.lastRequest = url;
          console.log('Error', error);
          if (error) {
            reject(error);
          }
          this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
          resolve(body);
        });
      });
  }

  deleteMessage(id) {
    const url = `https://${this.server}/game/index.php?page=messages`;
    const payload = {
      messageId: id,
      action: 103,
      ajax: 1,
    }
    return new Promise((resolve, reject) => {
      console.log('posting', url, payload);
      request.defaults({
        headers: this._getPostHeaders(),
      }).post(url)
        .form(payload)
        .on('response', (response) => {
          this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
          resolve();
        })
        .on('error', cause => reject(cause));
    });
  }

  //
  //invest = (page, code) => {
  //  const url = `https://${this.server}/game/index.php?page=${page}&modus=1&type=${code}&menge=1`;
  //  return new Promise((resolve, reject) => {
  //    console.log('getting url', url)
  //    request.defaults({
  //      headers: this._getGetHeaders(),
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
        headers: this._getGetHeaders(),
      })(url, (error, response) => {
        this.lastRequest = url;
        console.log('Error', error);
        if (error) {
          console.error('rejecting _doGetLogin',response)
          reject(error);
        }
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
        headers: this._getGetHeaders(),
      })(url, (error, response, body) => {
        this.lastRequest = url;
        console.log('Error', error);
        if (error) {
          console.error('rejecting _doGetReLogin',response)
          reject(error);
        }
        this.cookieMonster.parseAndAddCookies(response.headers['set-cookie']);
        resolve(body);
      });
    });
  }

  _getGetHeaders() {
    return {
      ...baseHeaders,
      Cookie: this.cookieMonster.serializeCookies(),
      Host: this.server,
      Origin: this.lastRequest,
    }
  }

  _getPostHeaders() {
    return {
      ...this._getGetHeaders(),
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
}

export default Browser;
