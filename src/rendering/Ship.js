function createShip({ x, y }, direction, color) {
    var vector = new Point(direction)
    var radius = 20;
    var angle = vector.angle - 30;

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
    ship.strokeColor = color;
    ship.strokeWidth = 2;
    ship.rotate(angle);
    return ship
}

module.exports = createShip
