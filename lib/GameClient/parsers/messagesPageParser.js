import cheerio from 'cheerio';

const parseMessages = (html) => {
  const messageList = html('.msg');
  const messages = [];
  for (let i = 0; i < messageList.length; i++) {
    const id = messageList[i].attribs['data-msg-id'];
    const firstTag = messageList[i].children[5].children[1];// This only works for spy messages
    const details = !(firstTag.name === 'span' && firstTag.children[0].data.indexOf('foreign fleet') > -1); // TODO needs to be localized
    messages.push({ id: id, hasDetails: details });
  }
  return messages;
};
/*
* TODO
*  - Other tabs.
*  - Players msg from, body.
 */

export const messagesPageParser = (page) => {
  const root = cheerio.load(page);
  return parseMessages(root);
};

export default messagesPageParser;
