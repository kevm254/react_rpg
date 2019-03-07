import React, { Component } from "react";
import ItemStyles from "./Item.styles";

export default class Item extends Component {
  getItem(number) {
    switch (number) {
      case 1:
        return "./img/items/key.png";
    }
  }

  render() {
    return (
      <div style={ItemStyles.getItemContainerStyles()}>
        {this.props.tileNo === 0 ? null : (
          <img src={this.getItem(this.props.itemNo)} />
        )}
      </div>
    );
  }
}
