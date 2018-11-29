import React, { Component } from 'react';
import {
  Menu,
  Checkbox,
  Button,
  Dropdown,
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import { HeadingWithDetail } from '../details';
// Dev components
import { CustomClient } from '../CustomClient';

// DATA
import { getLocalizationData } from '../../localization/all';

import { LocalizationReport } from './LocalizationReport.js';

/** Contains all HUD items except 'hide' button
 * @todo If there are enough dev features for it,
 *    make menu categories collapsible. */
const DevMenu = function ({ devProps, funcs, data, state }) {

  const langs    = getLocalizationData(), // Get copy of localization data
        langOpts = [];

  for (let key in langs) {
    let translations = langs[ key ],
        lang  = {
          text:  translations.langName,
          key:   translations.langCode,
          value: translations.langCode,
        };
    langOpts.push(lang);
  }

  return (
    <div className = { `dev-menu` } >
      <Menu.Item>
        <Button
          compact
          negative
          size      = { `tiny` }
          className = { `off` }
          onClick   = { funcs.turnOff }>
          HUD Off
        </Button>
      </Menu.Item>

      <Menu.Item header>Translations</Menu.Item>
      <Menu.Item>
        <Checkbox
          label    = { `Mark English translations` }
          checked  = { devProps.english }
          onChange = { funcs.english } />
      </Menu.Item>
      <Menu.Item>
        <HeadingWithDetail>
          <Checkbox
            label    = { `Mark non-English translations` }
            checked  = { devProps.nonEnglish }
            onChange = { funcs.nonEnglish } />
          <span>
            Note: text that doesn&apos;t have an underline (for reasons) has no translations.
          </span>
        </HeadingWithDetail>
      </Menu.Item>
      <Menu.Item>
        <Dropdown
          fluid
          search
          selection
          scrolling
          defaultValue = { state.langCode }
          options      = { langOpts }
          onChange     = { funcs.setLanguage } />
      </Menu.Item>

      <Menu.Item header> Client</Menu.Item>
      <Menu.Item>
        <CustomClient
          load       = { funcs.loadClient }
          toRestore  = { data.default } />
      </Menu.Item>

      <Menu.Item>
        <LocalizationReport />
      </Menu.Item>

      <Menu.Item>
        <HeadingWithDetail>
          <Checkbox
            label    = { `Disable warning modal` }
            checked  = { devProps.warningOff }
            onChange = { funcs.warning } />
          <span>
            Note: Uncheck this box to<br />
            disable the predictions warning<br />
            modal. The modal displays prior<br />
            to allowing access to the form.<br />
          </span>
        </HeadingWithDetail>
      </Menu.Item>
    </div>
  );
};  // End <DevMenu>


class DevHud extends Component {

  toggleHiding = () => {
    let props    = this.props,
        setDev   = props.funcs.setDev,
        devProps = props.devProps;

    let doShow = !devProps.devHidden;
    setDev(`devHidden`, doShow);
  };

  toggleEnglish = () => {
    let setDev  = this.props.funcs.setDev,
        english = this.props.devProps.english;
    setDev(`english`, !english);
  };

  toggleNonEnglish = () => {
    let setDev     = this.props.funcs.setDev,
        nonEnglish = this.props.devProps.nonEnglish;
    setDev(`nonEnglish`, !nonEnglish);
  };

  toggleWarning = () => {
    let setDev  = this.props.funcs.setDev,
        warning = this.props.devProps.warningOff;
    setDev(`warningOff`, !warning);
  };

  turnOff = () => {
    this.props.funcs.setDev(`dev`, false);
  };

  render () {

    let {
          devProps,
          funcs,
          data,
          state,
        } = this.props,
        devFuncs = {
          ...funcs,
          english:    this.toggleEnglish,
          nonEnglish: this.toggleNonEnglish,
          turnOff:    this.turnOff,
          warning:    this.toggleWarning,
        };

    return (
      <Menu
        className = { `dev-hud` }
        compact
        vertical>
        <DevMenu 
          devProps  = { devProps }
          funcs     = { devFuncs }
          data      = { data }
          state     = { state } />
        <Button
          className = { `hide` }
          onClick   = { this.toggleHiding }>
          { devProps.devHidden ? (`Show`) : (`Hide`) }
        </Button>
      </Menu>
    );
  }
  
};


export {
  DevHud,
  DevMenu,
};
