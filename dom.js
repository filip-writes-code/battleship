import { playTurn } from "./game.js";

class Dom {
  constructor(playerOne, playerTwo) {
    this.playerBoard = document.querySelector(".player-board");
    this.opponentBoard = document.querySelector(".opponent-board");
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }
  renderPlayerBoard() {
    // clear the board before rendering
    this.playerBoard.replaceChildren();

    let playerTiles = this.playerOne.gameboard.tiles;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const tile = document.createElement("button");
        if (typeof playerTiles[y][x] === "object")
          tile.classList.add("tile-ship");
        else if (playerTiles[y][x] === 0) tile.classList.add("tile");
        else if (playerTiles[y][x] === 1) tile.classList.add("tile-miss");
        else if (playerTiles[y][x] === 2) tile.classList.add("tile-hit");

        tile.dataset.x = x;
        tile.dataset.y = y;

        this.playerBoard.appendChild(tile);
      }
    }
  }

  renderEnemyBoard() {
    // clear the board before rendering
    this.opponentBoard.replaceChildren();

    let enemyTiles = this.playerTwo.gameboard.tiles;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const tile = document.createElement("button");
        if (typeof enemyTiles[y][x] === "object") tile.classList.add("tile");
        else if (enemyTiles[y][x] === 0) tile.classList.add("tile");
        else if (enemyTiles[y][x] === 1) tile.classList.add("tile-miss");
        else if (enemyTiles[y][x] === 2) tile.classList.add("tile-hit");

        tile.dataset.x = x;
        tile.dataset.y = y;

        tile.addEventListener("click", () => {
          playTurn(x, y);
        });

        this.opponentBoard.appendChild(tile);
      }
    }
  }

  toggleEnemyBoard() {
    let enemyBoard = document.querySelector(".opponent-board");
    enemyBoard.disabled = true;
  }
}

export { Dom };
