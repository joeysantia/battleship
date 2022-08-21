/* 

GAMEBOARD
1. Needs a function that places a ship at a certain
   head coordinate (placeShip()) - this will use the 
   ship factory function from ship.js (test this!)

   BIG QUESTION: should I refactor so that the ship
   function doesn't include coordinates?
    - Perhaps this just requires DOM interactions
      and doesn't need to be part of its own function
    - However, we need to have two gameboards. What is the 
      difference between them? One is for p1, the other for p2
    - We need to store all of the ships in an array so that 
      the gameboard is able to sort through them and find a ship





2. receiveAttack() should check whether a ship is on
   those coordinates, then use the hit() method from
   ship.js (test this!)
3. Should keep track of missed attacks
4. Should be able to access the missed attacks (test this!)
5. Should be able to report whether all ships are sunk (test this?)
*/

import {ship} from './ship'
import {gameboard} from './gameboard'


test('a placed ship is logged in the ships array', () => {
    const givenGameboard = gameboard('givenPlayer')

    givenGameboard.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'B',
        yAxis: 3
    })
    

    expect(givenGameboard.ships[0].coordinates).toEqual(
        [
          { xAxis: 'B', yAxis: 3, isHit: false },
          { xAxis: 'B', yAxis: 4, isHit: false }
        ]
    )
})

test('will not allow a ship to be placed on top of an existing ship', () => {
    const givenGameboard = gameboard('givenPlayer')

    givenGameboard.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'A',
        yAxis: 2
    })

    givenGameboard.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'A',
        yAxis: 1
    })

    expect(givenGameboard.ships[0].coordinates).toEqual(
        [
            {
                isHit: false,
                xAxis: 'A',
                yAxis: 2
            },
            {
                isHit: false,
                xAxis: 'A',
                yAxis: 3
            }
        ],
    )
    expect(givenGameboard.ships[1]).toBeFalsy()
})

test('will not allow an invalid ship to be placed', () => {
    const givenGameboard = gameboard('player')

    givenGameboard.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'J',
        yAxis: 10
    })

    expect(givenGameboard.ships.length).toEqual(0)
})

test('can accept an attack on a ship', () => {
    const givenGameboard = gameboard('player')
    
    givenGameboard.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'B',
        yAxis: 3
    })

    givenGameboard.receiveAttack({
        xAxis: 'B',
        yAxis: 4
    })

    expect(givenGameboard.ships[0].coordinates).toEqual(
        [
            {
                xAxis: 'B',
                yAxis: 3,
                isHit: false,
            },
            {
                xAxis: 'B',
                yAxis: 4,
                isHit: true
            }
        ]
    )

})

test('will not accept an attack on a ship that has already been hit', () => {
    const givenGameboard = gameboard('player')
    
    givenGameboard.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'B',
        yAxis: 3
    })

    givenGameboard.receiveAttack({
        xAxis: 'B',
        yAxis: 4
    })

    givenGameboard.receiveAttack({
        xAxis: 'B',
        yAxis: 4
    })

    expect(givenGameboard.ships[0].coordinates).toEqual(
        [
            {
                xAxis: 'B',
                yAxis: 3,
                isHit: false
            },
            {
                xAxis: 'B',
                yAxis: 4,
                isHit: true
            }
        ]
    )
})

test('will log an attack on an empty space', () => {
    const givenGameboard = gameboard('player')
    
    givenGameboard.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'B',
        yAxis: 3
    })

    givenGameboard.receiveAttack({
        xAxis: 'E',
        yAxis: 2
    })

    expect(givenGameboard.missedAttacks).toEqual(
        [
            {
                xAxis: 'E',
                yAxis: 2
            }
        ]
    )
})

test('reports that all ships are sunk', () => {
    const givenGameboard = gameboard('player')
    
    givenGameboard.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'B',
        yAxis: 3
    })

    givenGameboard.receiveAttack({
        xAxis: 'B',
        yAxis: 4
    })

    givenGameboard.receiveAttack({
        xAxis: 'B',
        yAxis: 3
    })

    expect(givenGameboard.reportSunk()).toBeTruthy()
})