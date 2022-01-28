const { createServer } = require('http');

createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Iae mundo!')
  res.end();
}).listen(process.env.PORT || 3000);

try {
  const EdnaldoClient = require('./Structures/Client.js')
  const client = new EdnaldoClient()
  client.loadEvents()
  client.login(process.env["token"])
} catch(e) { console.error(e) }