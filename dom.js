class Dom {
  constructor(playerOne, playerTwo) {
    this.playerBoard = document.querySelector(".player-board");
    this.opponentBoard = document.querySelector(".opponent-board");
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }
  renderPlayerBoard() {
    let playerTiles = this.playerOne.gameboard.tiles;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const tile = document.createElement("div");
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
    let enemyTiles = this.playerTwo.gameboard.tiles;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const tile = document.createElement("div");
        if (typeof enemyTiles[y][x] === "object") tile.classList.add("tile");
        else if (enemyTiles[y][x] === 0) tile.classList.add("tile");
        else if (enemyTiles[y][x] === 1) tile.classList.add("tile-miss");
        else if (enemyTiles[y][x] === 2) tile.classList.add("tile-hit");

        tile.dataset.x = x;
        tile.dataset.y = y;
        this.opponentBoard.appendChild(tile);
      }
    }
  }
}

export { Dom };
