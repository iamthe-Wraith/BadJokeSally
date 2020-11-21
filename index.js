const { default: Axios } = require('axios');
const discord = require('discord.io');
const logger = require('winston');
const axios = require('axios');
const auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

const bot = new discord.Client({
  token: auth.token,
  autorun: true
});

bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ' + bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
  if (message.toLowerCase().indexOf('sally') > -1) {
    axios({
      method: 'GET',
      headers: { Accept: 'text/plain' },
      url: 'https://icanhazdadjoke.com/'
    })
      .then(result => {
        bot.sendMessage({
          to: channelID,
          message: result.data
        });
      })
      .catch(error => {
        logger.info('Api Error: ' + error.message);
      });
  }
});
