import { ship } from "./ship.js";

export const gameboard = (player) => {
  let missedAttacks = [];
  let ships = [];
  let shipsPlaced = 0;

  function isShip(target) {
    return this.ships.find((ship) => {
      return ship.coordinates.find((coord) => {
        if (target.coordinate) {
          return coord.coordinate === target.coordinate
        } else {
          return coord.coordinate === target;
        }
      });
    });
  }

  function hasValidCoordinates(length, majorAxis, headCoordinate) {
    if (majorAxis === "x-axis") {
      return length + headCoordinate.charCodeAt(0) <= "J".charCodeAt(0)
    } else {
      return length + Number(headCoordinate.slice(1)) <= 10
    }
  }

  function placeShip(majorAxis, headCoordinate) {
    
    let name; 

    switch(this.shipsPlaced) {
      case 0: 
        name = 'Carrier'
        break;
      case 1: 
        name = 'Battleship'
        break;
      case 2: 
        name = 'Cruiser'
        break;
      case 3:
        name = 'Submarine'
        break;
      case 4: 
        name = 'Patrol Boat';
        break;
    }

    const newShip = ship(name, majorAxis, headCoordinate);

   

    for (let i = 0; i < newShip.coordinates.length; i++) {
      console.log(newShip.coordinates[i], isShip.bind(this)(newShip.coordinates[i]))
      if (
        isShip.bind(this)(newShip.coordinates[i]) ||
        !hasValidCoordinates(newShip.length, majorAxis, headCoordinate)
      ) {
        return
      }
    }
    this.shipsPlaced++
    return ships.push(newShip)
    
  }

  function receiveAttack(target) {
    const targetedShip = isShip.bind(this)(target);

    if (targetedShip) {
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
        return false;
      }
    }
    return true;
  }

  return {
    get ships() {
      return ships;
    },
    shipsPlaced,
    missedAttacks,
    placeShip,
    receiveAttack,
    reportSunk,
  };
};
