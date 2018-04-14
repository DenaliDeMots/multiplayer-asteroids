const { reducer } = require('./reducer')
const { initialState } = require('./initialState')
const actions = require('./actions')
const tick = require('./tick')



function createGameController(player, socket, serverDelay, serverOffset, startingGameTime) {
    console.log('sever delay: ', serverDelay, 'serverOffset: ', serverOffset)
    console.log(`${player} has joined the game`)
    let actionID = 0
    initialState.gameTime = startingGameTime
    console.log('starting state', initialState)
    let history = [initialState]

    socket.on('action', (action) => {
        const currentTime = Date.now()
        if (action.player === player) {
            serverDelay = (currentTime - action.atPlayerTime) / 2
            history = replaceAction(history, action)
            console.log('replace action ', action, ' in ', history.map(({ action }) => action))
        } else {
            history = insertAction(history, action)
            console.log('inject action ', action, 'into ', history.map(({ action }) => action))
        }
    })

    function addTimestamp(action, time) {
        return { ...action, atPlayerTime: time, player, id: actionID++ }
    }

    return {
        initiateAction(action) {
            action.player = player
            let currentTime = Date.now()
            action = addTimestamp(action, currentTime)
            socket.emit('action', action)
            action.atServerTime = currentTime - serverDelay + serverOffset //estimate
            const nextState = reducer(lastState(history), action)
            history.push(nextState)
            console.log('adding estimated action ', action, ' into ', history.map(({ action }) => action))
            // console.log('estimated history: ', history)
        },

        currentState() {
            let gameTime = Date.now() - serverDelay + serverOffset
            return tick(lastState(history), gameTime)
        }
    }
}




function lastState(history) {
    return history[history.length - 1]
}

function replaceAction(history, replacementAction) {
    let actionIndex = history.findIndex(({ action }) => isMatchingAction(action))
    const previousHistory = history.slice(0, actionIndex)
    const newHistory = recomputeWithAction(history.slice(actionIndex + 1), replacementAction, lastState(previousHistory))
    return previousHistory.concat(newHistory)

    function isMatchingAction(action) {
        return action.id === replacementAction.id && action.player === replacementAction.player
    }
}

function insertAction(history, newAction) {
    for (let i = history.length - 1; i >= 0; i--) {
        if (history[i].gameTime < newAction.atServerTime) {
            const previousHistory = history.slice(0, i + 1)
            const newHistory = recomputeWithAction(history.slice(i + 1), newAction, lastState(previousHistory))
            return previousHistory.concat(newHistory)
        }
    }
}

function recomputeWithAction(history, action, startingState) {
    const actionList = history.map(({ action }) => action)
    actionList.unshift(action)
    return actionList.reduce(
        (state, action) => {
            const nextState = reducer(lastState(state), action)
            state.push(nextState)
            return state
        }
        , [startingState]
    ).slice(1)
}

module.exports = createGameController

// serverDelay = (currentTime - atPlayerTime) / 2
// gameTime = serverDelay + atServerTime 