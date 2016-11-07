export class CookieMonster {
  constructor(cookies = {}) {
    this.cookies = cookies;
  }

  parseAndAddCookies(newCookies) {
    if (!newCookies) {
      return;
    }
    newCookies.forEach((cookieList) => {
      const pairs = cookieList.split(';');
      pairs.forEach((pair) => {
        const parts = pair.split('=');
        this.cookies[parts.shift().trim()] = decodeURI(parts.join('='));
      });
    });
  }

  serializeCookies() {
    let list = '';
    Object.keys(this.cookies).forEach((key) => {
      if (this.cookies[key]) {
        list += ` ${key}=${this.cookies[key]};`;
      } else {
        list += ` ${key};`;
      }
    })
    return list.slice(0, -1);
  }
}

export default CookieMonster;
