import React, { Component } from 'react';

import { AddFishForm } from './AddFishForm';

export class Inventory extends Component {

  constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key){
    const fish = this.props.fishes[key];
    console.log(e.target.name, e.target.value);
    const updatedFish = {
      ...fish,
      [e.target.name] : e.target.value
    }
    console.log(updatedFish);
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (<div className="fish-edit" key={key} >
      <input type="text" name="name"
        onChange={(e) => this.handleChange(e,key)} value={fish.name} placeholder="Fish Name" />
      <input type="text" name="price"
        onChange={(e) => this.handleChange(e,key)} value={fish.price} placeholder="Fish Price" />
      <select placeholder="Fish Status" name="status"
        onChange={(e) => this.handleChange(e,key)} value={fish.Status} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
      </select>
      <textarea type="text" name="desc"
        onChange={(e) => this.handleChange(e,key)} value={fish.desc} placeholder="Fish Desc"></textarea>
      <input type="text" name="image"
        onChange={(e) => this.handleChange(e,key)} value={fish.image} placeholder="Fish Image"/>

    </div>);
  }

  render() {
    return (
      <div>
        <p>Inventory</p>
        {
          Object
            .keys(this.props.fishes)
            .map(this.renderInventory)
        }
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}
