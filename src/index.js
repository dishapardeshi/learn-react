import React from 'react';
import {render} from 'react-dom';

import './css/style.css';

import registerServiceWorker from './registerServiceWorker';

class StorePicker extends React.Component {

  render(){
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }

}

render(<StorePicker />, document.getElementById('root'));

registerServiceWorker();
