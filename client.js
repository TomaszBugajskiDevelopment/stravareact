const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;


const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
server.listen(PORT);

server.get('/', (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.render("src/index.html");
  });