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
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
  }

  componentWillMount() {
    const storeId = this.props.match.params["storeId"];
    console.log('In componentWillMount with storeid '+storeId);
    this.ref = base.syncState(`${storeId}/fishes`,
    {
      context: this,
      state: 'fishes'
    });

    const localStorageRef = localStorage.getItem(`item-${this.props.match.params['storeId'] }`);

    if(localStorageRef){
      this.setState({
        order : JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
    console.log({nextProps,nextState});
    localStorage.setItem(`item-${this.props.match.params['storeId'] }`,
      JSON.stringify(nextState.order));
  }


  addFish(fish){
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();

    fishes[`fish-${timestamp}`] = fish;

    //set state
    this.setState({ fishes: fishes });
  }

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish
    this.setState({ fishes: fishes });
  }

  removeFish(key){
    const fishes = {...this.state.fishes};
    fishes[key] = null;
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
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.match.params} />
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          />
      </div>
    );
  }

}

export default App;
