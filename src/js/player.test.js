/**
 * @jest-environment jsdom
 */ 


import { player } from './player'
import { gameboard } from './gameboard'
import { ship } from './ship'


test('computer can make a random move', () => {
    const human = player('name')
    const computer = player('computer')

    computer.move(human)

    expect(human.board.missedAttacks.length).toEqual(1)
    
})

