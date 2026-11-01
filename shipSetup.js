const boatSetupHtmlBlock = `<div class="boats-setup">
        <div class="boat-header">Place Your Fleet</div>
        <div class="boats-selector">
          <div
            class="ship-container"
            data-length="5"
            data-orientation="horizontal"
            draggable="true"
          >
            <div class="ship-tile" data-segment="0"></div>
            <div class="ship-tile" data-segment="1"></div>
            <div class="ship-tile" data-segment="2"></div>
            <div class="ship-tile" data-segment="3"></div>
            <div class="ship-tile" data-segment="4"></div>
          </div>
          <div
            class="ship-container"
            data-length="4"
            data-orientation="horizontal"
            draggable="true"
          >
            <div class="ship-tile" data-segment="0"></div>
            <div class="ship-tile" data-segment="1"></div>
            <div class="ship-tile" data-segment="2"></div>
            <div class="ship-tile" data-segment="3"></div>
          </div>
          <div
            class="ship-container"
            data-length="3"
            data-orientation="horizontal"
            draggable="true"
          >
            <div class="ship-tile" data-segment="0"></div>
            <div class="ship-tile" data-segment="1"></div>
            <div class="ship-tile" data-segment="2"></div>
          </div>
          <div
            class="ship-container"
            data-length="3"
            data-orientation="horizontal"
            draggable="true"
          >
            <div class="ship-tile" data-segment="0"></div>
            <div class="ship-tile" data-segment="1"></div>
            <div class="ship-tile" data-segment="2"></div>
          </div>
          <div
            class="ship-container"
            data-length="2"
            data-orientation="horizontal"
            draggable="true"
          >
            <div class="ship-tile" data-segment="0"></div>
            <div class="ship-tile" data-segment="1"></div>
          </div>
        </div>
        <div class="button-section">
          <button>Rotate Ships</button>
          <button id="randomize">Randomize Fleet!</button>
        </div>
      </div>`;

export { boatSetupHtmlBlock };
