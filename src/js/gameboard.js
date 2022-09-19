import { ship } from "./ship.js";

export const gameboard = (player) => {
  //revisit 
  //let takenSpaces = []

  let missedAttacks = [];
  let ships = [];
  let shipsPlaced = 0;

  /* 
  POTENTIAL OPTIMIZATION
  * refactor to make use of the takenSpaces array

  Example for takenSpaces:
  headCoordinate: 'C5'
     * orientation: 'x-axis'
     * length: 5
     * 
     * result: 'B4 C4 D4 E4 F4 G4 H4
     *          B5 C5 D5 E5 F5 G5 H5 
     *          B6 C6 D6 E6 F6 G6 H6'
     *          
     * 
     * headCoordinate: 'B2'
     * orientation: 'y-axis'
     * length: 3
     * 
     * result: 'A1 A2 A3
     *          B1 B2 B3
     *          C1 C2 C3
     *          D1 D2 D3
     *          E1 E2 D3

  function isShip(target) {
    return this.takenSpaces.find(coord => {
      return coord === (target.coordinate ? target.coordinate : target)
    })
  }
  */

  
  function isShip(target) {
    return this.ships.find((ship) => {
      return ship.coordinates.find((coord) => {
        return coord.coordinate === (target.coordinate ? target.coordinate : target)
      });
    });
  }
  

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
