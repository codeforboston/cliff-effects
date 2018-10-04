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
import { localizations } from '../../localization/all';

import { LocalizationReport } from './LocalizationReport.js';

const DevMenu = function ({ devProps, funcs, data, state }) {

  var langs    = localizations,
      langOpts = [];

  for (let key in langs) {
    var snips = langs[ key ],
        lang  = {
          text:  snips.langName,
          key:   snips.langCode,
          value: snips.langCode,
        };
    langOpts.push(lang);
  }

  /** @todo If there are enough dev features for it,
   *    make menu categories collapsible. */
  return (
    <div className = { `dev-menu` } >
      <Menu.Item>
        <Button
          compact
          negative
          size = { `tiny` }
          className = { `off` }
          onClick   = { funcs.turnOff }>
          HUD Off
        </Button>
      </Menu.Item>

      <Menu.Item header> Snippets</Menu.Item>
      <Menu.Item>
        <Checkbox
          label    = { `Mark English snippets` }
          checked  = { devProps.english }
          onChange = { funcs.english } />
      </Menu.Item>
      <Menu.Item>
        <HeadingWithDetail>
          <Checkbox
            label    = { `Mark non-English snippets` }
            checked  = { devProps.nonEnglish }
            onChange = { funcs.nonEnglish } />
          <span>
            Note: text that doesn&apos;t have an underline (for reasons) has no snippets.
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
    </div>
  );
};  // End <DevMenu>


class DevHud extends Component {

  toggleHiding = () => {
    var props    = this.props,
        setDev   = props.funcs.setDev,
        devProps = props.devProps;

    var doShow = !devProps.devHidden;
    setDev(`devHidden`, doShow);
  };

  toggleEnglish = () => {
    var setDev  = this.props.funcs.setDev,
        english = this.props.devProps.english;
    setDev(`english`, !english);
  };

  toggleNonEnglish = () => {
    var setDev     = this.props.funcs.setDev,
        nonEnglish = this.props.devProps.nonEnglish;
    setDev(`nonEnglish`, !nonEnglish);
  };

  turnOff = () => {
    this.props.funcs.setDev(`dev`, false);
  };

  render () {

    var {
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


export { DevHud, DevMenu };
