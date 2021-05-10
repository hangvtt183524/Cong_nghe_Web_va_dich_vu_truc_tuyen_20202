const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/test') {
        fs.readFile('./test.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
    else {
        fs.readFile('./View/html/welcome_page.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
    }
}).listen(3000);
