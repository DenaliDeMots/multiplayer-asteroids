const io = require('socket.io-client')
const paper = require('paper')
const { redraw } = require('./render')

const socket = io('http://localhost:3000')
socket.emit('test', 7)
paper.install(window)

window.onload = function () {
    const canvas = document.getElementById('myCanvas')
    paper.setup(canvas);
    var tool = new paper.Tool()

    tool.onMouseMove = function (event) {

    }

    view.onFrame = function (event) {

    }
}


