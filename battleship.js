class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
  }

  hit() {
    this.timesHit += 1;
  }

  isSunk() {
    if (this.timesHit === this.length) return true;
    else return false;
  }
}

class Gameboard {
  constructor() {
    // row is an array of 10 values
    // the entire gameboard is 10x10
    const row = Array(10).fill(0);
    this.tiles = Array(10).fill(row);
  }
}

export { Ship, Gameboard };
