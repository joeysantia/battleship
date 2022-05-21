/*

we only want to test incoming queries and commands!!!!

what is a ship?
 - it is a factory function
 - it has a length
 - it has an orientation (majorAxis)
 - it has coordinates, particularly a headCoordinate
 - it has a health status for each coordinate
 - it has a sunk or not sunk status
 - it has a hit() method (test this because it is part 
    of the public interface!)
 - it has an sink() method (test this too!)

 LENGTH
 - self-explanatory

 COORDINATES 
 - this should be based on the starting coordinate and 
    the orientation (x or y)

*/

import { ship } from './ship'

test('x-axis ship returns correct status', () => {
    const givenShip = ship(2, 'x-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    expect(givenShip.getStatus()).toEqual([
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
    ])
})

test('y-axis ship returns correct status', () => {
    const givenShip = ship(2, 'y-axis', {
        xAxis: 'G',
        yAxis: 5
    })
    expect(givenShip.getStatus()).toEqual([
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
    expect(givenShip.getStatus()).toEqual([
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
    expect(givenShip.getStatus()).toEqual([
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