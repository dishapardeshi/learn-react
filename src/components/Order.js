import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types';

import {formatPrice} from '../helpers';

export class Order extends Component {

  constructor(){
    super()
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key){
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={ () => this.props.removeFromOrder(key)}>&times;</button>;
    if( !fish || fish.status === 'unavailable'){
      return (<li key={key}>Sorry, {fish ? fish.name : 'Fish'} is no longer available! {removeButton}</li>)
    }
    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            className="count"
            transitionName="count"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
          <span key={count}>{count} </span>
          </CSSTransitionGroup>
          lbs {fish.name} {removeButton}</span>
        <span className="price">{formatPrice(fish.price * count)}</span>
      </li>
    );
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds
      .reduce((prevTotal, key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        if(isAvailable){
          return prevTotal + (count * fish.price || 0);
        }
        return prevTotal;
    },0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
          <ul className="order">

            <CSSTransitionGroup
              className="order"
              transitionName="order"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              { orderIds.map(this.renderOrder) }
            </CSSTransitionGroup>

            <li key="total" className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
            </li>
          </ul>
      </div>
    );
  }
}

Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  removeFromOrder: PropTypes.func.isRequired
}
