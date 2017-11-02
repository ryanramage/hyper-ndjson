const async = require('async')
const ndjson = require('ndjson')
const through2 = require('through2')
const devnull = require('dev-null')
const EOL = require('os').EOL
const stringify = require('json-stringify-safe')

module.exports = function (config, instream, outstream, worker, done) {
  let streamEnded = false
  let q = null
  let out = (obj) => {
    outstream.write(stringify(obj) + EOL)
    if (done && streamEnded && q && q.length() === 0) process.nextTick(done)
  }
  let _worker = worker.bind(null, config, out)
  q = async.queue(_worker, config.concurrency || 5)
  instream.pipe(ndjson.parse())
    .pipe(through2.obj(function (obj, enc, cb) {
      q.push(obj)
      cb()
    }))
    .pipe(devnull())
    .on('end', () => { streamEnded = true })
  return q
}
