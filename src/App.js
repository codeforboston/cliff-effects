import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Confirmer } from './utils/getUserConfirmation';

// CUSTOM COMPONENTS
import HomePage from './containers/HomePage';
import AboutPage from './containers/AboutPage';
import VisitPage from './containers/VisitPage';
import Footer from './components/Footer';
import Header from './components/Header';
// sort of a component
import { renderIfTrue } from './components/renderIfTrue';

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

    // Development variables are the only things stored
    var localDev = localStorage.getItem(`cliffEffectsDevProps`);
    if (typeof localDev !== `string`) {
      localDev = {};
    } else {
      localDev = JSON.parse(localDev);
    }

    this.state = {
      langCode: `en`,
      snippets: getTextForLanguage(`en`),
      clients:  {
        default: defaults,
        loaded:  defaults,
      },
      // All these should be bools. For now, at least.
      // They get added as classes. May want to rethink.
      devProps: {
        dev:        false,
        english:    true,
        nonEnglish: true,
        loadClient: true,
        ...localDev,
      },
    };
  };  // End constructor()

  setLanguage = (evnt, inputProps) => {
    var snippets = getTextForLanguage(inputProps.value);
    this.setState({ language: inputProps.value, snippets: snippets });
  };

  setDev = (key, value) => {
    this.setState((prevState) => {

      var props = prevState.devProps;
      if (props[ key ] !== value) {

        var newProps = { ...props, [ key ]: value };
        localStorage.setItem(`cliffEffectsDevProps`, JSON.stringify(newProps));

        return { devProps: newProps };
      }
    });
  };  // End setDev()

  loadClient = ({ toLoad }) => {
    this.setState((prevState) => {

      const clients  = cloneDeep(prevState.clients),
            defaults = cloneDeep(clients.default),
            newData  = Object.assign(defaults, toLoad);

      return { clients: { ...clients, loaded: newData }};
    });
  };  // End loadClient()

  propsToClasses (obj) {
    var classes = ``;
    for (let key in obj) {
      if (obj[ key ] === true) {
        classes += ` ` + key;
      }
    }
    return classes;
  };  // End propsToClasses()

  render () {
    var {
      langCode,
      snippets,
      devProps,
      clients,
    } = this.state;

    var confirmer = new Confirmer(),  // Makes sure user doesn't accidentally lose work
        classes   = this.propsToClasses(devProps),
        devFuncs  = {
          setDev:      this.setDev,
          loadClient:  this.loadClient,
          setLanguage: this.setLanguage,
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

            <Switch>
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

              {/* For managing our development HUD */}
              <Route
                path = { `/dev` }
                component={ (props) => { return (
                  <DevSwitch
                    { ...props }
                    setDev   = { this.setDev }
                    devProps = { devProps } />
                );} } />
            </Switch>

          </div>
        </HashRouter>
        <Footer snippets={{ ...snippets.footer, langCode: snippets.langCode }} />

        { renderIfTrue(devProps.dev === true, (
          <DevHud
            devProps = { devProps }
            funcs    = { devFuncs }
            data     = {{ default: clients.default }}
            state    = { this.state } />
        ))}

      </div>
    );
  };  // End render()
}


export default App;
