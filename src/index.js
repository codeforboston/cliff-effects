import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './styles/dev.css';
import { App } from './App';
import { registerServiceWorker } from './utils/registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<App />, document.getElementById(`root`));
registerServiceWorker();
