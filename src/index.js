import React from 'react';
import {render} from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './css/style.css';
import StorePicker from './components/StorePicker';

render(<StorePicker />, document.getElementById('root'));

registerServiceWorker();
