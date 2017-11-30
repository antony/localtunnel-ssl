'use strict'

const ssl = require('./src/ssl')
const tunnel = require('./src/tunnel')

exports.open = function (internal, external) {
  return ssl
  .proxy(internal, external)
  .then(() => {
    console.log('ssl')
    return tunnel.create(external)
  })
  .then(url => {
    console.log('tun')
    return { url, internal, external }
  })
}
