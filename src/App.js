import React from 'react';
import {
  HashRouter,
  Route
} from 'react-router-dom'
import HomePage from './homePage'
import AboutPage from './aboutPage'
// import LoginPage from './loginPage'
import VisitPage from './visitPage'
import ClientDetailPage from './clientDetailPage'
import ClientIntakePage from './clientIntakePage'

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
