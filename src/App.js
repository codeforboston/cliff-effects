import React from 'react';
import {
  HashRouter,
  Route,
} from 'react-router-dom'

import HomePage from './containers/HomePage'
import AboutPage from './containers/AboutPage'
import VisitPage from './containers/VisitPage'

import Footer from './components/Footer'
import Header from './components/Header'


// Change HashRouter tags below to Router tags to turn off hash routing; only used to be compatible with GitHub Pages
const App = () => (
  <div id='App'>
    <HashRouter>
      <div id='HashRouter'>
        <Route path="/:rest+" component={Header}/>
        <Route exact path="/" component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/visit/:clientId/:visitId" component={VisitPage}/>

      </div>
    </HashRouter>
    <Footer />
  </div>
)

export default App;
