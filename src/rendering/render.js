const createShip = require('./Ship')

function redraw(state, layer) {
    layer.remove()
    const newLayer = draw(state)
    return newLayer
}

function draw(state) {
    // console.log('player1 position', state.player1.position)
    const layer = new Layer()
    // layer.activate()
    const player1Ship = createShip(state.player1.position, 90)
    //const player2Ship = createShip(state.player2.position, 90)
    // return new Layer(player1Ship, player2Ship)
    // return layer
}

module.exports = {
    redraw
}