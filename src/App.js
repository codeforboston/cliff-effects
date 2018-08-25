import React, { Component } from 'react';
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Confirmer } from './utils/getUserConfirmation';

// CUSTOM COMPONENTS
import HomePage from './containers/HomePage';
import AboutPage from './containers/AboutPage';
import VisitPage from './containers/VisitPage';
import Footer from './components/Footer';
import Header from './components/Header';

// Development HUD
import { DevSwitch } from './containers/DevSwitch';
import { DevHud } from './components/dev/DevHud';
// Object Manipulation
import { cloneDeep } from 'lodash';
import { CLIENT_DEFAULTS } from './utils/CLIENT_DEFAULTS';

// LOCALIZATION
import { getTextForLanguage } from './utils/getTextForLanguage';

// Change HashRouter tags below to Router tags to turn off hash routing; only used to be compatible with GitHub Pages
class App extends Component {
  constructor (props) {
    super(props);

    var defaults = cloneDeep(CLIENT_DEFAULTS);

    this.state = {
      langCode: `de`,
      snippets: getTextForLanguage(`de`),
      devProps: {
        dev:        true,
        english:    true,
        nonEnglish: true,
        load:       true,
      },
      clients: {
        default: defaults,
        loaded:  defaults,
      },
      devData:    { defaultClient: defaults },
      // This data doesn't get updated from user inputs
      clientData: defaults,
    };
  }

  setLanguage = (inputProps) => {
    var snippets = getTextForLanguage(inputProps.value);
    this.setState({ language: inputProps.value, snippets: snippets });
  };

  setDevMode = (devMode) => {
    this.setState({ devMode: devMode });
  };

  setDev = (key, value) => {
    this.setState((prevState) => {
      var props = prevState.devProps;
      if (props[ key ] !== value) {
        var newProps = { ...props, [ key ]: value };
        return { devProps: newProps };
      }
    });
  };

  propsToClasses (obj) {
    var classes = ``;
    for (let key in obj) {
      if (obj[ key ] === true) {
        classes += ` ` + key;
      }
    }
    return classes;
  };  // End propsToClasses()

  loadClient = ({ toLoad }) => {
    this.setState((prevState) => {

      const clients  = cloneDeep(prevState.clients),
            defaults = cloneDeep(clients.default),
            newData  = Object.assign(defaults, toLoad);

      return { clients: { ...clients, loaded: newData }};
    });
  };

  render () {
    var {
      langCode,
      snippets,
      devProps,
      // devData,
      clients,
    } = this.state;

    // Confirms user navigation
    var confirmer = new Confirmer(),
        classes   = this.propsToClasses(devProps),
        devFuncs  = {
          setDev:     this.setDev,
          loadClient: this.loadClient,
        },
        clientData = clients.loaded;

    return (
      <div
        id = { `App` }
        className = { classes }>
        <Helmet>
          <html lang={ langCode } />
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
                    confirmer  = { confirmer }
                    snippets   = {{ ...snippets.visitPage, langCode: snippets.langCode }}
                    clientData = { clientData } />);
              } } />

            {/* Currently only works on published build */}
            <Route
              path="/docs"
              component={ () => {
                return (
                  <iframe
                    id="docsFrame"
                    title="Cliff Effects Docs"
                    src="/docs/index.html" />);
              } } />

            {/* For managing our development HUD */}
            <Route
              path = { `/dev` }
              component={ (props) => { return (
                <DevSwitch
                  { ...props }
                  setDev   = { this.setDev }
                  devProps = { devProps } />
              ); } } />

          </div>
        </HashRouter>
        <Footer snippets={{ ...snippets.footer, langCode: snippets.langCode }} />

        {
          devProps.dev ?
            <DevHud
              devProps = { devProps }
              funcs    = { devFuncs }
              data     = {{ default: clients.default }} />
            : null
        }

      </div>
    );
  }
}

export default App;
