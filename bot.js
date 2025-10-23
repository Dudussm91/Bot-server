const { createClient } = require('bedrock-protocol')

const client = createClient({
  host: 'Dudustr10-elIt.aternos.me', // IP do servidor
  port: 21553,                       // Porta do servidor
  username: 'BotAFK'
})

client.on('join', () => {
  console.log('✅ Bot entrou no servidor!')
})

client.on('spawn', () => {
  console.log('🚀 Bot spawnado, começando a pular sem parar...')

  setInterval(() => {
    client.queue('move_player', {
      runtime_entity_id: client.entityId,
      position: { x: 0, y: 100, z: 0 },
      pitch: 0,
      yaw: 0,
      head_yaw: 0,
      mode: 0,
      on_ground: false,
      riding_eid: 0,
      tick: BigInt(Date.now())
    })
  }, 50) // 20 vezes por segundo
})
