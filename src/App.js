import React, { Component } from 'react';
import {
  HashRouter,
  Route,
} from 'react-router-dom';

import getUserConfirmation from './utils/getUserConfirmation';

import HomePage from './containers/HomePage';
import AboutPage from './containers/AboutPage';
import VisitPage from './containers/VisitPage';

import Footer from './components/Footer';
import Header from './components/Header';

// LOCALIZATION
import { getTextForLanguage } from './utils/getTextForLanguage';


// Change HashRouter tags below to Router tags to turn off hash routing; only used to be compatible with GitHub Pages
class App extends Component {
  constructor (props) {
    super(props);
    this.state = { language: 'en', snippets: getTextForLanguage('en') };
  }

  setLanguage = (inputProps) => {
    var snippets = getTextForLanguage(inputProps.value);
    this.setState({ language: inputProps.value, snippets: snippets });
  };

  render () {
    var { snippets } = this.state;

    return (
      <div id='App'>
        <HashRouter getUserConfirmation={ getUserConfirmation }>
          <div id='HashRouter'>
            <Route
              path="/:rest+"
              component={ (props) => {
                return (
                  <Header
                    { ...props }
                    snippets={ snippets } />); 
              } } />
            <Route
              exact
              path="/"
              component={ (props) => {
                return (
                  <HomePage
                    { ...props }
                    snippets={ snippets } />); 
              } } />
            <Route
              path="/about"
              component={ (props) => {
                return (
                  <AboutPage
                    { ...props }
                    snippets={ snippets } />); 
              } } />
            <Route
              path="/visit/:clientId/:visitId"
              component={ (props) => {
                return (
                  <VisitPage
                    { ...props }
                    snippets={ snippets } />); 
              } } />
            <Route
              path="/visit/load"
              component={ (props) => {
                return (
                  <VisitPage
                    { ...props }
                    snippets={ snippets } />); 
              } } />
            <Route
              path="/load"
              component={ (props) => {
                return (
                  <VisitPage
                    { ...props }
                    snippets={ snippets } />); 
              } } />
          </div>
        </HashRouter>
        <Footer snippets={ snippets } />
      </div>
    );
  }
}

export default App;
