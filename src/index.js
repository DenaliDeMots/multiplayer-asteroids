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
    const serverOffset = -(currentTime - serverDelay - atServerTime)
    const startingGameTime = currentTime - serverDelay + serverOffset
    gameController = createGameController(player, socket, serverDelay, serverOffset, startingGameTime)
})

paper.install(window)

window.onload = function () {
    const canvas = document.getElementById('myCanvas')
    paper.setup(canvas);
    var tool = new paper.Tool()

    // createShip({ x: 400, y: 400 }, 90)

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
            const currentState = gameController.currentState()
            redraw(currentState, project.activeLayer)
        }
    }

}


function createShip({ x, y }, rotation) {
    var radius = 20;
    var angle = rotation - 30;

    var circle = new Path.Circle(new Point(x, y), radius);
    var triangle = new Path.RegularPolygon(new Point(x, y), 3, radius);
    var triangle2 = new Path.RegularPolygon(new Point(x, y), 3, radius / 2);

    triangle.insert(1, new Point(x, y));
    triangle2.insert(1, new Point(x, y));

    var ship = new CompoundPath({
        children: [
            triangle, triangle2, circle
        ],
        // selected: true
    })
    ship.strokeColor = 'cyan';
    ship.strokeWidth = 2;
    ship.rotate(angle);
    return ship
}


