const app = require('express')();

app.get('/', (req, res) => res.send('hello'));
app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  send(res);
});

let i = 0;
function send(res) {
  res.write('data: ' + `hello from ${serverName} ---- [${i++}]\n\n`);

  setTimeout(() => send(res), 1000);
}

app.listen(8000);

console.log('Listening port 8000');
