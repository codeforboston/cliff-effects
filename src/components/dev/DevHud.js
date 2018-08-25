import React, { Component } from 'react';
import {
  Menu,
  Checkbox,
  Message,
  Button,
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import { HeadingWithDetail } from '../details';


const DevMenu = function ({ devProps, funcs }) {

  return (
    <div>
      <Menu.Item>
        <Checkbox
          label   = { `Mark English snippets` }
          checked = { devProps.english }
          onChange = { funcs.english } />
      </Menu.Item>
      <Menu.Item>
        <HeadingWithDetail>
          <Checkbox
            label   = { `Mark non-English snippets` }
            checked = { devProps.nonEnglish }
            onChange = { funcs.nonEnglish } />
          <span>
            Note: text that doesn't have an underline (for reasons) has no snippets.
          </span>
        </HeadingWithDetail>
      </Menu.Item>
    </div>
  );
};  // End <DevMenu>


class DevHud extends Component {

  state = { hiderText: `Hide` };

  toggleHiding = () => {
    this.setState((prevState) => {
      if (prevState.hiderText === `Hide`) {
        return { hiderText: `Show dev HUD` };
      } else {
        return { hiderText: `Hide` };
      }
    });
  };

  toggleEnglish = () => {
    if (this.props.devProps.english) {
      this.props.setDev('english', false);
    } else {
      this.props.setDev('english', true);
    }
  };

  toggleNonEnglish = () => {
    if (this.props.devProps.nonEnglish) {
      this.props.setDev('nonEnglish', false);
    } else {
      this.props.setDev('nonEnglish', true);
    }
  };

  render () {

    var hiderText = this.state.hiderText,
        hidden    = hiderText !== `Hide`,
        funcs     = {
          english:    this.toggleEnglish,
          nonEnglish: this.toggleNonEnglish,
        };

    return (
      <Menu
        className = { `dev-hud` }
        compact
        vertical >
        { !hidden ?
          <DevMenu 
            devProps = { this.props.devProps }
            funcs    = { funcs } />
          : null
        }
        <Button
          className = { `hide` }
          onClick = { this.toggleHiding } >
          { hiderText }
        </Button>
      </Menu>
    );
  }
  
};


export { DevHud };
