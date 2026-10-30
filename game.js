import { Player, Ship } from "./battleship.js";
import { Dom } from "./dom.js";

// set up players
const playerOne = new Player("Mario", "human");
playerOne.gameboard.placeShip(3, 2, new Ship(3), "vertical");

const playerTwo = new Player("Luigi", "computer");
playerTwo.gameboard.placeShip(2, 7, new Ship(3), "horizontal");

// set up player turns
let currentPlayer = playerOne;

function switchTurns() {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
  } else {
    currentPlayer = playerOne;
  }
}

// set up DOM and render
const dom = new Dom(playerOne, playerTwo);
dom.renderPlayerBoard();
dom.renderEnemyBoard();
