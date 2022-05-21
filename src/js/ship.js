   export const ship = (length, majorAxis, headCoordinate) => {

    let coordinates = []
    coordinates.push({
        xAxis: headCoordinate.xAxis,
        yAxis: headCoordinate.yAxis,
        isHit: false
    })

    for (let i = 1; i < length; i++) {
        let nextCoordinate;
        if (majorAxis === 'x-axis') {
            let nextLetter = String.fromCharCode(headCoordinate.xAxis.charCodeAt(0) + i)
            nextCoordinate = {
                xAxis: nextLetter,
                yAxis: headCoordinate.yAxis,
                isHit: false
            }
            

        } else {
            nextCoordinate = {
                xAxis: headCoordinate.xAxis,
                yAxis: headCoordinate.yAxis - i,
                isHit: false
            }
        }
        coordinates.push(nextCoordinate)

    }

    let isSunk = false;

    function hit(coordinate) {
        let hitCoordinateIndex = coordinates.findIndex(target => {
            return (target.xAxis === coordinate.xAxis) && (target.yAxis === coordinate.yAxis)
        })
        coordinates[hitCoordinateIndex].isHit = true;
    }

    function sink() {
        if (coordinates.every(coordinate => !!coordinate.isHit)) { 
            this.isSunk = true
        }
    }

    function getStatus() {
        return {
            coordinates: this.coordinates,
            isSunk: this.isSunk
        }
    }
    return {
        coordinates,
        hit,
        sink,
        getStatus
    }
}


const givenShip = ship(2, 'y-axis', {
    xAxis: 'G',
    yAxis: 5
})
givenShip.hit({
    xAxis: 'G',
    yAxis: 4
})
givenShip.hit({
    xAxis: 'G',
    yAxis: 5
})
givenShip.sink()
console.log(givenShip.getStatus().isSunk)

