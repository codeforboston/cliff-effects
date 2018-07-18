import React, { Component } from 'react';
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Confirmer } from './utils/getUserConfirmation';

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

    // Confirms user navigation
    var confirmer = new Confirmer();

    return (
      <div id='App'>
        <Helmet>
          <html lang={ snippets.langCode } />
        </Helmet>

        <HashRouter getUserConfirmation={ confirmer.getConfirmation }>
          <div id='HashRouter'>
            <Route
              path="/:rest+"
              component={ (props) => {
                return (
                  <Header
                    { ...props }
                    snippets={{ ...snippets.header, langCode: snippets.langCode }} />);
              } } />
            <Route
              exact
              path="/"
              component={ (props) => {
                return (
                  <HomePage
                    { ...props }
                    snippets={{ ...snippets.homePage, langCode: snippets.langCode }} />);
              } } />
            <Route
              path="/about"
              component={ (props) => {
                return (
                  <AboutPage
                    { ...props }
                    snippets={{ ...snippets.aboutPage, langCode: snippets.langCode }} />);
              } } />
            <Route
              path="/visit/:clientId/:visitId"
              component={ (props) => {
                return (
                  <VisitPage
                    { ...props }
                    confirmer = { confirmer }
                    snippets  = {{ ...snippets.visitPage, langCode: snippets.langCode }} />);
              } } />
            <Route
              path="/visit/load"
              component={ (props) => {
                return (
                  <VisitPage
                    { ...props }
                    confirmer = { confirmer }
                    snippets  = {{ ...snippets.visitPage, langCode: snippets.langCode }} />);
              } } />
            <Route
              path="/load"
              component={ (props) => {
                return (
                  <VisitPage
                    { ...props }
                    confirmer = { confirmer }
                    snippets  = {{ ...snippets.visitPage, langCode: snippets.langCode }} />);
              } } />
          </div>
        </HashRouter>
        <Footer snippets={{ ...snippets.footer, langCode: snippets.langCode }} />
      </div>
    );
  }
}

export default App;
