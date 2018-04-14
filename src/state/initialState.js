const player1 = {
    position: { x: 400, y: 400 },
    direction: { x: 0, y: 1 },
    turnDirection: null,
    isMoving: false,
}

const player2 = player1

const initialState = {
    player1,
    player2,
    bullets: [],
    asteroids: [],
    action: { id: NaN },
    gameTime: 0,
}


module.exports = {
    initialState
}