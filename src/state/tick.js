const { Point } = require('paper')

const playerSpeed = 0.08
const playerRotateSpeed = 1

function tick(state, gameTime) {
    // console.log('time delta', gameTime - state.gameTime)
    // console.log('starting player', state.player1)
    const player1 = moveAndRotate(state.player1, state.gameTime, gameTime)
    const player2 = moveAndRotate(state.player2, state.gameTime, gameTime)
    //move bullets
    //move asteroids
    // console.log(player1.position)
    // console.log('ending player', player1)
    return { ...state, gameTime, player1, player2 }
}

function moveAndRotate(obj, oldTime, newTime) {
    const position = !obj.isMoving ?
        obj.position : nextPosition(obj.position, obj.direction, playerSpeed, newTime - oldTime)
    const direction = !obj.turnDirection ?
        obj.direction : nextDirection(obj.direction, obj.turnDirection, playerRotateSpeed, newTime - oldTime)
    return { ...obj, position, direction }
}

function nextPosition(startPosition, direction, speed, timeDelta) {
    startPosition = toPoint(startPosition)
    direction = toPoint(direction)
    const distance = speed * timeDelta
    direction = direction.normalize(distance)
    const newPosition = startPosition.add(direction)
    return fromPoint(newPosition)
}

function nextDirection(startVector, turnDirection, rotateSpeed, timeDelta) {
    const rotation = rotateSpeed * timedDelta
    startVector = toPoint(startVector)
    const nextVector = startVector.rotate(turnDirection === "right" ? rotation : -rotation)
    return fromPoint(nextVector)
}

function toPoint({ x, y }) {
    return new Point(x, y)
}

function fromPoint({ x, y }) {
    return { x, y }
}
module.exports = tick