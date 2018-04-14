const io = require('socket.io-client')
const paper = require('paper')
const { redraw } = require('./rendering/render')
const createGameController = require('./state/gameStateController')
const actions = require('./state/actions')

let gameController
const socket = io()
socket.emit('initialize', { atPlayerTime: Date.now() })
socket.on('initialize', ({ player, atPlayerTime, atServerTime }) => {
    currentTime = Date.now()
    const serverDelay = (currentTime - atPlayerTime) / 2
    const serverOffset = currentTime - serverDelay - atServerTime
    gameController = createGameController(player, socket, serverDelay, serverOffset)
})

paper.install(window)

window.onload = function () {
    const canvas = document.getElementById('myCanvas')
    paper.setup(canvas);
    var tool = new paper.Tool()

    tool.onKeyDown = function (event) {
        if (gameController) {
            if (event.key === 'up') {
                gameController.initiateAction(actions.startMoving())
            } else if (event.key === 'down') {
                gameController.initiateAction(actions.stopMoving())
            } else if (event.key === 'left') {
                debugger;
            } else if (event.key === 'right') {

            }
        }
    }

    view.onFrame = function (event) {
        if (gameController) {
            const currentState = gameController.currentState(event.time)
            //draw canvas based on current state
        }
    }

}


