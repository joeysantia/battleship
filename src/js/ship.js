export const ship = (name, majorAxis, headCoordinate) => {
  let coordinates = [];
  let isSunk = false;
  let length;

  const setCoordinates = (function() {
    addCoordinate(headCoordinate);

    switch(name) {
      case 'Carrier':
        length = 5;
        break;
      case 'Battleship':
        length = 4
        break;
      case 'Patrol Boat':
        length = 2;
        break;
      default: //both Cruiser and Submarine are 3 units long
        length = 3;
        break;
    }

    for (let i = 1; i < length; i++) {
      if (majorAxis === "x-axis") {
        let nextLetter = String.fromCharCode(
          headCoordinate.charCodeAt(0) + i
        );
        addCoordinate(`${String.fromCharCode(headCoordinate.charCodeAt(0) + i)}${headCoordinate.slice(1)}`);
      } else {
        addCoordinate(`${headCoordinate[0]}${Number(headCoordinate.slice(1)) + i}`);
      }
    }
  })()

  function addCoordinate(coordinate) {
    coordinates.push({
      coordinate: coordinate,
      isHit: false,
    });
  }
  

  function hit(coordinate) {
    let hitCoordinateIndex = coordinates.findIndex((target) => {
      return (
        coordinate === target.coordinate
      );
    });
    coordinates[hitCoordinateIndex].isHit = true;
    sinkCheck.bind(this)()
  }

  function sinkCheck() {
    if (this.coordinates.every((coordinate) => coordinate.isHit)) {
      this.isSunk = true;
    }
  }


  return {
    name,
    length,
    coordinates,
    hit,
    isSunk
  };
};


