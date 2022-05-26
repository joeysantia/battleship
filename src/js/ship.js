export const ship = (length, majorAxis, headCoordinate) => {
  let coordinates = [];
  let isSunk = false;

  function addCoordinate(xCoordinate, yCoordinate) {
    coordinates.push({
      xAxis: xCoordinate,
      yAxis: yCoordinate,
      isHit: false,
    });
  }

  addCoordinate(headCoordinate.xAxis, headCoordinate.yAxis);

  for (let i = 1; i < length; i++) {
    if (majorAxis === "x-axis") {
      let nextLetter = String.fromCharCode(
        headCoordinate.xAxis.charCodeAt(0) + i
      );
      addCoordinate(nextLetter, headCoordinate.yAxis);
    } else {
      addCoordinate(headCoordinate.xAxis, headCoordinate.yAxis - i);
    }
  }

  function hit(coordinate) {
    let hitCoordinateIndex = coordinates.findIndex((target) => {
      return (
        target.xAxis === coordinate.xAxis && target.yAxis === coordinate.yAxis
      );
    });
    coordinates[hitCoordinateIndex].isHit = true;
  }

  function sink() {
    if (coordinates.every((coordinate) => !!coordinate.isHit)) {
      this.isSunk = true;
    }
  }

  function getStatus() {
    return {
      coordinates: this.coordinates,
      isSunk: this.isSunk,
    };
  }


  return {
    coordinates, //revisit - see below (and don't use in tests!)
    hit,
    sink,
    getStatus,
    isSunk //revisit - might be a better way to accomplish this. I smell refactoring!
  };
};
