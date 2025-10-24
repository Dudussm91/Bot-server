const { Client } = require('bedrock-protocol');

const client = new Client({
  host: 'Dudustr10-elIt.aternos.me',
  port: 21553,
  username: 'BotAFK',
  offline: true
});

client.on('join', () => {
  console.log('Bot entrou no servidor Bedrock!');
});
