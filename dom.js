import { Ship } from "./battleship.js";
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

  renderPlayerSetupBoard() {
    // clear the board before rendering
    this.playerBoard.replaceChildren();

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
    // proof of concept
    const shipBlocks = document.querySelectorAll(".ship-container");
    let grabbedSegment;
    let length;
    let orientation;
    let shipHeadX;
    let shipHeadY;
    let draggedElement;

    shipBlocks.forEach((shipBlock) => {
      shipBlock.addEventListener("mousedown", (ev) => {
        grabbedSegment = ev.target.dataset.segment;
        // ev.target.parentElement.dataset.segment = grabbedSegment;
        console.log("Grabbed segment:", grabbedSegment);
      });

      shipBlock.addEventListener("dragstart", (ev) => {
        draggedElement = ev.target;
        // grabbedSegment = ev.target.dataset.segment;
        length = ev.target.dataset.length;
        orientation = ev.target.dataset.orientation;

        ev.dataTransfer.setData("text/length", length);
        ev.dataTransfer.setData("text/segment", grabbedSegment);
        ev.dataTransfer.setData("text/orientation", orientation);

        console.log("Drag segment", ev.dataTransfer.getData("text/segment"));
        console.log("Drag length:", ev.dataTransfer.getData("text/length"));
        console.log(
          "Drag length:",
          ev.dataTransfer.getData("text/orientation"),
        );
      });
    });

    // drag and drop ocuppied tiles
    function getOcuppyingTiles(
      targetTile,
      length,
      orientation,
      grabbedSegment,
    ) {
      const x = parseInt(targetTile.dataset.x);
      const y = parseInt(targetTile.dataset.y);
      const cells = [];

      const originX = orientation === "horizontal" ? x - grabbedSegment : x;
      const originY = orientation === "vertical" ? y - grabbedSegment : y;

      shipHeadX = originX;
      shipHeadY = originY;

      for (let i = 0; i < length; i++) {
        const occupiedX = orientation === "horizontal" ? originX + i : originX;
        const occupiedY = orientation === "vertical" ? originY + i : originY;
        if (
          occupiedY >= 0 &&
          occupiedY < 10 &&
          occupiedX >= 0 &&
          occupiedX < 10
        ) {
          const cellElement = document.querySelector(
            `[data-y="${occupiedY}"][data-x="${occupiedX}"]`,
          );
          cells.push(cellElement);
        } else {
          return null; // Out of bounds flag
        }
      }
      return cells;
    }

    //event listeners for drag and drop
    const availableTiles = document.querySelectorAll(".tile");
    availableTiles.forEach((tile) => {
      tile.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        const cell = ev.target;

        const tiles = getOcuppyingTiles(
          cell,
          length,
          orientation,
          grabbedSegment,
        );
        if (tiles) {
          tiles.forEach((tile) => {
            tile.classList.add("drag-over");
          });
        }
      });
    });

    //clears all hover effects
    function clearAllHoverEffects() {
      const allTiles = document.querySelectorAll(".tile");

      allTiles.forEach((tile) => {
        tile.classList.remove("drag-over");
      });
    }

    availableTiles.forEach((tile) => {
      tile.addEventListener("dragleave", () => {
        clearAllHoverEffects();
      });
    });

    availableTiles.forEach((tile) => {
      tile.addEventListener("drop", (ev) => {
        ev.preventDefault();
        clearAllHoverEffects();
        const data = ev.dataTransfer.getData("text/length");
        const success = this.playerOne.gameboard.placeShip(
          shipHeadX,
          shipHeadY,
          new Ship(length),
          orientation,
        );
        if (success) draggedElement.remove();
        this.renderPlayerSetupBoard();
      });
    });
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
        else if (enemyTiles[y][x] === 1) {
          tile.classList.add("tile-miss");
          tile.disabled = true;
        } else if (enemyTiles[y][x] === 2) {
          tile.classList.add("tile-hit");
          tile.disabled = true;
        }

        // not really needed
        // tile.dataset.x = x;
        // tile.dataset.y = y;

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
