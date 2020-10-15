// 기본 모듈 - url
const http = require('http');
const url = require("url");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);           // /
    console.log(req.method);    // GET

    // string -> object
    const obj = url.parse(req.url, true);
    console.log(obj);

    // http://127.0.0.1:3000/?year=3&class=5&name=정하영
    const year = obj.query.year;
    const cls = obj.query.class;
    const name = obj.query.name;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf8');
    //res.end('Hello World');
    res.end(`${year}학년 ${cls}반 ${name}입니다.`);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});