import React, { Component } from "react";
import TextBox from "../../components/UI/TextBox/TextBox";
import Tile from "../../components/Tile/Tilemap/Tile.component";
import Item from "../../components/Item/Item.component";
import LifeDisplay from "../../components/UI/LifeDisplay/LifeDisplay.UI";
import DebugStyles from "./debug.styles";
import Player from "../../Models/Entities/Player/Player.entity";

import LevelData from "./level1";
import anime from "animejs";
import { Keys } from "../../Models/keys.model";

export default class DebugState extends Component {
  lightMap;
  obstructionMap;
  damageMap;

  // CONSTRUCTOR ///////////////
  constructor(props) {
    super(props);

    this.state = {
      selectedTile: null,
      tiles: [],
      tilesMatrix: [],
      tiles2: [],
      tiles2Matrix: [],
      items: [],
      itemsMatrix: [],
      obstructionsMatrix: [],
      events: [],
      showObstructions: true,
      playerPos: null,
      updatePlayerHP: 0,
      playerHP: { current: 2, max: 2 },
      gameOver: false,
      playerTop: 0,
      playerLeft: 0,
      currentEvent: null,
      inventory: { key: false },
      editPlayerPos: "",
      offsetX: 0,
      screenEdgeX: 0,
      screenEdgeY: 0
    };

    this.bindAll();
    this.initMaps();
  }

  bindAll() {
    this.restartGame = this.restartGame.bind(this);
    this.toggleObstructionMap = this.toggleObstructionMap.bind(this);
    this.updatePlayerPos = this.updatePlayerPos.bind(this);
    this.checkForDamage = this.checkForDamage.bind(this);
    this.checkForEvent = this.checkForEvent.bind(this);
    this.resetDamage = this.resetDamage.bind(this);
    this.showGameOver = this.showGameOver.bind(this);
    this.renderTileRow = this.renderTileRow.bind(this);
    this.initEventLayer = this.initEventLayer.bind(this);
    this.initMaps = this.initMaps.bind(this);
  }

  initMaps() {
    this.lightMap = LevelData.getLightMapData();
    this.obstructionMap = LevelData.getObstructionMap();
    this.damageMap = LevelData.getDamageMap();
  }

  // LIFE -CYCLE METHODS /////////////
  componentWillMount() {
    this.setState({ obstructionsMatrix: LevelData.getObstructionMap() }, () => {
      console.log("after update", this.state);
      let tiles = this.renderTileRow(LevelData.getTileData(), this.state);
      this.setState({ tilesMatrix: LevelData.getTileData() });
      this.setState({ tiles: tiles });
      let tiles2 = this.renderTileRow(LevelData.getTileData2(), this.state);
      this.setState({ tiles2Matrix: LevelData.getTileData2() });
      this.setState({ tiles2: tiles2 });

      let items = this.renderItemRow(LevelData.getItemMapData(), this.state);
      this.setState({ items: items });

      this.initEventLayer(LevelData.getEventMap());
    });
  }

