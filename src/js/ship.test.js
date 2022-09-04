import { ship } from './ship'

test('x-axis ship returns correct status', () => {
    const givenShip = ship('Patrol Boat', 'x-axis', 'G5')
    expect(givenShip.coordinates).toEqual(
        [
            {
                coordinate: 'G5',
                isHit: false
            },
            {
                coordinate: 'H5',
                isHit: false
            }
        ]
    )
})

test('y-axis ship returns correct status', () => {
    const givenShip = ship('Patrol Boat', 'y-axis', 'G5')
    expect(givenShip.coordinates).toEqual([
        {
            coordinate: 'G5',
            isHit: false
        },
        {
            coordinate: 'G6',
            isHit: false
        }
    ])
})

test('x-axis ship loses health when hit', () => {
    const givenShip = ship('Patrol Boat', 'x-axis', 'G5')
    givenShip.hit('H5')
    expect(givenShip.coordinates).toEqual([
        {
            coordinate: 'G5',
            isHit: false,
        }, 
        {
            coordinate: 'H5',
            isHit: true
        }
    ])
})

test('y-axis ship loses health when hit', () => {
    const givenShip = ship('Patrol Boat', 'y-axis', 'G5')
    givenShip.hit('G6')
    expect(givenShip.coordinates).toEqual([
        {
            coordinate: 'G5',
            isHit: false,
        }, 
        {
            coordinate: 'G6',
            isHit: true
        }
    ])
})

test('isSunk status switches to true when all coordinates are hit', () => {
    const givenShip = ship('Patrol Boat', 'y-axis', 'G5')
    givenShip.hit('G6')
    givenShip.hit('G5')
    expect(givenShip.coordinates).toEqual(
    [
        {
            coordinate: 'G5',
            isHit: true
        },
        {
            coordinate: 'G6',
            isHit: true
        }
    ])
   
    expect(givenShip.isSunk).toBeTruthy()
})

test('isSunk status does not change when only some coordinates are hit', () => {
    const givenShip = ship('Patrol Boat', 'y-axis', 'G5')
    givenShip.hit('G6')
    
    expect(givenShip.isSunk).toBeFalsy()
})