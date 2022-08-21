export const ship = (name, majorAxis, headCoordinate) => {
  let coordinates = [];
  let isSunk = false;
  let length;

  const setCoordinates = (function() {
    addCoordinate(headCoordinate.xAxis, headCoordinate.yAxis);

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
      default:
        length = 3;
        break;
    }

    for (let i = 1; i < length; i++) {
      if (majorAxis === "x-axis") {
        let nextLetter = String.fromCharCode(
          headCoordinate.xAxis.charCodeAt(0) + i
        );
        addCoordinate(nextLetter, headCoordinate.yAxis);
      } else {
        addCoordinate(headCoordinate.xAxis, headCoordinate.yAxis + i);
      }
    }
  })()

  function addCoordinate(xCoordinate, yCoordinate) {
    coordinates.push({
      xAxis: xCoordinate,
      yAxis: yCoordinate,
      isHit: false,
    });
  }
  

  function hit(coordinate) {
    let hitCoordinateIndex = coordinates.findIndex((target) => {
      return (
        target.xAxis === coordinate.xAxis && 
        target.yAxis === coordinate.yAxis
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


