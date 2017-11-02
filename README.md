# hyper-ndjson

Handle ndjson streams using queues for concurrent processing

## usage

```
const ndjson = require('hyper-ndjson')
const config = {
  concurrency: 25
}
ndjson(config, process.stdin, process.stdout, worker, function () {
  console.log('done!')
})

function worker (config, output, obj, cb) {
  longThing(obj.fromInstreamProp, (err, someJson) => {
    if (err) out
    output(someJson)
    cb()
  })
}

```

## License

MIT
