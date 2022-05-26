import { ship } from "./ship.js";

export const gameboard = (player) => {
  let missedAtttacks = [];
  let ships = [];

  function placeShip(length, majorAxis, headCoordinate) {
    const newShip = ship(length, majorAxis, headCoordinate);

    for (let i = 0; i < newShip.getStatus().coordinates.length; i++) {
      if (
        this.getShips().some((ship) => {
          return ship.find((coordinate) => {
            return (
              coordinate.xAxis === newShip.getStatus().coordinates[i].xAxis &&
              coordinate.yAxis === newShip.getStatus().coordinates[i].yAxis
            );
          });
        })
      ) {
        return "cannot place this ship";
      }
    }
    ships.push(newShip.getStatus().coordinates);
    return 'ship successfully placed'
    

  }

  function getShips() {
    return ships;
  }

  function receiveAttack() {}

  function getMissedAttacks() {
    return missedAtttacks;
  }

  return {
    ships, //remove me later
    placeShip,
    getShips,
    receiveAttack,
    getMissedAttacks,
  };
};
/*

const givenGameboard = gameboard('givenPlayer')

givenGameboard.placeShip(2, 'y-axis', {
  xAxis: 'B',
  yAxis: 3
})

givenGameboard.placeShip(2, 'y-axis', {
  xAxis: 'B',
  yAxis: 4
})

console.log(givenGameboard.getShips())

/* 
const givenGameboard = gameboard('givenPlayer')

    givenGameboard.placeShip(2, 'y-axis', {
        xAxis: 'B',
        yAxis: 3
    })

console.log(givenGameboard.getShips())




const givenGameboard = gameboard("givenPlayer");

givenGameboard.placeShip(2, "y-axis", {
  xAxis: "B",
  yAxis: 3,
});

givenGameboard.placeShip(3, "y-axis", {
  xAxis: "D",
  yAxis: 10,
});

const newShip = ship(3, "y-axis", {
  xAxis: "B",
  yAxis: 5,
});

console.log(givenGameboard.getShips());

function test() {
  for (let i = 0; i < newShip.getStatus().coordinates.length; i++) {
    if (
      givenGameboard.getShips().some((ship) => {
        return ship.find((coordinate) => {
          return (
            coordinate.xAxis === newShip.getStatus().coordinates[i].xAxis &&
            coordinate.yAxis === newShip.getStatus().coordinates[i].yAxis
          );
        });
      })
    ) {
      return "cannot place this ship";
    }
  }
  return "can place this ship";
}

console.log(test());
*/