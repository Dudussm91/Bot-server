const { createClient } = require('bedrock-protocol')

// Configurações do seu servidor Aternos
const client = createClient({
  host: 'Dudustr10-elIt.aternos.me', // IP do servidor
  port: 21553,                       // Porta do servidor
  username: 'BotPula'                // Nome do bot (pode mudar)
})

client.on('join', () => {
  console.log('✅ Bot entrou no servidor e vai começar a pular sem parar!')
})

// Loop de pulo contínuo (sem intervalo)
setInterval(() => {
  client.queue('move_player', {
    runtime_entity_id: client.entityId,
    position: { x: 0, y: 100, z: 0 }, // posição fake (ajuste se quiser)
    pitch: 0,
    yaw: 0,
    head_yaw: 0,
    mode: 0,
    on_ground: false, // false = simulando que está no ar (pulo)
    riding_eid: 0,
    tick: BigInt(Date.now())
  })
}, 50) // 20 vezes por segundo ≈ pulo contínuo
