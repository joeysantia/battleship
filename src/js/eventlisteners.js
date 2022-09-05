import { player1Cells, player2Cells, messageContainer, message1, cells, drag, drop, axisButton, player2Board } from "./dom";
import { player1, turn } from "./game";
import { togglePlayer2 } from './start'

let orientation = 'y-axis'

player2Cells.forEach((cell) => {
  cell.addEventListener("pointerdown", (e) => {
    //the third class for each cell (index 2) is the coordinate, within which the x and y coordinates can be accessed
    let xTarget = [...cell.classList][2][0];
    let yTarget = [...cell.classList][2].slice(1);

    let target = `${xTarget}${yTarget}`

    turn(target, cell);
  });
});

axisButton.addEventListener('pointerdown', (e) => {
  let drag = document.querySelector('.drag')

  if (orientation === 'y-axis') {
    orientation = 'x-axis'
    //revisit with real images
    drag.setAttribute('src', '../src/img/placeholder-X.png')

    switch(drag.id) {
      case 'carrier-y':
        drag.id = 'carrier-x'
        break;
      case 'battleship-y':
        drag.id = 'battleship-x'
        break;
      case 'cruiser-y':
        drag.id = 'cruiser-x'
        break;
      case 'submarine-y':
        drag.id = 'submarine-x'
        break;
      case 'patrol-boat-y':
        drag.id = 'patrol-boat-x'
        break;
    }
  } else {
    orientation = 'y-axis'
    //revisit with real images
    drag.setAttribute('src', '../src/img/placeholder.png')
    switch(drag.id) {
      case 'carrier-x':
        drag.id = 'carrier-y'
        break;
      case 'battleship-x':
        drag.id = 'battleship-y'
        break;
      case 'cruiser-x':
        drag.id = 'cruiser-y'
        break;
      case 'submarine-x':
        drag.id = 'submarine-y'
        break;
      case 'patrol-boat-x':
        drag.id = 'patrol-boat-y'
        break;
    }
  }
})

/*
function renderOwnShips(player) {
  for (const ship of player.board.ships) {
    for (const coordinate of ship.coordinates) {
      let givenCell = document.querySelector(
        `.player-1.grid.${coordinate.coordinate}`
      );
      givenCell.classList.add("occupied");
      givenCell.addEventListener("pointerdown", (e) => {
        givenCell.style.backgroundColor = "red"; //revisit css
        player.board.receiveAttack(coordinate);
      });
    }
  }
}

function renderEnemyShips(player) {
  for (const ship of player.board.ships) {
    for (const coordinate of ship.coordinates) {
      let givenCell = document.querySelector(
        `.player-2.grid.${coordinate.coordinate}`
      );
      givenCell.classList.add("occupied");
    }
  }
}
*/

drag.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.dataTransfer.dropEffect = "move";
});

drop.forEach((cell) => {
    cell.addEventListener("drop", (e) => {

      //see previous comment about xTarget and yTarget
      let xTarget = [...cell.classList][2][0];
      let yTarget = [...cell.classList][2].slice(1);
    
      let target = `${xTarget}${yTarget}`

      const data = e.dataTransfer.getData("text/plain")
      //this should be its own function - that way, it can just progress through the different ship types 
      
      if (player1.board.placeShip(orientation, target)) {

        e.preventDefault();
        e.target.appendChild(document.getElementById(data));
        document.getElementById(data).classList.remove('drag')

        let nextShip = document.createElement('img')
        //see note about placeholders above
        nextShip.setAttribute('src', '../src/img/placeholder.png')
        nextShip.classList.add('drag')
        nextShip.draggable = true;

        switch(player1.board.shipsPlaced) {
          case 1:
            message1.textContent = 'Place your Battleship.'
            nextShip.id = 'battleship-y'
            break;
          case 2: 
            message1.textContent = 'Place your Cruiser'
            nextShip.id = 'cruiser-y'
            break;
          case 3:
            message1.textContent = 'Place your Submarine'
            nextShip.id = 'submarine-y'
            break;
          case 4:
            message1.textContent = 'Place your Patrol Boat'
            nextShip.id = 'patrol-boat-y'
            break;
          case 5:
            message1.textContent = 'Your turn'
            togglePlayer2()
            messageContainer.removeChild(axisButton)
            player2Board.classList.remove('disabled')
            //why not break?
            return;
        }

        nextShip.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", e.target.id);
          e.dataTransfer.dropEffect = "move";
        })
        messageContainer.appendChild(nextShip)
        
        
      } else {
        console.log('hello, i am the almighty ship placement bug!')
        console.log(player1.board.placeShip('y-axis', target))
        if (cell.firstChild) {
          cell.removeChild(drag)
        }
        messageContainer.appendChild(drag)
      }
    });
});

drop.forEach((cell) => {
  cell.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
  });
});

export { turn };
