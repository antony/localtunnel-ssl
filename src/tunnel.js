'use strict'

const localtunnel = require('localtunnel')

exports.create = function (port) {
  return new Promise((resolve, reject) => {
    localtunnel(port, (e, t) => {
      if (e) {
        return reject(e)
      }
      resolve(t.url)
    })
  })
}