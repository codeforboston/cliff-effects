import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import localforage from 'localforage';

import { Confirmer } from './utils/getUserConfirmation';

// CUSTOM COMPONENTS
import { HomePage } from './containers/HomePage';
import { AboutPage } from './containers/AboutPage';
import { VisitPage } from './containers/VisitPage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

// Development HUD
import { DevSwitch } from './containers/DevSwitch';
import { DevHud } from './components/dev/DevHud';
import {
  printSummaryToConsole,
  addClientGetterProperty,
  addEnableDevProperty,
} from './dev/command-line-utils';

// Object Manipulation
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { CLIENT_DEFAULTS } from './utils/CLIENT_DEFAULTS';

// LOCALIZATION
import { getTextForLanguage } from './utils/getTextForLanguage';


const DEV_PROPS_STORAGE_KEY          = `cliffEffectsDevProps`,
      LOADED_CLIENT_STORAGE_KEY      = `cliffEffects_loadedClient`,
      CLIENT_LAST_LOADED_STORAGE_KEY = `cliffEffects_clientLastLoaded`,
      // Time-to-live for stored client data, in milliseconds
      STORED_CLIENT_TTL              = 1000 * 60 * 60 * 24; // 1 day

/**
 * Main top-level component of the app. Contains the router that controls access
 *     to the {@link HomePage}, {@link VisitPage}, and {@link AboutPage}, as well
 *     as providing the common {@link Header} and {@link Footer} to these pages.
 *     It also manages the {@link DevHud}, which provides debugging and analysis
 *     options for developers.
 *
 * You can change the HashRouter tags (below if you are viewing this comment in
 *     the source code) to Router tags to turn off hash routing. Hash routing is
 *     only used to be compatible with GitHub Pages.
 *
 * Sends in the initial client values from {@link CLIENT_DEFAULTS} to
 *     {@link VisitPage}.
 *
 * @extends React.Component
 */
class App extends Component {
  constructor (props) {
    super(props);

    let defaults = cloneDeep(CLIENT_DEFAULTS);

    /**
     *  React state.
     *  @property {string} langCode - [ISO 639-1 code]{@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes} of currently selected language
     *  @property {object} translations - text translations in the current language (output of {@link getTextForLanguage})
     *  @property {object} clients  - sets of client data to keep track of:
     *  @property {object} clients.default - default set, never changes
     *  @property {object} clients.loaded  - set that has been loaded using the dev HUD
     *  @property {object} devProps - dev HUD settings. They get added as classes to the div that encloses the whole app. May want to rethink.
     *  @property {boolean} devProps.dev - whether dev HUD is turned on
     *  @property {boolean} devProps.english - whether to highlight English translations
     *  @property {boolean} devProps.nonEnglish - whether to highlight translations in the current language, if that language is not English
     *  @property {boolean} distrustConfirmed - displays modal to accept terms before allowing user to fill out form
     */
    this.state = {
      langCode:     `en`,
      translations: getTextForLanguage(`en`),
      clients:      {
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
        warningOff: true,
      },
      distrustConfirmed: false,
    };
  };  // Ends constructor()

  componentDidMount() {
    // Webpack should remove this whole conditional when not built for development environment
    if (process.env.NODE_ENV === `development`) {
      Promise.all([
        localforage.getItem(DEV_PROPS_STORAGE_KEY),
        localforage.getItem(CLIENT_LAST_LOADED_STORAGE_KEY),
        localforage.getItem(LOADED_CLIENT_STORAGE_KEY),
      ]).then(([
        localDev,
        clientLastLoaded,
        loadedClient, 
      ]) => {
        if (localDev) {
          this.setState((prevState) => {
            const now = Date.now();

            clientLastLoaded = clientLastLoaded || 0;

            let state = merge({}, prevState, { devProps: localDev });

            // This will clear out a loaded client from local storage
            // if it's been there too long--this is for security purposes,
            // as the loaded client could potentially have sensitive client
            // data and we want to minimize exposure of that info.
            if (now - clientLastLoaded >= STORED_CLIENT_TTL) {
              localforage.removeItem(LOADED_CLIENT_STORAGE_KEY);
              localforage.removeItem(CLIENT_LAST_LOADED_STORAGE_KEY);
            } else {
              state.clients.loaded = loadedClient;
            }

            return state;
          });  // ends setState
        }  // ends if localDev
      });  // ends Promise

      printSummaryToConsole();

      addEnableDevProperty(() => {
        return this.setDev(`dev`, true);
      });

      addClientGetterProperty(() => {
        return this.state.clients.loaded;
      });
    } // ends if in development environment
  };  // Ends componentDidMount()

  /**
   * Set the human language of the app (i.e. the language in which the UI will
   *     display text for users to read, NOT the coding language).
   * @method
   * @param {object} evnt - The event object from an input that uses this event handler (not used)
   * @param {object} inputProps - An object representing the properties of the Semantic UI React input component which triggered the language change.
   * @param {string} inputProps.value - the [ISO 639-1 code]{@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes} for the newly selected language.
  */
  setLanguage = (evnt, inputProps) => {
    let translations = getTextForLanguage(inputProps.value);
    this.setState({ language: inputProps.value, translations: translations });
  };

