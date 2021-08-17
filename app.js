const express = require('express');
const path = require('path');
const http = require('http');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

// Creating server
const PORT = 9000;
const app = express();
const server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routing the request
app.use('/', indexRouter);

server.listen(PORT, function(){
  console.log("Server is running");
});

// Socket 
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

module.exports = app;
