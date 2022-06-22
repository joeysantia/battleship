import { ship } from "./ship.js";

export const gameboard = (player) => {
  let missedAttacks = [];
  let ships = [];

  
  function isShip(target) {
    return this.ships.find((ship) => {
      return ship.coordinates.find((coord) => {
        return (
          coord.xAxis === target.xAxis &&
          coord.yAxis === target.yAxis
        );
      });
    })
  }

  function placeShip(length, majorAxis, headCoordinate) {
    
    const newShip = ship(length, majorAxis, headCoordinate);

    for (let i = 0; i < newShip.coordinates.length; i++) {
      //revisit, see if you can DRY 
      if (isShip.bind(this)(newShip.coordinates[i]))
       {
        return;
      }
   }
    ships.push(newShip)
    
  }

  function receiveAttack(target) {
    if (isShip.bind(this)(target)) {
      const targetedShip = isShip.bind(this)(target)
      const targetedShipIndex = ships.findIndex((ship) => targetedShip);
      targetedShip.hit(target);
      ships[targetedShipIndex] = targetedShip;
    } else {
      missedAttacks.push(target);
    }
  }

  function reportSunk() {
    for (const ship of ships) {
      if (!ship.isSunk) {
        return false
      }
    }
    return true
  }

  return {
    get ships() {
      return ships
    }, 
    missedAttacks,
    placeShip,
    receiveAttack,
    reportSunk
  };
};

const test = gameboard('test')
test.placeShip(2, 'x-axis', {
  xAxis: 'B',
  yAxis: 7
})