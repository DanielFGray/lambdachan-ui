const path = require('path')

const appTitle = 'LambdaChan'
const appBase = ''
const mount = 'root'
const publicDir = path.resolve('./public')
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'
const nodeEnv = process.env.NODE_ENV || 'development'
const devMode = nodeEnv.startsWith('dev')

module.exports = {
  appTitle,
  appBase,
  mount,
  publicDir,
  port,
  host,
  nodeEnv,
  devMode,
}
