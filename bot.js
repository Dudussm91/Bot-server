const { createClient } = require('bedrock-protocol')

const client = createClient({
  host: 'Dudustr10-elIt.aternos.me', // seu IP Aternos
  port: 21553,                       // sua porta
  username: 'BotAFK'                 // nome do bot
})

client.on('join', () => {
  console.log('Bot entrou no servidor! Mantendo online...')
})

// Mantém o bot "vivo" enviando pacotes de movimento
setInterval(() => {
  client.queue('move_player', {
    runtime_entity_id: client.entityId,
    position: { x: 0, y: 100, z: 0 }, // posição fake
    pitch: 0,
    yaw: 0,
    head_yaw: 0,
    mode: 0,
    on_ground: true,
    riding_eid: 0,
    tick: BigInt(Date.now())
  })
}, 30000) // a cada 30s