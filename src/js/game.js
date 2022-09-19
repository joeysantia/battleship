
import {
  player2Board,
  message1,
  message2,
  message3,
  messageUpdate,
  toggleDisabled,
  createResetButton
} from "./dom";
import { player } from "./player";

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
      //and now I'm searching for that same target again. 
      let ship = player2.board.ships.find((ship) => {
        return ship.coordinates.find((coord) => {
          return coord.coordinate === target
        });
      })

      if (ship.isSunk) {
        await messageUpdate(message2, `You sunk the enemy's ${ship.name}!`, "reset", null, null);

        if (isGameOver()) {
          messageUpdate(message3, "You won!", "reset", null, null)
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

function togglePlayer2() {
  if (document.querySelector('.player-2')) {
      document.body.querySelector('main').removeChild(player2Board)
      document.body.querySelector('#message').removeChild(message2)
      document.body.querySelector('#message').removeChild(message3)
      if (document.querySelector('#cover')) {
          document.body.querySelector('main').removeChild(document.querySelector('#cover'))
      }
  } else {
      document.querySelector('main').appendChild(player2Board)
      document.body.querySelector('#message').appendChild(message2)
      document.body.querySelector('#message').appendChild(message3)
      
  }
}

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

  console.log(player1)
  console.log(player2.board.ships)

  togglePlayer2()
  
};

export { player1, player2, turn, gameStart, isGameOver, togglePlayer2 };
