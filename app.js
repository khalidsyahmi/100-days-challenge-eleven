//node.js packages
const fs = require("fs");
const path = require("path");

//express JS packages
const express = require("express");
const { parse } = require("path");
const { response } = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/currTime", function (req, res) {
  res.send("<h1>Todays date is " + new Date().toISOString() + "</h1>"); // methods end with ()
}); //localhost:3000/currTime)

app.get("/", function (req, res) {
  res.send(
    '<form action="/path" method="POST"><label for="">Your Username</label><input type="text" name="username"><button>click submit</button></form>'
  );
});

app.post("/path", function (req, res) {
  const userName = req.body.username; //name = username //input into a variable
  /*  console.log(userName); */
  const filePath = path.join(__dirname, "data", "users.json"); //path method //app.js alerady targeted // data folder

  const fileData = fs.readFileSync(filePath); //read method
  const fileParse = JSON.parse(fileData); // parse json format to JS

  fileParse.push(userName); //append new data end of the array in JSON //add new item

  fs.writeFileSync(filePath, JSON.stringify(fileParse)); // write method // path and stringify back parsed js obj //final write in file

  res.send("<h1>username stored! </h1>");
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json"); //path method //app.js alerady targeted // data folder

  const fileData = fs.readFileSync(filePath); //read method
  const fileParse = JSON.parse(fileData); // parse json format to JS

  let userList = "<ul>";

  for (const user of fileParse) {
    userList += "<li>" + user + "</li>"; // appending looped fileParse <li> next to userList <ul> element
  }

  userList += "</ul>"; //closing ul element

  res.send(userList); // direct JSON data
});

app.listen(3000);

/* 
no more node JS create server and functions

function handleRequest(requset, response){
    if (request.url === '/'){
        response.statusCode();
        response.end('');
    }
    if else(){

    }
}

const server = http.createServer(handleRequest);
*/
