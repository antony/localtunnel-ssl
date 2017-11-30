'use strict'

const fs = require('fs')
const proxy = require('http-proxy')
const { join } = require('path')

const utf8 = 'utf8'
const resourcesDir = join(__dirname, '..', 'resources')
const keyPath = join(resourcesDir, 'localhost.key')
const certPath = join(resourcesDir, 'localhost.cert')

exports.proxy = function (internal, external, key = keyPath, cert = certPath) {
  return new Promise((resolve, reject) => {
    proxy.createServer({
      xfwd: true,
      ws: true,
      target: {
        host: 'localhost',
        port: internal
      },
      ssl: {
        key: fs.readFileSync(key, utf8),
        cert: fs.readFileSync(cert, utf8)
      }
    })
    .on('open', () => {
      console.log('opened')
      resolve({})
    })
    .on('error', () => {
      console.log('error')
      reject(e)
    })
    .listen(external)
  })
}