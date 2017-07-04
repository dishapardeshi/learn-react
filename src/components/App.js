import React from 'react';

import { Header } from './Header';
import { Order } from './Order';
import { Inventory } from './Inventory';
import { Fish } from './Fish';

import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      fishes: {},
      order: {}
    }

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
  }

  componentWillMount() {
    const storeId = this.props.match.params["storeId"];
    console.log('In componentWillMount with storeid '+storeId);
    this.ref = base.syncState(`${storeId}/fishes`,
    {
      context: this,
      state: 'fishes'
    });
  }

  addFish(fish){
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();

    fishes[`fish-${timestamp}`] = fish;

    //set state
    this.setState({ fishes: fishes });
  }

  loadSamples(){
    console.log('Loading Samples !!!');
    console.log({sampleFishes});
    this.setState({ fishes: sampleFishes });
  }

  addToOrder(key) {
    console.log('add to Order');
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({order: order});
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
              .keys(this.state.fishes)
              .map( key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    );
  }

}

export default App;
