import { player1Cells, cells } from "./dom";
import { turn } from "./game";

cells.forEach((cell) => {
  cell.addEventListener("pointerdown", (e) => { 
    let xTarget = [...cell.classList][2][0]
    let yTarget = [...cell.classList][2].slice(2)

    let target = {
      xAxis: xTarget,
      yAxis: Number(yTarget)
    }

    turn(target, cell) 
    
  });
});

player1Cells.forEach(cell => {
  cell.addEventListener('drop', (e) => {
    e.preventDefault()

    const data = e.dataTransfer.getData('text/plain')
    e.target.appendChild(document.getElementById(data))
  })
  cell.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  })
})

function renderOwnShips(player) {
  for (const ship of player.board.ships) {
    for (const coordinate of ship.coordinates) {
      let givenCell = document.querySelector(
        `.player-1.grid.${coordinate.xAxis}-${coordinate.yAxis}`
      );
      givenCell.classList.add("occupied");
      givenCell.addEventListener(
        "pointerdown",
        (e) => {
                givenCell.style.backgroundColor = 'red' //revisit css
                player.board.receiveAttack(coordinate)
            }) 
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

export { renderOwnShips, renderEnemyShips, turn };
