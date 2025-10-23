const puppeteer = require('puppeteer')
const { createClient } = require('bedrock-protocol')

// ⚠️ Credenciais do Aternos (NÃO use em repositório público!)
const USER = 'Dudustr10'
const PASS = 'Dudu@helo'
const SERVER_URL = 'https://aternos.org/server/' // link do painel do seu servidor

let client = null

// Função para logar no Aternos e clicar Start
async function startServer() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()

  await page.goto('https://aternos.org/go/')
  await page.type('#user', USER)
  await page.type('#password', PASS)
  await page.click('#login')

  await page.waitForNavigation()
  await page.goto(SERVER_URL)

  await page.waitForSelector('.server-start')
  await page.click('.server-start')

  console.log('🚀 Servidor Aternos iniciado!')

  await browser.close()

  // Espera 2 minutos para o servidor ligar e conecta o bot
  setTimeout(startBot, 120_000)
}

// Bot AFK
function startBot() {
  client = createClient({
    host: 'Dudustr10-elIt.aternos.me', // IP do servidor
    port: 21553,                       // Porta do servidor
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
    }, 50)
  })

  client.on('disconnect', () => {
    console.log('⚠️ Bot desconectado, tentando reconectar...')
    setTimeout(startBot, 5000)
  })
}

// 🚀 Executa automaticamente quando o Render iniciar
startServer()
