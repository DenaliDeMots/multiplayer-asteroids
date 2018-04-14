const tick = require('./tick')

function reducer(state, action) {
    switch (action.type) {
        case 'start moving':
            return updatePlayer(action, 'isMoving', true, state)

        case 'stop moving':
            return updatePlayer(action, 'isMoving', false, state)

        case 'start turning':
            return updatePlayer(action, 'turnDirection', action.direction, state)

        case 'stop turning':
            return updatePlayer(action, 'turnDirection', null, state)

        case 'shoot':


        default: return state
    }
}


function updatePlayer(action, prop, value, state) {
    const nextPlayer = updateProperty(getPlayer(action.player, state), prop, value)
    const updatedPositions = tick(state, action.atServerTime)
    const updatedPlayer = updateProperty(updatedPositions, action.player, nextPlayer)
    return { ...updatedPlayer, action }
}

function getPlayer(player, state) {
    return player === 'player1' ? state.player1 : state.player2
}

function updateProperty(obj, prop, value) {
    return { ...obj, [prop]: value }
}

module.exports = {
    reducer
}