  /** Set the value of a specified key in the app state's devProps.
   *     These keys should only be set to boolean values (@todo enforce only allowing boolean values?).
   *     Keys with a value of true are added as classes to the app's main element when it is rendered.
   * @method
   * @param {string} key - The key whose value is to be changed in the app state's devProps
   * @param {boolean} value - The value to be set for the given key in the app state's devProps
   */
  setDev = (key, value) => {
    this.setState((prevState) => {

      let props = prevState.devProps;
      if (props[ key ] !== value) {
        let newProps = { ...props, [ key ]: value };

        if (process.env.NODE_ENV === `development`) {
          localforage.setItem(DEV_PROPS_STORAGE_KEY, newProps);
        }

        return { devProps: newProps };
      }
    });
  };

  /** Load an individual client's data. Currently, the only source of client
   *     data to load is a text input field in the Dev HUD.
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

      if (process.env.NODE_ENV === `development`) {
        localforage.setItem(CLIENT_LAST_LOADED_STORAGE_KEY, Date.now());
        localforage.setItem(LOADED_CLIENT_STORAGE_KEY, newData);
      }

      return { clients: { ...clients, loaded: newData }};
    });
  };

  /** Concatenate the true boolean values in input object to a space-delimited
   *     string, for use as a CSS class string. Currently used to convert
   *     [devProps]{@link App#state} to classes for the rendered `div`.
   * @method
   * @param {object} obj - the object to be converted to a string
   * @returns {string} a string constructed by concatenating together the keys
   *     of obj with values equal to true, separated by spaces.
   */
  propsToClasses (obj) {
    let classes = ``;
    for (let key in obj) {
      if (obj[ key ] === true) {
        classes += ` ` + key;
      }
    }
    return classes;
  };

  /** Toggles distrustConfirmed flag in app state.  Passed to PredictionsWarning modal
   *     which calls this in the onClose handler.  App is unavailable until terms 
   *     are accepted unless warningOff is set to true in DevHud.
   * @method
   */
  toggleDistrustConfirmed = () => {
    let userDistrusts = this.state.distrustConfirmed;
    this.setState({ distrustConfirmed: !userDistrusts });
  };

  // @todo I think we can remove langCode from translations now
  render () {
    let {
      langCode,
      translations,
      devProps,
      clients,
      distrustConfirmed,
    } = this.state;

    let { warningOff } = devProps;

    let confirmer = new Confirmer(),  // Makes sure user doesn't accidentally lose work
        classes   = this.propsToClasses(devProps),
        devFuncs  = {
          setDev:      this.setDev,
          loadClient:  this.loadClient,
          setLanguage: this.setLanguage,
        },
        funcs      = { toggleDistrustConfirmed: this.toggleDistrustConfirmed },
        clientData = clients.loaded;

    return (
      <div
        id = { `App` }
        className = { classes }>
        <Helmet>
          <html lang={ langCode } />
        </Helmet>

        <HashRouter getUserConfirmation={ confirmer.getConfirmation }>
          <div id={ `HashRouter` }>
            <Route
              path      = { `/:rest+` }
              component = { (props) => { return (
                <Header
                  { ...props }
                  translations = {{ ...translations.header, langCode: translations.langCode }} />
              );} } />

            <Switch>
              <Route
                exact
                path      = { `/` }
                component = { (props) => { return (
                  <HomePage
                    { ...props }
                    translations = {{ ...translations.homePage, langCode: translations.langCode }} />
                );} } />
              <Route
                path      = { `/about` }
                component = { (props) => { return (
                  <AboutPage
                    { ...props }
                    translations = {{ ...translations.aboutPage, langCode: translations.langCode }} />
                );} } />
              <Route
                path      = { `/visit/:clientId/:visitId/:stepKey?` }
                component = { ({ match, history, ...props }) => {
                  const { clientId, visitId, stepKey } = match.params;

                  return (
                    <VisitPage
                      { ...props }
                      history           = { history }
                      clientId          = { clientId }
                      visitId           = { visitId }
                      stepKey           = { stepKey }
                      distrustConfirmed = { distrustConfirmed || warningOff }
                      funcs             = { funcs }
                      confirmer         = { confirmer }
                      translations      = {{ ...translations.visitPage, langCode: translations.langCode }}
                      clientData        = { clientData } />
                  );
                } } />

              {/* For managing our development HUD */}
              <Route
                path      = { `/dev` }
                component = { (props) => { return (
                  <DevSwitch
                    { ...props }
                    setDev   = { this.setDev }
                    devProps = { devProps } />
                );} } />
            </Switch>

          </div>
        </HashRouter>
        <Footer translations={{ ...translations.footer, langCode: translations.langCode }} />

        { (devProps.dev === true) ? (
          <DevHud
            devProps = { devProps }
            funcs    = { devFuncs }
            data     = {{ default: clients.default }}
            state    = { this.state } />
        ) : (
          null
        ) }
      </div>
    );
  };  // Ends render()
};  // Ends <App>


export { App };
