import { player } from './player'
import { gameboard } from './gameboard'
import { ship } from './ship'

/*

PLAYER

1. Needs a function that creates a new player  X
2. This new player must have its own gameboard  X
3. This new player must be able to make a move on the opponent's 
    gameboard
4. A computer player should be able to make a random, legal move on 
   the opponent's gameboard  (these are integration tests)

*/

test('computer can make a random move', () => {
    const human = player('name')
    const computer = player('computer')

    computer.move(human)

    expect(human.board.missedAttacks.length).toEqual(1)
    
})