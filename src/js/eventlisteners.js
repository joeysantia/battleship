import { player1Cells, messageContainer, message1, cells, drag, drop, axisButton, player2Board } from "./dom";
import { player1, turn } from "./game";

let orientation = 'y-axis'

cells.forEach((cell) => {
  cell.addEventListener("pointerdown", (e) => {
    let xTarget = [...cell.classList][2][0];
    let yTarget = [...cell.classList][2].slice(2);

    let target = {
      xAxis: xTarget,
      yAxis: Number(yTarget),
    };

    turn(target, cell);
  });
});

axisButton.addEventListener('pointerdown', (e) => {
  let drag = document.querySelector('.drag')
  console.log(drag.id)
  if (orientation === 'y-axis') {
    orientation = 'x-axis'
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

function renderOwnShips(player) {
  for (const ship of player.board.ships) {
    for (const coordinate of ship.coordinates) {
      let givenCell = document.querySelector(
        `.player-1.grid.${coordinate.xAxis}-${coordinate.yAxis}`
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
        `.player-2.grid.${coordinate.xAxis}-${coordinate.yAxis}`
      );
      givenCell.classList.add("occupied");
    }
  }
}

drag.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.dataTransfer.dropEffect = "move";
});

drop.forEach((cell) => {
    cell.addEventListener("drop", (e) => {

      let xTarget = [...cell.classList][2][0];
      let yTarget = [...cell.classList][2].slice(2);
    
      let target = {
        xAxis: xTarget,
        yAxis: Number(yTarget),
      };

      const data = e.dataTransfer.getData("text/plain")
      //this should be its own function - that way, it can just progress through the different ship types 
      if (player1 ? player1.board.placeShip('y-axis', target) : null) {

        e.preventDefault();
        e.target.appendChild(document.getElementById(data));
        document.getElementById(data).classList.remove('drag')
        console.log(player1.board);

        let nextShip = document.createElement('img')
        //fix this once you find the right images - this should be set within the switch statement
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
            messageContainer.removeChild(axisButton)
            player2Board.classList.remove('disabled')
            console.log('went down the right path')
            return;
        }

        nextShip.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", e.target.id);
          e.dataTransfer.dropEffect = "move";
        })
        messageContainer.appendChild(nextShip)
        
        
      } else {
        console.log('that didnt work ')
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

export { renderOwnShips, renderEnemyShips, turn };
