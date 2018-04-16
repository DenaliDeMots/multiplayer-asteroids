const express = require('express');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('build'))

const players = {}
io.on('connection', (socket) => {
    console.log('a user connected')
    if (!players.player1) {
        players.player1 = socket
        socket.player = 'player1'
    } else if (!players.player2) {
        players.player2 = socket
        socket.player = 'player2'
    }
    if (socket.player) {
        socket.on('initialize', (timeStamp) => {
            timeStamp.player = socket.player
            timeStamp.atServerTime = Date.now()
            socket.emit('initialize', timeStamp)
        })


        socket.on('disconnect', () => {
            delete players[socket.player]
            console.log('a user disconnected')
        })

        socket.on('action', async (action) => {
            action.atServerTime = Date.now()
            io.emit('action', action)

            // await delay(5000)
            // action.atServerTime = Date.now()
            // await delay(5000)
            // io.emit('action', action)
        })
    }
})

function delay(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        })
    })
}



const PORT = 3000;
http.listen(process.env.PORT || PORT, () => console.log(`Listening on PORT: ${PORT}`));
