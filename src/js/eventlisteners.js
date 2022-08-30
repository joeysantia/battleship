import { player1Cells, messageContainer, cells, drag, drop, axisButton } from "./dom";
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
  if (orientation === 'y-axis') {
    orientation = 'x-axis'
    //drag.setAttribute('src', other url)
  } else {
    orientation = 'y-axis'
    //drag.setAttribute('src', other url)
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
      //placeholders here 
      if (player1 ? player1.board.placeShip(data, 'y-axis', target) : null) {

        e.preventDefault();
        e.target.appendChild(document.getElementById(data));
        console.log(player1.board.ships);
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
