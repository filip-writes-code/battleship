class Ship {
  constructor(size) {
    this.size = size;
    this.timesHit = 0;
  }

  hit() {
    this.timesHit += 1;
  }

  isSunk() {
    if (this.timesHit === this.size) return true;
    else return false;
  }
}

class Gameboard {
  constructor() {
    // initializes a 10x10 gameboard
    // the gameboard is represented by 10 arrays with 10 values
    this.tiles = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => 0),
    );
  }

  placeShip(x, y, ship, direction) {
    let shipSize = ship.size;

    if (direction === "horizontal") {
      while (shipSize > 0) {
        this.tiles[y][x] = ship;
        x++;
        shipSize--;
      }
    }
  }
}

export { Ship, Gameboard };
