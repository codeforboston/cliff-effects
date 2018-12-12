import React, { Component } from 'react';
import {
  Container,
  Responsive,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

// DATA MANAGEMENT
import { setNestedProperty } from '../utils/setNestedProperty';
import { cloneDeep } from 'lodash';
import { convertForUpdate } from '../utils/convertForUpdate';
import { addClientGetterProperty } from '../dev/command-line-utils';

// Data
import { CLIENT_DEFAULTS } from '../utils/CLIENT_DEFAULTS';

// Our Components
import { BrowserLeaveListener } from '../components/prompts/BrowserLeaveListener';
import { ReactRouterLeaveListener } from '../components/prompts/ReactRouterLeaveListener';
import { ErrorListener } from '../components/prompts/ErrorListener';
import { FeedbackPrompt } from '../components/prompts/FeedbackPrompt';
import { FeedbackForm } from '../components/prompts/FeedbackForm';
import { FeedbackAnytime } from '../components/prompts/FeedbackAnytime';
import { PredictionsWarning } from '../components/prompts/PredictionsWarning';
import { StepBar } from '../components/StepBar';
import { BigButton } from '../forms/inputs';
import { ButtonReset } from '../forms/ButtonReset';
import { STEP_VALS } from '../forms/STEP_VALS';

class VisitPage extends Component {
  constructor (props) {
    super(props);

    const { clientData } = this.props;

    this.state = {
      isBlocking: false,
      redirect:   false,
      client:     clientData,
      // For `FeedbackPrompt`
      promptData: {
        open:      false,  // Start as hidden
        message:   `default`,
        header:    ``,
        leaveText: `Leave`,
        callback:  () => {},
      },
      feedbackFormRequested: false,
      // Hack for MVP
      oldHousing:            clientData.current.housing,
      userChanged:           {},
      translations:          props.translations,
    };  // ends this.state {}
  };  // Ends constructor()


  componentDidMount = () => {
    this.didMount = true;

    // Webpack should remove this whole conditional when not built for development environment
    if (process.env.NODE_ENV === `development`) {
      // Override property set in App.js, because that property
      // doesn't get changed by updateClientValue()
      addClientGetterProperty(() => {
        return this.state.client;
      });
    }
  };


  resetClientIfOk = (shouldReset) => {
    if (!shouldReset) {
      return;
    }

    this.setState({
      client:      cloneDeep(CLIENT_DEFAULTS),
      oldHousing:  CLIENT_DEFAULTS.current.housing,
      isBlocking:  false,
      userChanged: {},
    });

    this.goToStep({ index: 0 });
  };  // Ends resetClientIfOk()


  askToResetClient = (promptData) => {
    promptData = promptData || this.promptData;
    // If the user hasn't interacted with the form at all
    if (!this.state.isBlocking) {
      // just go to the start of the form
      this.goToStep({ index: 0 });
    } else {
      // Otherwise, suggest the user submit feedback
      this.askForFeedback(this.resetClientIfOk, promptData);
    }
  };  // Ends askToResetClient()


  askForFeedback = (callback, promptText) => {
    // When user exits feedback prompt somehow,
    // close it before finishing the callback.
    let closePrompt = (isOk) => {
      this.setState({ promptData: { open: false }});
      callback(isOk);
    };

    this.setState({
      promptData: {
        ...promptText,
        open:     true,
        callback: closePrompt,
      },
    });
  };  // Ends askForFeedback()


  openFeedback = () => {
    this.setState({ feedbackFormRequested: true });
  };


  closeFeedback = () => {
    this.setState({ feedbackFormRequested: false });
  };


  updateClientValue = ({ route, value, time }) => {
    let clone       = cloneDeep(this.state.client),
        userChanged = { ...this.state.userChanged },  // only 1 deep
        routeList   = route.split(`/`),
        id          = routeList[ 0 ],  // `routeList` gets mutated
        newEvent    = { time: time, route: routeList, value: value };

    setNestedProperty(newEvent, clone, this.state.userChanged[ id ]);
    // Only set if the input was valid...? For now, always.
    // Also, userChanged should be only one step deep
    if (time === `future`) {
      userChanged[ id ] = true;
    }

    // Hack for MVP (otherwise need dependency + history system)
    let oldHousing = this.state.oldHousing;
    if (route === `housing`) {
      // clone housing should be right now
      oldHousing = clone.current.housing;
    }

    if (clone.current.benefits.includes(`section8`)) {
      clone.current.housing = `voucher`;
    } else {
      // Restore housing to previous value
      clone.current.housing = oldHousing;
    }

    clone.future.housing = clone.current.housing;

    this.setState((prevState) => {
      return {
        client:      clone,
        userChanged: userChanged,
        oldHousing:  oldHousing,
        // Form has been changed, data should now be downloadable
        // Warning sign for leaving forms should be shown
        isBlocking:  true,
      };
    });
  };  // Ends updateClientValue()


  changeCurrent = (evnt, data) => {
    data.time   = `current`;
    let newData = convertForUpdate(data);
    this.updateClientValue(newData);
  };


  changeFuture = (evnt, data) => {
    data.time   = `future`;
    let newData = convertForUpdate(data);
    this.updateClientValue(newData);
  };


  // @todo Implement once privacy and security are worked out
  saveForm = (exitAfterSave) => {
    alert(`Form saved (not really, this is a placeholder).`);
    if (exitAfterSave) {
      this.setState({ isBlocking: false, redirect: true });
    } else {
      this.setState({ isBlocking: false });
    }
  };


  scrollToTop () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };


  nextStep = () => {
    const nextStepIndex = this.getCurrentStepIndex() + 1; 
    if (nextStepIndex === STEP_VALS.length) {
      return;
    }
    this.goToStep({ index: nextStepIndex });
  };


  previousStep = () => {
    const prevStepIndex = this.getCurrentStepIndex() - 1;
    if (prevStepIndex < 0) {
      return;
    }
    this.goToStep({ index: prevStepIndex });
  };


  goToStep = ({ key, index }) => {
    if (!key) {
      key = STEP_VALS[ index ].key;
    }
    this.props.history.push(`${this.getPathPrefix()}/${key}`);
    this.scrollToTop();
  };


  getPathPrefix = () => {
    return `/visit/${this.props.clientId}/${this.props.visitId}`;
  };


  getCurrentStepIndex = () => {
    return STEP_VALS.findIndex((step) => {
      return step.key === this.props.stepKey;
    });
  };


  shouldConfirmLeave = ({ location }) => {
    return !location.pathname.startsWith(this.getPathPrefix());
  };


  render() {
    if (!this.didMount || !this.props.stepKey) {
      return (
        <Redirect to={ `${this.getPathPrefix()}/${STEP_VALS[ 0 ].key }` } />
      );
    }

    let translations      = this.state.translations,
        prevContent       = null,
        nextContent       = null,
        stepIndex         = this.getCurrentStepIndex(),
        distrustConfirmed = this.props.distrustConfirmed;

    if (stepIndex !== 0) {
      prevContent = (
        <BigButton onClick = { this.previousStep }>
          { translations.i_previous }
        </BigButton>
      );
    }

    // If it's not the last step
    if (stepIndex !== (STEP_VALS.length - 1)) {
      // use normal 'next' component
      nextContent = (
        <BigButton onClick = { this.nextStep }>
          { translations.i_next }
        </BigButton>
      );
    // Otherwise, set up to reset client
    } else {
      nextContent  = (
        <ButtonReset onClick  = { this.askToResetClient } >
          { translations.i_newClient }
        </ButtonReset>
      );
    }

    let navData = {
      left:   prevContent,
      middle: null,
      right:  nextContent,
    };

    let step          = STEP_VALS[ stepIndex ],
        StepComponent = step.component;

    return (
      <div className={ `forms-container flex-item flex-column` }>
        {/* = PROMPTS & PROMPT TRIGGERS = */}
        {/* - Sometimes visible - */}
        {/* Triggered by `ReactRouterLeaveListener`,
         *`ResetAnytime`, or `ErrorListener` */}
        <FeedbackPrompt
          { ...this.state.promptData }
          isBlocking   = { this.state.isBlocking }
          openFeedback = { this.openFeedback } />
        {/* Triggered by `FeedbackPrompt` & `FeedbackAnytime` */}
        <FeedbackForm
          isOpen = { this.state.feedbackFormRequested }
          close  = { this.closeFeedback }
          data   = { this.state.client } />

        {/* - Never visible - */}
        <ErrorListener
          callback       = { this.resetClientIfOk }
          client         = { this.state.client }
          askForFeedback = { this.askForFeedback } />
        {/* Browser nav - reload/back/unload. */}
        <BrowserLeaveListener isBlocking={ this.state.isBlocking } />
        {/* React nav buttons (Home/About) */}
        <ReactRouterLeaveListener
          askForFeedback            = { this.askForFeedback }
          confirmer                 = { this.props.confirmer }
          shouldRequestConfirmation = { this.shouldConfirmLeave }
          isBlocking                = { this.state.isBlocking } />

        {/* = LINKS? = */}
        {/* We should probably remove this. If we want to
         * do this we might do this a different way at this
         * point. Perhaps a user's page should be a route
         * in VisitPage? */}
        { this.state.redirect ? (
          <Redirect to={ `/detail/${this.props.clientId}` } />
        ) : (
          null
        ) }

        {/* = SECTION = */}
        {/* `padding` here duplicates previous `<Grid>` styling */}
        <Container
          id        = { `cliff-effects-tool` }
          className = { `flex-item flex-column` }>
          <Responsive
            id       = { `form-nav` }
            minWidth = { `874.5` }>
            <StepBar
              currentStepKey = { step.key }
              goToStep       = { this.goToStep }
              translations   = { this.state.translations.stepBar } />
          </Responsive>
          <div className={ `flex-item flex-column current-step-component` }>
            <StepComponent
              translations      = { translations[ step.key ] }
              updateClientValue = {
                (step.time === `current`) ? (this.changeCurrent) : (this.changeFuture)
              }
              navData          = { navData }
              saveForm         = { this.saveForm }
              askToResetClient = { this.askToResetClient }
              openFeedback     = { this.openFeedback }
              client           = { this.state.client } />
          </div>
        </Container>

        <Container id={ `alwaysLeftButtons` }>
          <ButtonReset
            onClick   = { this.askToResetClient }
            overrides = {{ id: `resetFixed`, size: `medium` }}>
            { translations.i_newClient }
          </ButtonReset>
          <FeedbackAnytime openFeedback={ this.openFeedback } />
        </Container>

        { !distrustConfirmed ? (
          <PredictionsWarning
            distrustConfirmed       = { distrustConfirmed }
            toggleDistrustConfirmed = { this.props.funcs.toggleDistrustConfirmed }
            translations            = {{ ...translations.warningModal }} />
        ) : (
          null
        ) }

      </div>
    );
  };
};  // Ends <VisitPage>

export { VisitPage };
