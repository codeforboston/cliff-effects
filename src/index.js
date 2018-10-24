import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import './styles/dev.css';
import App from './containers/App';
import getStore from './store';
import registerServiceWorker from './utils/registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

const store = getStore();

ReactDOM.render(
  (
    <Provider store={ store }>
      <App />
    </Provider>
  )
  ,
  document.getElementById('root')
);
registerServiceWorker();
