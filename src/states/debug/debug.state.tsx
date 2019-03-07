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
      itemsMatrix: "hi",
      events: [],
      showObstructions: true,
      playerPos: null,
      updatePlayerHP: 0,
      playerHP: { current: 2, max: 2 },
      gameOver: false,
      playerTop: 0,
      playerLeft: 0,
      currentEvent: null
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
  }

  initMaps() {
    this.lightMap = LevelData.getLightMapData();
    this.obstructionMap = LevelData.getObstructionMap();
    this.damageMap = LevelData.getDamageMap();
  }

  // LIFE -CYCLE METHODS /////////////
  componentWillMount() {
    let tiles = this.renderTileRow(LevelData.getTileData(), this.state);
    this.setState({ tiles: tiles });

    let tiles2 = this.renderTileRow(LevelData.getTileData2(), this.state);
    this.setState({ tiles2: tiles2 });

    let items = this.renderItemRow(LevelData.getItemMapData(), this.state);
    this.setState({ items: items });

    this.initEventLayer(LevelData.getEventMap());
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
      // alert(" you received the key!");

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
      this.setState({ items: items });
    }
  }

  initEventLayer(layer: any) {
    this.setState({ events: layer });
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
              showBorder={false}
              brightness={this.lightMap[currentRow][i]}
              showObsLayer={
                state.showObstructions ? this.obstructionMap[currentRow][i] : 0
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

  displayPlayer() {
    return (
      <Player
        playerOffset={{ x: 0, y: 0 }}
        obstructionMap={this.obstructionMap}
        updatePlayerPos={this.updatePlayerPos}
        checkForDamage={this.checkForDamage}
        checkForEvent={this.checkForEvent}
        resetDamage={this.resetDamage}
        updatePlayerHP={this.state.updatePlayerHP}
        showGameOver={this.showGameOver}
      />
    );
  }

  showTitle() {
    return <h1>Debug Screen</h1>;
  }

  renderTileLayers(layers: any[]) {
    return layers.map((layer, idx) => {
      return (
        <div key={idx} style={{ position: "absolute", top: 0, left: 0 }}>
          {layer.map(row => {
            row.push(<br />);

            return row;
          })}
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
            {this.displayPlayer()}
            {this.renderUI(this.state)}
          </div>
        ) : (
          this.gameOver()
        )}
      </div>
    );
  }
}
