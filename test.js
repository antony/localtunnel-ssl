'use strict'

const http = require('http')
const lt = require('.')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, async err => {
  if (err) {
    return console.log('something bad happened', err)
  }

  lt.open(port, 8443)
  .then(({ url }) => {
    console.log(`server is listening at ${url}`)
  })
})