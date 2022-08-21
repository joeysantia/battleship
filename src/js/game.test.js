/**
 * @jest-environment jsdom
 */ 

import { 
    turn, 
    gameStart,
    isGameOver, 
    player1,
    player2 } from './game'
import { player } from './player'


test('gameStart sets player1 and player2', () => {

    gameStart('Jeremy', 'Paul')

    expect(JSON.stringify(player1)).toEqual(JSON.stringify(player('Jeremy')))
    expect(JSON.stringify(player2)).toEqual(JSON.stringify(player('Paul')))
})

test('game should be over when a player loses', () => {

    gameStart('Jeremy', 'computer') 

    player1.board.placeShip('Cruiser', 'y-axis', {
        xAxis: 'B',
        yAxis: 3
    })

    player2.board.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'B',
        yAxis: 3
    })

    player1.move(player2, {
        xAxis: 'B',
        yAxis: 4
    })

    player1.move(player2, {
        xAxis: 'B',
        yAxis: 3
    })

    expect(isGameOver()).toEqual(true)




})

test('game should not be over if a player still has ships', () => {

    gameStart("Jeremy", "computer")

    player1.board.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'C',
        yAxis: 1
    })

    player2.board.placeShip('Patrol Boat', 'y-axis', {
        xAxis: 'C',
        yAxis: 1
    })

    expect(isGameOver()).toEqual(false)

})