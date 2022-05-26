import { ship } from './ship'

test('x-axis ship returns correct status', () => {
    const givenShip = ship(2, 'x-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    expect(givenShip.getStatus()).toEqual({
        coordinates: [
            {
                xAxis: 'G',
                yAxis: 5,
                isHit: false
            },
            {
                xAxis: 'H',
                yAxis: 5,
                isHit: false
            },
            
        ],
        isSunk: false
    })
})

test('y-axis ship returns correct status', () => {
    const givenShip = ship(2, 'y-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    expect(givenShip.getStatus().coordinates).toEqual([
        {
            xAxis: 'G',
            yAxis: 5,
            isHit: false
        },
        {
            xAxis: 'G',
            yAxis: 4,
            isHit: false
        }
    ])
})

test('x-axis ship loses health when hit', () => {
    const givenShip = ship(2, 'x-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    givenShip.hit({
        xAxis: 'H',
        yAxis: 5
    })
    expect(givenShip.getStatus().coordinates).toEqual([
        {
            xAxis: 'G',
            yAxis: 5,
            isHit: false,
        }, 
        {
            xAxis: 'H',
            yAxis: 5,
            isHit: true
        }
    ])
})

test('y-axis ship loses health when hit', () => {
    const givenShip = ship(2, 'y-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    givenShip.hit({
        xAxis: 'G',
        yAxis: 4
    })
    expect(givenShip.getStatus().coordinates).toEqual([
        {
            xAxis: 'G',
            yAxis: 5,
            isHit: false,
        }, 
        {
            xAxis: 'G',
            yAxis: 4,
            isHit: true
        }
    ])
})

test('isSunk status switches to true when all coordinates are hit', () => {
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
    expect(givenShip.getStatus().isSunk).toBeTruthy()
})

test('isSunk status does not change when only some coordinates are hit', () => {
    const givenShip = ship(2, 'y-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    givenShip.hit({
        xAxis: 'G',
        yAxis: 4
    })
    givenShip.sink()
    expect(givenShip.getStatus().isSunk).toBeFalsy()
})