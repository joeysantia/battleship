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

      let ship = player2.board.ships.find((ship) => {
        return ship.coordinates.find((coord) => {
          return coord.xAxis === target.xAxis && coord.yAxis === target.yAxis;
        });
      })

      if (ship.isSunk) {
        await messageUpdate(message2, `You sunk the enemy's ${ship.name}!`, "reset", null, null);

        if (isGameOver()) {
          messageUpdate(message3, "You won!", "reset", null, null)
          return createResetButton()
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
            .player-1.grid.${computerTarget.xAxis}-${computerTarget.yAxis}
        `);

    if (player1.board.missedAttacks.indexOf(computerTarget) > -1) {
      await messageUpdate(message1, "and missed.", "add", targetCell, "missed");
    } else {
      await messageUpdate(message1, "it's a hit!", "add", targetCell, "hit");

      let ship = player1.board.ships.find((ship) => {
        return ship.coordinates.find((coord) => {
          return coord.xAxis === computerTarget.xAxis && coord.yAxis === computerTarget.yAxis;
        });
      })

      if (ship.isSunk) {
        await messageUpdate(message2, `The enemy sunk your ${ship.name}!`, "reset", null, null);

        if (isGameOver()) {
          messageUpdate(message3, "You lost.", "reset", null, null)
          return createResetButton()
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

  console.log(player1);
  console.log(player2);

  /*player1.board.placeShip("x-axis", {
    xAxis: "C",
    yAxis: 5,
  });
  player1.board.placeShip("y-axis", {
    xAxis: "A",
    yAxis: 1,
  });
  player1.board.placeShip("x-axis", {
    xAxis: "F",
    yAxis: 10,
  });*/

  /* player2.board.placeShip(3, "x-axis", {
    xAxis: "B",
    yAxis: 5,
  });
  */

  while (player2.board.shipsPlaced < 5) {

    let xArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    let yArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let orientationArr = ['y-axis', 'x-axis']

      let x = random(xArr)
      let y = random(yArr)
      let orientation = random(orientationArr)
      //consider refactoring - you may be able to just store the xAxis and yAxis as random(xArr) and random(yArr) directly
      //which saves you a couple of lines 
    
    player2.board.placeShip(orientation, {
      xAxis: x,
      yAxis: y,
    });

    function random(arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    }
  }

  console.log(player2.board)
  
  
  

  renderOwnShips(player1);
  renderEnemyShips(player2);

  
};

export { player1, player2, turn, gameStart, isGameOver };
