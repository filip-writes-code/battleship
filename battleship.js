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
    //array of ships on the gameboard
    this.ships = [];
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
    this.ships.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    // if it hits a ship, send the hit to the ship object
    // and replace it with a value of 2
    if (typeof this.tiles[y][x] === "object") {
      this.tiles[y][x].hit();
      this.tiles[y][x] = 2;
    } else this.tiles[y][x] = 1;
    // if it misses, replace with value 1
  }

  allShipsSunk() {
    if (this.ships.length === 0) return false;
    return this.ships.every((ship) => ship.isSunk());
  }
}

class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
  }
}

export { Ship, Gameboard };
