import React, { Component } from 'react';
import {
  Menu,
  Checkbox,
  Button,
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import { HeadingWithDetail } from '../details';
// Dev components
import { CustomClient } from '../CustomClient';


const DevMenu = function ({ devProps, funcs, data }) {

  /** @todo If there are enough dev features for it,
   *    make menu categories collapsible. */
  return (
    <div>
      <Menu.Item header>> Snippets</Menu.Item>
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
            Note: text that doesn't have an underline (for reasons) has no snippets.
          </span>
        </HeadingWithDetail>
      </Menu.Item>

      <Menu.Item header>> Client</Menu.Item>
      <Menu.Item>
        <CustomClient
          loadClient = { funcs.loadClient }
          toRestore  = { data.default } />
      </Menu.Item>
    </div>
  );
};  // End <DevMenu>


class DevHud extends Component {

  state = {
    hiderText:  `^ --- Hide --- ^`,
    toHideText: `^ --- Hide --- ^`,
  };

  toggleHiding = () => {
    this.setState((prevState) => {
      if (prevState.hiderText === prevState.toHideText) {
        return { hiderText: `v --- Show dev HUD --- v` };
      } else {
        return { hiderText: prevState.toHideText };
      }
    });
  };

  toggleEnglish = () => {
    var props  = this.props,
        setDev = props.funcs.setDev;

    if (props.devProps.english) {
      setDev(`english`, false);
    } else {
      setDev(`english`, true);
    }
  };

  toggleNonEnglish = () => {
    var props  = this.props,
        setDev = props.funcs.setDev;

    if (props.devProps.nonEnglish) {
      setDev(`nonEnglish`, false);
    } else {
      setDev(`nonEnglish`, true);
    }
  };

  render () {

    var hiderText = this.state.hiderText,
        hidden    = hiderText !== this.state.toHideText,
        {
          devProps,
          funcs,
          data,
        } = this.props,
        devFuncs     = {
          english:    this.toggleEnglish,
          nonEnglish: this.toggleNonEnglish,
          loadClient: funcs.loadClient,
        };

    return (
      <Menu
        className = { `dev-hud` }
        compact
        vertical>
        { !hidden ?
          <DevMenu 
            devProps = { devProps }
            funcs    = { devFuncs }
            data     = { data } />
          : null
        }
        <Button
          className = { `hide` }
          onClick   = { this.toggleHiding }>
          { hiderText }
        </Button>
      </Menu>
    );
  }
  
};


export { DevHud };
