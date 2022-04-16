// server.js
var fs = require("fs");
// where your node app starts
const bodyParser = require("body-parser");
// init project
var express = require("express");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var canvas;
fs.readFile('backup.txt', 'utf8', (err, data) => {
  if (err) throw err;
  var data = data.split(",");

  canvas = new Array(200);
  for (let index = 0; index < canvas.length; index++) {
    canvas[index] = new Array(100);
  }
  var i = 0;
  for (let index = 0; index < canvas.length; index++) {
    for (let indexs = 0; indexs < canvas[index].length; indexs++) {
      if (data[i] != "") {
        canvas[index][indexs] = data[i];
      } else {
        canvas[index][indexs] = null;
      }
      i++;
    }
  }
});

setInterval(() => {
  fs.writeFile("backup.txt", canvas, err => {
    if (err) console.log(err);
  });
}, 60000);

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db


app.get("/client.js", (request, response) => {
  response.sendFile(`${__dirname}/client.js`);
});

app.get("/jscolor.js", (request, response) => {
  response.sendFile(`${__dirname}/jscolor.js`);
});

app.get("/canvas", (request, response) => {
  response.send(canvas);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.post("/setcolor", (request, response) => {
  canvas[request.body.x][request.body.y] = request.body.color
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
