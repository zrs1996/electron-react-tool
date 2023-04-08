const { createServer } = require('vite')

async function createViteServer(...args) {
  const vite = await createServer(...args)
  return vite
}
module.exports = createViteServer