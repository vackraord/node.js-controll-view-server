var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {
      'Content-Type': 'text/plain'
      });
      
  res.end('Hello World\n' + req.url);
}).listen(process.env.C9_PORT, "0.0.0.0");
console.log('Server running at ' + process.env.C9_PORT);



var google = http.createClient(80, 'www.google.com');
var request = google.request('GET', '/',
  {'host': 'www.google.com'});
request.end();
request.on('response', function (response) {
  console.log('STATUS: ' + response.statusCode);
  console.log('HEADERS: ' + JSON.stringify(response.headers));
  response.setEncoding('utf8');
  response.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});