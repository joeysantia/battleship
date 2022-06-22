/* 

THE GAME

1. Start each game by creating Players (init function - test)
2. A function should allow players to place ships
3. Computers should run through the same function, placing ships randomly
4. The game should alternate turns between player one and two
5. Declares that the game is over once all ships are sunk on a gameboard

*/

import { ship } from './ship'
import { gameboard } from './gameboard'
import { player } from './player'
import { get } from 'lodash';


//not a huge fan of this - able to refactor so that they're not global ? 
let player1;
let player2;

//perhaps this could be a setter, and the above can be a getter ?
function gameStart(name1, name2) {

    player1 = player(name1)
    player2 = player(name2)

}

const isGameOver = () => {
    if(player1.board.reportSunk() || player2.board.reportSunk()) {
        return true
    } else {
        return false
    }

}

export {
    player1, 
    player2,
    gameStart,
    isGameOver
}


