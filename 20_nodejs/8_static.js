// 127.0.0.1:3000/cat.jpg
const http = require('http');
const fs = require("fs");
const path = require("path");


const hostname = '127.0.0.1';
const port = 3000;

// 127.0.0.1:3000/cat.jpg
const server = http.createServer((req, res) => {
    console.log(req.url);       // /cat.jpg
    const parsed = path.parse(req.url);
    console.log(parsed);
    const filename = parsed.base;   // cat.jpg
    //const imageFile = __dirname + path.sep + "images" + path.sep + filename;
    const imageFile = `${__dirname}${path.sep}images${path.sep}${filename}`;

    fs.readFile(imageFile, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end("Not Found");
            return;
        }
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});