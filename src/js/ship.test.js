import { ship } from './ship'

test('x-axis ship returns correct status', () => {
    const givenShip = ship('Patrol Boat', 'x-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    expect(givenShip.coordinates).toEqual(
        [
            {
                xAxis: 'G',
                yAxis: 5,
                isHit: false
            },
            {
                xAxis: 'H',
                yAxis: 5,
                isHit: false
            }
        ]
    )
})

test('y-axis ship returns correct status', () => {
    const givenShip = ship('Patrol Boat', 'y-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    expect(givenShip.coordinates).toEqual([
        {
            xAxis: 'G',
            yAxis: 5,
            isHit: false
        },
        {
            xAxis: 'G',
            yAxis: 6,
            isHit: false
        }
    ])
})

test('x-axis ship loses health when hit', () => {
    const givenShip = ship('Patrol Boat', 'x-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    givenShip.hit({
        xAxis: 'H',
        yAxis: 5
    })
    expect(givenShip.coordinates).toEqual([
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
    const givenShip = ship('Patrol Boat', 'y-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    givenShip.hit({
        xAxis: 'G',
        yAxis: 6
    })
    expect(givenShip.coordinates).toEqual([
        {
            xAxis: 'G',
            yAxis: 5,
            isHit: false,
        }, 
        {
            xAxis: 'G',
            yAxis: 6,
            isHit: true
        }
    ])
})

test('isSunk status switches to true when all coordinates are hit', () => {
    const givenShip = ship('Patrol Boat', 'y-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    givenShip.hit({
        xAxis: 'G',
        yAxis: 6
    })
    givenShip.hit({
        xAxis: 'G',
        yAxis: 5
    })
    expect(givenShip.coordinates).toEqual(
    [
        {
            xAxis: 'G',
            yAxis: 5,
            isHit: true
        },
        {
            xAxis: 'G',
            yAxis: 6,
            isHit: true
        }
    ])
   
    expect(givenShip.isSunk).toBeTruthy()
})

test('isSunk status does not change when only some coordinates are hit', () => {
    const givenShip = ship('Patrol Boat', 'y-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    givenShip.hit({
        xAxis: 'G',
        yAxis: 6
    })
    
    expect(givenShip.isSunk).toBeFalsy()
})