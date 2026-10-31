import { Player } from "./battleship.js";
import { Dom } from "./dom.js";

// set up players and randomize the board
const playerOne = new Player("Mario", "human");
playerOne.gameboard.randomizeShipPlacement();

const playerTwo = new Player("Luigi", "computer");
playerTwo.gameboard.randomizeShipPlacement();

// set up player turns
let currentPlayer = playerOne;
let enemyPlayer = playerTwo;

function switchTurns() {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
    enemyPlayer = playerOne;
  } else {
    currentPlayer = playerOne;
    enemyPlayer = playerTwo;
  }
}

function playComputerMove() {
  if (currentPlayer.type !== "computer") return;

  // helper function to generate and verify the computer has not played the same random coordinates before
  function generateAndCheckCoordinates() {
    const randomNumber = () => Math.floor(Math.random() * 10);
    let x = randomNumber();
    let y = randomNumber();
    if (
      enemyPlayer.gameboard.tiles[y][x] === 2 ||
      enemyPlayer.gameboard.tiles[y][x] === 1
    ) {
      return false;
    } else {
      return [x, y];
    }
  }
  // keep getting coordinates if they have been played
  let targetCoordinates = generateAndCheckCoordinates();
  while (!targetCoordinates) targetCoordinates = generateAndCheckCoordinates();
  playTurn(targetCoordinates[0], targetCoordinates[1]);
}

function checkForWinner() {
  if (playerOne.gameboard.allShipsSunk()) return playerTwo;
  if (playerTwo.gameboard.allShipsSunk()) return playerOne;
  return false;
}

// main game function
export function playTurn(x, y) {
  enemyPlayer.gameboard.receiveAttack(x, y);
  dom.renderEnemyBoard();
  dom.renderPlayerBoard();

  const winner = checkForWinner();
  if (winner) {
    console.log(winner.name);
    return;
  }
  switchTurns();
  playComputerMove();
}

// set up DOM and render
const dom = new Dom(playerOne, playerTwo);
dom.renderPlayerBoard();
dom.renderEnemyBoard();
