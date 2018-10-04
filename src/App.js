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

/**
 * Main top-level component of the app. Contains the router that controls access
 * to the {@link HomePage}, {@link VisitPage}, and {@link AboutPage}, as well
 * as providing the common {@link Header} and {@link Footer} to these pages.
 * It also manages the {@link DevHud}, which provides debugging and analysis
 * options for developers.
 *
 * You can change the HashRouter tags (below if you are viewing this comment in
 * the source code) to Router tags to turn off hash routing. Hash routing is
 * only used to be compatible with GitHub Pages.
 *
 * Sends in the initial client values from {@link CLIENT_DEFAULTS} to
 * {@link VisitPage}.
 *
 * @extends React.Component
 */
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

    /**
     *  React state.
     *  @property {string} langCode - [ISO 639-1 code]{@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes} of currently selected language
     *  @property {object} snippets - text snippets in the current language (output of {@link getTextForLanguage})
     *  @property {object} clients  - sets of client data to keep track of:
     *  @property {object} clients.default - default set, never changes
     *  @property {object} clients.loaded  - set that has been loaded using the dev HUD
     *  @property {object} devProps - dev HUD settings. They get added as classes to the div that encloses the whole app. May want to rethink.
     *  @property {boolean} devProps.dev - whether dev HUD is turned on
     *  @property {boolean} devProps.english - whether to highlight English snippets
     *  @property {boolean} devProps.nonEnglish - whether to highlight snippets in the current language, if that language is not English
     *  @property {boolean} termsAccepted=false - displays a modal until user accepts terms and conditions of the site (currently indicates this is a prototype)
     */
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
        devHidden:  false,
        english:    true,
        nonEnglish: true,
        ...localDev,
      },
    };
  };  // End constructor()

  /**
   * Set the human language of the app (i.e. the language in which the UI will
   * display text for users to read, NOT the coding language).
   * @method
   * @param {object} evnt - The event object from an input that uses this event handler (not used)
   * @param {object} inputProps - An object representing the properties of the Semantic UI React input component which triggered the language change.
   * @param {string} inputProps.value - the [ISO 639-1 code]{@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes} for the newly selected language.
  */
  setLanguage = (evnt, inputProps) => {
    var snippets = getTextForLanguage(inputProps.value);
    this.setState({ language: inputProps.value, snippets: snippets });
  };

  /** Set the value of a specified key in the app state's devProps.
   * These keys should only be set to boolean values (@todo enforce only allowing boolean values?).
   * Keys with a value of true are added as classes to the app's main element when it is rendered.
   * @method
   * @param {string} key - The key whose value is to be changed in the app state's devProps
   * @param {boolean} value - The value to be set for the given key in the app state's devProps
   */
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

  /** Load an individual client's data. Currently, the only source of client
   * data to load is a text input field in the Dev HUD.
   * @method
   * @param {object} params
   * @param {object} params.toLoad - A JSON object representing the client data
   * to be loaded. Must match the client data format (See
   * {@link CLIENT_DEFAULTS} for an example of the correct client data format)
   */
  loadClient = ({ toLoad }) => {
    this.setState((prevState) => {

      const clients  = cloneDeep(prevState.clients),
            defaults = cloneDeep(clients.default),
            newData  = Object.assign(defaults, toLoad);

      return { clients: { ...clients, loaded: newData }};
    });
  };  // End loadClient()

  /** Concatenate the true boolean values in input object to a space-delimited
   * string, for use as a CSS class string. Currently used to convert
   * [devProps]{@link App#state} to classes for the rendered `div`.
   * @method
   * @param {object} obj - the object to be converted to a string
   * @returns {string} a string constructed by concatenating together the keys
   * of obj with values equal to true, separated by spaces.
   */
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
