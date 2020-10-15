// Hello, World를 출력하는 방법
// Node.js 특징
// 웹 어플리케이션: 풀스텍, 프론트엔드 + 백엔드(Node.js)
// 1. 크롬 V8 엔진: 노드에서 엔진을 가져와 쓰고 있음
// 2. 이벤트 기반의 비동기 I/O F/W
// 3. 모듈 시스템 기반: 파일 형태로 모듈 관리 (CommonJS 스펙)



// 1. REPL
// 콘솔에 node 입력하면 repl

// 2. js 파일 생성 후 실행 (js 에서 콘솔에 출력)
console.log("Hello, Node.js");


// 3. 웹 서버를 통해 출력
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// 요청(request), 응답(response) : header + body
const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);
  
  if (url === "/") {
    res.statusCode = 200;   // OK
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  }
  else if (url === "/html") {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<body><h1>Hello, World</h1><body>");
    res.
    end("</html>");
  } 
  else if (url === "/json") {
    const data = { msg: "Hello, World" };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));    // "{ msg: "Hello, World" }"
  }
  else {
    res.statusCode = 404;   // OK
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// 4. 파일을 읽어서 출력
var fs = require('fs');

fs.readFile('./hello.txt', encoding = 'utf-8', function(err, data) {
  if(err) {
    throw err;
  }
  console.log(data);
});

// 5. 비동기 이벤트 처리 방식
var EventEmitter = require("events").EventEmitter;
var evt = new EventEmitter();   // 이벤트 객체 생성

evt.on("helloNode", function(str) {
  console.log(str);
});

setTimeout(function() {
  evt.emit("helloNode", "Hello, Node.js");
}, 3000);       // 3초 있다가 이벤트 발생