const player1 = {
    position: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
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