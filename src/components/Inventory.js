import React, { Component } from 'react';

import { AddFishForm } from './AddFishForm';

export class Inventory extends Component {
  render() {
    return (
      <div>
        <p>Inventory</p>
        <AddFishForm addFish={this.props.addFish}/>
      </div>
    );
  }
}
