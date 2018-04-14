const express = require('express');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('build'))

let playerNumber = 1
io.on('connection', (socket) => {
    console.log('a user connected')
    if (playerNumber <= 2) {

        socket.on('initialize', (timeStamp) => {
            // timeStamp.player = 'player' + playerNumber
            timeStamp.player = 'player1'
            timeStamp.atServerTime = Date.now()
            // playerNumber++
            socket.emit('initialize', timeStamp)
        })


        socket.on('disconnect', () => {
            playerNumber--
            console.log('a user disconnected')
        })

        socket.on('action', (action) => {
            action.atServerTime = Date.now()
            io.emit('action', action)
        })
    }
})

const PORT = 3000;
http.listen(process.env.PORT || PORT, () => console.log(`Listening on PORT: ${PORT}`));
