'use strict'
const http = require('http')
const msgpack = require('msgpack-lite')

http.createServer(async (req, res) => {
  res.statusCode = 200
  if (await streamLen(req) > 0) {
    res.write(JSON.stringify({ rate_by_service: { 'service:,env:': 1 } }))
  }
  res.end()
}).listen(8126, 'localhost', () => {
  if (process.send) { process.send({ ready: true }) }
})

async function streamLen (strm) {
  try {
    let len = 0
//    const bufs = []
    for await (const buf of strm) {
      len += buf.length
//      bufs.push(buf)
    }

//    console.log(msgpack.decode(Buffer.concat(bufs)))
    return len
  } catch (e) {
    return 0
  }
}
