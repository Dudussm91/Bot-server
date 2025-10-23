const Aternode = require('aternode')
const { createClient } = require('bedrock-protocol')

const aternos = new Aternode()

// Credenciais do Aternos (⚠️ cuidado se for repositório público!)
const USER = 'Dudustr10'
const PASS = 'Dudu@helo'
const SERVER_NAME = 'Dudustr10-elIt'

let client = null

// Função para rodar o bot AFK
function startBot() {
  client = createClient({
    host: 'Dudustr10-elIt.aternos.me',
    port: 21553,
    username: 'BotAFK'
  })

  client.on('join', () => {
    console.log('✅ Bot entrou no servidor!')
  })

  client.on('spawn', () => {
    console.log('🤖 Bot spawnado, começando a enviar pacotes...')
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

  client.on('disconnect', () => {
    console.log('⚠️ Bot desconectado, tentando reconectar...')
    setTimeout(startBot, 5000)
  })
}

// Função para iniciar o servidor e depois rodar o bot
async function startServer() {
  await aternos.login({ user: USER, password: PASS })
  const servers = await aternos.getServers()
  const server = servers.find(s => s.name === SERVER_NAME)
  if (server) {
    await server.start()
    console.log('🚀 Servidor Aternos iniciado!')
    setTimeout(startBot, 60_000) // espera 1 min e inicia o bot
  } else {
    console.log('❌ Servidor não encontrado')
  }
}

// 🚀 Executa automaticamente quando o Render iniciar
startServer()
