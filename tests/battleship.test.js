import { Ship, Gameboard } from "../battleship";

describe("Ship tests", () => {
  it("Creates a ship object", () => {
    let testShip = new Ship(3);
    expect(testShip.size).toBe(3);
  });

  test("hit() and isSunk() functionality", () => {
    let testShip = new Ship(2);
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });
});

describe("Gameboard tests", () => {
  it("Creates empty gameboard tiles", () => {
    let gameboard = new Gameboard();
    expect(gameboard.tiles).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("Places small (1) ships", () => {
    let gameboard = new Gameboard();
    let testShip = new Ship(1);
    gameboard.placeShip(0, 1, testShip);
    expect(gameboard.tiles).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [testShip, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});
