import React, { Component } from 'react';

export class Fish extends Component {
  render() {
    return (
      <li className="menu-fish">
        {this.props.details.name}
      </li>

    );
  }
}
