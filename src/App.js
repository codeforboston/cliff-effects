import React from 'react';
import {
  HashRouter,
  Route,
} from 'react-router-dom'
import {
  Switch,
} from 'react-router';

import HomePage from './containers/HomePage'
import AboutPage from './containers/AboutPage'
import VisitPage from './containers/VisitPage'

import Footer from './components/Footer'
import Header from './components/Header'


// COMPONENT HELPERS
const PathHeader = function ({ path }) {
  return (
    <Route path={ path } children={ function ({ location }) {
        return <Header path={ location.pathname } />;
    }}/>
  );
};


// Change HashRouter tags below to Router tags to turn off hash routing; only used to be compatible with GitHub Pages
class App extends React.Component {

  render() {

    var paths = { home: '/', about: '/about', visit: '/visit/:clientId/:visitId' }

    return(
      <div id='App'>
        <HashRouter>
          <div id='HashRouter'>

            <Switch>
              <PathHeader path={ paths.home } />
              <PathHeader path={ paths.about } />
              <PathHeader path={ paths.visit } />
            </Switch>

            <Route exact path={paths.home}  component={HomePage}/>
            <Route       path={paths.about} component={AboutPage}/>
            <Route       path={paths.visit} component={VisitPage}/>

          </div>
        </HashRouter>
        <Footer />
      </div>
    )
  }
}

export default App;
