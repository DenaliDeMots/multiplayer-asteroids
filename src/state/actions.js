function startMoving() {
    return {
        type: "start moving",
    }
}

function stopMoving() {
    return {
        type: "stop moving",
    }
}

function startTurning(direction) {
    return {
        type: "start turning",
        direction, //"left" or "right"
    }
}

function stopTurning() {
    return {
        type: "stop turning",
    }
}

function shoot() {
    return {
        type: "shoot",
    }
}

module.exports = {
    startMoving,
    stopMoving,
    startTurning,
    stopTurning,
    shoot,
}