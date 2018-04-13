const express = require('express');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)

const bodyParser = require('body-parser');


const PORT = 3000;

// mongoose.connect('mongodb://student:ilovetesting@ds157247.mlab.com:57247/week-4-assessment');
// mongoose.connection.once('open', () => {
//   console.log('Connected to Database');
// });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('build'))


io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })

    socket.on('test', (num) => console.log(num))
})



http.listen(process.env.PORT || PORT, () => console.log(`Listening on PORT: ${PORT}`));