  shiftScreen() {
    anime({
      targets: ".tile_hook",
      translateX: [0, -640],

      easing: "linear",
      duration: "2000"
    });
    anime({
      targets: ".player_hook",
      // opacity: [1, 0],
      translateX: [0, -576],

      duration: "1800",
      easing: "linear"
    });

    this.setState({ screenEdgeX: 10 });
    this.setState({ editPlayerPos: "PLUSX" });
    this.setState({ offsetX: 64 });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      // this.renderTileRow(this, this.state.tiles, this.state);
    }
  }

  // GENERAL METHODS ///////////////
  updatePlayerPos(pos: { x: number; y: number }) {
    this.setState({ playerPos: pos });
  }

  checkForDamage(playerPos) {
    if (this.damageMap[playerPos.y][playerPos.x] === 1) {
      this.setState({ updatePlayerHP: -5 });
      this.setState({ updatePlayerHP: 0 });
    }
  }

  checkForEvent() {
    let currEvent = this.state.events[this.state.playerPos.y][
      this.state.playerPos.x
    ];

    if (currEvent.toString() === "1") {
      // update items
      let arr = [
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];

      let items = this.renderItemRow(arr, this.state);
      // update items tile layer
      this.setState({ items: items });
      // add key to inventory
      this.updateInventory({ key: true });
    }
    if (currEvent.toString() === "2") {
      if (this.state.inventory.key === true) {
        let obstruction = this.updateMatrix(
          this.state.obstructionsMatrix,
          8,
          3,
          0
        );
        this.setState({ obstructionsMatrix: obstruction }, () => {
          let tiles = this.updateMatrix(this.state.tilesMatrix, 8, 3, 1);
          this.setState({ tilesMatrix: tiles });
          let updatedTiles = this.renderTileRow(
            this.state.tilesMatrix,
            this.state
          );

          this.setState({ tiles: updatedTiles });
        });
      }
    }

    if (currEvent.toString() === "3") {
      this.shiftScreen();
    }
  }

  updateMatrix(matrix, x, y, val) {
    let vals = [...matrix];

    vals[y][x] = val;
    return vals;
  }

  updateItemLayer(data: { pos: { x; y }; val: number }) {
    let currentState = this.state.items;
  }

  initEventLayer(layer: any) {
    this.setState({ events: layer });
  }

  updateInventory(newState) {
    this.setState({ inventory: newState });
  }

  resetDamage() {
    this.setState({ updatePlayerHP: 0 });
  }

  renderTileRow(dataSource: [], state: any) {
    let tileArray = [];

    dataSource.map((row: [], i) => {
      let currentRow = i;

      tileArray.push(
        row.map((item, i) => {
          return (
            <Tile
              tileNo={item}
              tilePos={{ x: i, y: currentRow }}
              showBorder={false}
              brightness={this.lightMap[currentRow][i]}
              showObsLayer={
                state.showObstructions
                  ? this.state.obstructionsMatrix[currentRow][i]
                  : 0
              }
            />
          );
        })
      );
    });
    return tileArray;
  }

  renderItemRow(dataSource: any[], state: any) {
    let tileArray = [];
    dataSource.map((row: [], i) => {
      let currentRow = i;

      tileArray.push(
        row.map((item, i) => {
          return (
            <Item
              itemNo={item}
              showBorder={false}
              brightness={this.lightMap[currentRow][i]}
            />
          );
        })
      );
    });
    return tileArray;
  }

  restartGame() {
    this.setState({ playerXPos: 0, playerYPos: 0, currentHP: 10 });
  }

  gameOver() {
    return (
      <div>
        <p>GAME OVER! You were burnt to a crisp...</p>
        <button onClick={this.restartGame}>Restart</button>
      </div>
    );
  }

  toggleObstructionMap() {
    this.setState({ showObstructions: !this.state.showObstructions });
  }

  showGameOver() {
    this.setState({ gameOver: true });
  }

  renderUI(state) {
    return (
      <div style={DebugStyles.getUIContainerStyles()}>
        <LifeDisplay />
      </div>
    );
  }

  displayPlayer(state) {
    return (
      <div class="player_hook">
        <Player
          playerOffset={{ x: 0, y: 0 }}
          obstructionMap={state.obstructionsMatrix}
          updatePlayerPos={this.updatePlayerPos}
          checkForDamage={this.checkForDamage}
          checkForEvent={this.checkForEvent}
          resetDamage={this.resetDamage}
          updatePlayerHP={state.updatePlayerHP}
          editPlayerPos={state.editPlayerPos}
          showGameOver={this.showGameOver}
          offsetX={this.state.offsetX}
          screenEdgeX={this.state.screenEdgeX}
          screenEdgeY={this.state.screenEdgeY}
        />
      </div>
    );
  }

  showTitle() {
    return <h1>Debug Screen</h1>;
  }

  renderTileLayers(layers: any[]) {
    return layers.map((layer, idx) => {
      return (
        <div key={idx} style={{ position: "absolute", top: 0, left: 0 }}>
          <div style={{ width: "640px", overflow: "hidden" }}>
            <div class="tile_hook" style={{ width: "1280px" }}>
              {layer.map(row => {
                row.push(<br />);
                return row;
              })}
            </div>
          </div>
        </div>
      );
    });
  }

  // RENDER ///////////////////
  render() {
    return (
      <div
        style={{
          backgroundColor: "#000000",
          color: "#FFFFFF"
        }}
        id="debug_container"
      >
        {this.showTitle()}
        <button onClick={this.toggleObstructionMap}>Toggle Obstructions</button>
        <div>{this.state.showObstructions.toString()}</div>
        <div>{JSON.stringify(this.state.playerPos)}</div>
        <div>CurrentEvent: {this.state.currentEvent}</div>

        {!this.state.gameOver ? (
          <div id="game_container" style={DebugStyles.getGameContainerStyles()}>
            {this.renderTileLayers([
              this.state.tiles,
              this.state.tiles2,
              this.state.items
            ])}

            {this.displayPlayer(this.state)}
            {this.renderUI(this.state)}
          </div>
        ) : (
          this.gameOver()
        )}
      </div>
    );
  }
}
