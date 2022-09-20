

import { ship } from "./ship.js";
import { message1 } from './dom.js'

export const gameboard = () => {
  //revisit 
  let takenSpaces = []

  let missedAttacks = [];
  let ships = [];
  let shipsPlaced = 0;

  function isShip(target) {
    return this.takenSpaces.find(coord => {
      return coord === (target.coordinate ? target.coordinate : target)
    })
  }
  

  /* 
  function isShip(target) {
    return this.ships.find((ship) => {
      return ship.coordinates.find((coord) => {
        return coord.coordinate === (target.coordinate ? target.coordinate : target)
      });
    });
  }
  */
  

  function hasValidCoordinates(length, majorAxis, headCoordinate) {
    if (majorAxis === "x-axis") {
      return length - 1 + headCoordinate.charCodeAt(0) <= "J".charCodeAt(0)
    } else {
      //the last coordinate must be less than or equal to 10 (starting at headCoordinate and going up by (length - 1))
      return length - 1 + Number(headCoordinate.slice(1)) <= 10
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

      if (
        isShip.bind(this)(newShip.coordinates[i]) ||
        !hasValidCoordinates(newShip.length, majorAxis, headCoordinate)
      ) {
        message1.textContent = 'You cannot place a ship in another ship\'s immediate vicinity.'
        return 
      }
    }

    this.shipsPlaced++

    let xStart = (headCoordinate[0] === 'A' ? 'A'.charCodeAt(0) : headCoordinate.charCodeAt(0) - 1)
    let yStart = (headCoordinate.slice(1) === '1' ? 1 : Number(headCoordinate.slice(1)) - 1)
    let xEnd = xStart + (majorAxis === 'x-axis' ? newShip.length + 1 : 2)
    let yEnd = yStart + (majorAxis === 'y-axis' ? newShip.length + 1 : 2)

    for (let x = xStart; x <= xEnd; x++) {
      for (let y = yStart; y <= yEnd; y++) {
        this.takenSpaces.push(`${String.fromCharCode(x)}${y}`)
      }
    }

    return ships.push(newShip)
    
    
  }

  function receiveAttack(target) {
    const targetedShip = this.ships.find((ship) => {
      return ship.coordinates.find((coord) => {
        return coord.coordinate === (target.coordinate ? target.coordinate : target)
      });
    })

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
    takenSpaces,
    placeShip,
    receiveAttack,
    reportSunk,
  };
};
