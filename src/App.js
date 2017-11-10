import React from 'react';
import {
  HashRouter,
  Route
} from 'react-router-dom'

import HomePage from './containers/HomePage'
import AboutPage from './containers/AboutPage'
// import LoginPage from './loginPage'
import VisitPage from './containers/VisitPage'
import ClientDetailPage from './containers/ClientDetailPage'
import ClientIntakePage from './containers/ClientIntakePage'

// Change HashRouter tags below to Router tags to turn off hash routing; only used to be compatible with GitHub Pages

class App extends React.Component {
  state = {loggedIn: false}
  render() {
    return(
  <HashRouter>
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route path="/about" component={AboutPage}/>
      {/*<Route path="/login" component={LoginPage}/>*/}
      <Route path="/visit/:clientId/:visitId" component={VisitPage}/>
      <Route path="/detail/:id" component={ClientDetailPage}/>
      <Route path="/intake" component={ClientIntakePage}/>
    </div>
  </HashRouter>)
  }
}

export default App;
