import { player2Cells, messageContainer, message1, cells, drag, drop, axisButton, player2Board } from "./dom";
import { player1, turn, togglePlayer2 } from "./game";

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

    switch(drag.id) {
      case 'carrier-y':
        drag.id = 'carrier-x'
        drag.src = '../src/img/carrier-x.png'
        break;
      case 'battleship-y':
        drag.id = 'battleship-x'
        drag.src = '../src/img/battleship-x.png'
        break;
      case 'cruiser-y':
        drag.id = 'cruiser-x'
        drag.src = '../src/img/cruiser-x.png'
        break;
      case 'submarine-y':
        drag.id = 'submarine-x'
        drag.src = '../src/img/submarine-x.png'
        break;
      case 'patrol-boat-y':
        drag.id = 'patrol-boat-x'
        drag.src = '../src/img/patrol-boat-x.png'
        break;
    }
  } else {
    orientation = 'y-axis'

    switch(drag.id) {
      case 'carrier-x':
        drag.id = 'carrier-y'
        drag.src = '../src/img/carrier-y.png'
        break;
      case 'battleship-x':
        drag.id = 'battleship-y'
        drag.src = '../src/img/battleship-y.png'
        break;
      case 'cruiser-x':
        drag.id = 'cruiser-y'
        drag.src = '../src/img/cruiser-y.png'
        break;
      case 'submarine-x':
        drag.id = 'submarine-y'
        drag.src = '../src/img/submarine-y.png'
        break;
      case 'patrol-boat-x':
        drag.id = 'patrol-boat-y'
        drag.src = '../src/img/patrol-boat-y.png'
        break;
    }
  }
})

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

      
      
      let test = player1.board.placeShip(orientation, target)
      console.log(test)
      if (test) {

        const data = e.dataTransfer.getData("text/plain")


        e.preventDefault();
        e.target.appendChild(document.getElementById(data));
        document.getElementById(data).classList.remove('drag')

        let nextShip = document.createElement('img')
        nextShip.classList.add('drag')
        nextShip.draggable = true;

        switch(player1.board.shipsPlaced) {
          case 1:
            message1.textContent = 'Place your Battleship.'
            nextShip.id = 'battleship-y'
            nextShip.src = '../src/img/battleship-y.png'
            break;
          case 2: 
            message1.textContent = 'Place your Cruiser'
            nextShip.id = 'cruiser-y'
            nextShip.src = '../src/img/cruiser-y.png'
            break;
          case 3:
            message1.textContent = 'Place your Submarine'
            nextShip.id = 'submarine-y'
            nextShip.src = '../src/img/submarine-y.png'
            break;
          case 4:
            message1.textContent = 'Place your Patrol Boat'
            nextShip.id = 'patrol-boat-y'
            nextShip.src = '../src/img/patrol-boat-y.png'
            break;
          case 5:
            message1.textContent = 'Your turn'
            togglePlayer2()
            messageContainer.removeChild(axisButton)
            player2Board.classList.remove('disabled')
            //revisit - would break also work?
            return;
        }

        nextShip.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", e.target.id);
          e.dataTransfer.dropEffect = "move";
        })
        messageContainer.appendChild(nextShip)
        
        
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
