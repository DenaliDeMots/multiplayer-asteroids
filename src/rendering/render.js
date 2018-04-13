function redraw(state, layer) {
    layer.remove()
    const newLayer = draw(state)
    return newLayer
}

function draw(state) {
    const layer = new layer()
    layer.activate()
    state.elements.forEach(e => {

    })
    return layer
}

module.exports = {
    redraw
}