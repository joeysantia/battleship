import { ship } from "./ship.js";

export const gameboard = (player) => {
  let missedAttacks = [];
  let ships = [];

  //tragically, i must leave this refactoring for later bc it's breaking everything
  function isShip(target) {
    this.ships.find((ship) => {
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
      if ( 
        this.ships.find((ship) => {
          return ship.coordinates.find((coord) => {
            return (
              coord.xAxis === newShip.coordinates[i].xAxis &&
              coord.yAxis === newShip.coordinates[i].yAxis
            );
          });
        })
      )
       {
        return;
      }
   }
    ships.push(newShip)
    
  }

  function receiveAttack(target) {
    if (
      this.ships.find((ship) => {
        return ship.coordinates.find((coord) => {
          return (
            coord.xAxis === target.xAxis &&
            coord.yAxis === target.yAxis
          );
        });
      })
    ) {
      const targetedShip = this.ships.find((ship) => {
        return ship.coordinates.find((coord) => {
          return (
            coord.xAxis === target.xAxis &&
            coord.yAxis === target.yAxis
          );
        });
      }) ;
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

const givenGameboard = gameboard('player')

givenGameboard.placeShip(2, 'y-axis', {
  xAxis: 'B',
  yAxis: 3
})