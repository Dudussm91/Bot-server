const Aternode = require('aternode')
const schedule = require('node-schedule')

const aternos = new Aternode()

// Função para iniciar o servidor
async function startServer() {
  await aternos.login({
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASS
  })
  const servers = await aternos.getServers()
  const server = servers.find(s => s.name === 'Dudustr10-elIt')
  if (server) {
    await server.start()
    console.log('🚀 Servidor iniciado!')
  } else {
    console.log('❌ Servidor não encontrado')
  }
}

// Função para parar o servidor
async function stopServer() {
  await aternos.login({
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASS
  })
  const servers = await aternos.getServers()
  const server = servers.find(s => s.name === 'Dudustr10-elIt')
  if (server) {
    await server.stop()
    console.log('⏹️ Servidor parado!')
  } else {
    console.log('❌ Servidor não encontrado')
  }
}

// Agenda: iniciar às 12h, parar às 00h
schedule.scheduleJob('0 12 * * *', startServer) // 12:00
schedule.scheduleJob('0 0 * * *', stopServer)   // 00:00
