/* 

THE GAME

1. Start each game by creating Players (init function - test)
2. A function should allow player to place ships
3. You can see your own ships, but the enemy's ships are concealed
3. Computers should run through the same function, placing ships randomly
4. The game should alternate turns between player one and two
5. Declares that the game is over once all ships are sunk on a gameboard

*/

import {
  message1,
  message2,
  message3,
  messageUpdate,
  toggleDisabled,
  createResetButton
} from "./dom";
import { player } from "./player";
import { renderOwnShips, renderEnemyShips } from "./eventlisteners";
import { togglePlayer2 } from './start'

//not a huge fan of this - able to refactor so that they're not global ?
let player1;
let player2;

//perhaps this could be a setter, and the above can be a getter ?
function gameStart(name1, name2) {
  player1 = player(name1);
  player2 = player(name2);
}

async function turn(target, cell) {
  try {
    toggleDisabled();
    await messageUpdate(message1, "You fired ... ", "reset", null, null);

    player1.move(player2, target);

    if (player2.board.missedAttacks.indexOf(target) > -1) {
      await messageUpdate(message1, "and missed.", "add", cell, "missed");
    } else {
      await messageUpdate(message1, "it's a hit!", "add", cell, "hit");

      //feels like this could be optimized - right now I'm using the move method, which searches for a target,
      //and now I'm searching for that same target again. M
      let ship = player2.board.ships.find((ship) => {
        return ship.coordinates.find((coord) => {
          return coord.coordinate === target
        });
      })

      if (ship.isSunk) {
        await messageUpdate(message2, `You sunk the enemy's ${ship.name}!`, "reset", null, null);

        if (isGameOver()) {
          messageUpdate(message3, "You won!", "reset", null, null)
          //return (don't think this keyword is necessary, but commenting out for now)
          createResetButton()
        };
      }

      
    }

    messageUpdate(message2, "", "reset", null, null);
    await messageUpdate(
      message1,
      "The computer fired ... ",
      "reset",
      null,
      null
    );

    let computerTarget = player2.move(player1);

    let targetCell = document.querySelector(`
            .player-1.grid.${computerTarget}
        `);

    if (player1.board.missedAttacks.indexOf(computerTarget) > -1) {
      await messageUpdate(message1, "and missed.", "add", targetCell, "missed");
    } else {
      await messageUpdate(message1, "it's a hit!", "add", targetCell, "hit");

      let ship = player1.board.ships.find((ship) => {
        return ship.coordinates.find((coord) => {
          return coord.coordinate === computerTarget 
        });
      })

      if (ship.isSunk) {
        await messageUpdate(message2, `The enemy sunk your ${ship.name}!`, "reset", null, null);

        if (isGameOver()) {
          messageUpdate(message3, "You lost.", "reset", null, null)
          //return (see above)
          createResetButton()
        };
      }
    }

    toggleDisabled();
    await messageUpdate(message1, "Your turn.", "reset");
  } catch (err) {
    console.error(err);
  }
}

const isGameOver = () => {
  if (player1.board.reportSunk() || player2.board.reportSunk()) {
    return true;
  } else {
    return false;
  }
};

window.onload = function () {

  gameStart("human", "computer");

  while (player2.board.shipsPlaced < 5) {

    let xArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    let yArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let orientationArr = ['y-axis', 'x-axis']
    
    player2.board.placeShip(random(orientationArr), `${random(xArr)}${random(yArr)}`)

    function random(arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    }
  }

  togglePlayer2()
  
  //these were placeholders before and now probably aren't necessary
  //renderOwnShips(player1);
  //renderEnemyShips(player2);

  
};

export { player1, player2, turn, gameStart, isGameOver };
