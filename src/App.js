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

/** App component; main top-level component of the app.
 * You can hange the HashRouter tags in the App class declaration (below if you are viewing this comment in the source code) to Router tags to turn off hash routing; only used to be compatible with GitHub Pages.
 * The App component also manages the Dev HUD.
 * The App component also manages the header and footer that appear on every page except the home page.
 * The App component sends in the initial client values */
class App extends Component {
  /**
   * Create App component instance.
   * @techExpertisePlease @knod referenced some [confusing state property handling](https://github.com/codeforboston/cliff-effects/pull/736#discussion_r215761120), anyone with the know-how wanna tackle explaining that?
   * @param {object} props - React props passed to the App component. These props are only used in the `super(props)` call, and not in the rest of the function.
   */
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

  /** Set the language of the app
   * @param {object} evnt - An event object, which is not actually used in the function but is passed in by Semantic UI React input components
   * @param {object} inputProps - An object representing the properties of the Semantic UI React input component which triggered the language change
  */
  setLanguage = (evnt, inputProps) => {
    var snippets = getTextForLanguage(inputProps.value);
    this.setState({ language: inputProps.value, snippets: snippets });
  };

  /** Set the value of a specified key in the app state's devProps
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

  /** Load an individual client's data @techExpertisePlease from what source? Where does toLoad come from?
   * @param {object} toLoad - An object representing the client data to be loaded @techExpertisePlease does this have a specific shape? Or format (ie is it JSON or something?)
   */
  loadClient = ({ toLoad }) => {
    this.setState((prevState) => {

      const clients  = cloneDeep(prevState.clients),
            defaults = cloneDeep(clients.default),
            newData  = Object.assign(defaults, toLoad);

      return { clients: { ...clients, loaded: newData }};
    });
  };  // End loadClient()

  /** Convert an object (ie devProps object) to a... string? @techExpertisePlease not too familiar with backticks and template literals... is this a string being created? Or a template? Or something else?
   * @param {object} - the object to be converted to a... string? @techExpertisePlease not too familiar with backticks and template literals... is this a string being created? Or a template? Or something else?
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

  /** Render the App component */
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
