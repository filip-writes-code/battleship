import { Player, Ship, Gameboard } from "./battleship.js";

const playerOne = new Player("Mario", "human");
playerOne.gameboard.placeShip(3, 2, new Ship(3), "vertical");

const playerTwo = new Player("Luigi", "computer");
playerTwo.gameboard.placeShip(2, 7, new Ship(3), "horizontal");
