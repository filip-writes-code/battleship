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

    // make sure the tiles are clear for ship placement
    // and on the board, not outside of it
    if (direction === "horizontal") {
      for (let i = 0; i < shipSize; i++) {
        if (x + i >= 10 || typeof this.tiles[y][x + i] === "object")
          return false;
      }
      //if the tiles are clear, place the ship
      while (shipSize > 0) {
        this.tiles[y][x] = ship;
        x++;
        shipSize--;
      }
    }
    if (direction === "vertical") {
      for (let i = 0; i < shipSize; i++) {
        if (y + i >= 10 || typeof this.tiles[y + i][x] === "object")
          return false;
      }
      //if the tiles are clear, place the ship
      while (shipSize > 0) {
        this.tiles[y][x] = ship;
        y++;
        shipSize--;
      }
    }
    return true;
  }
}

export { Ship, Gameboard };
