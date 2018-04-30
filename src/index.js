import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import './index.css';
import App from './App';
import registerServiceWorker from './utils/registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import messages from './messages/en';

ReactDOM.render(
  <IntlProvider locale="en" messages={messages}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
registerServiceWorker();
