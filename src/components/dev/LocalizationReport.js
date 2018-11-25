import React, { Component } from 'react';
import {  
  Button,
  Dropdown,
  Form,
  Icon,
  List,
  Modal,
} from 'semantic-ui-react';

import _ from 'lodash';
import { getKeyPathsArray, getKeyPathStrings } from '../../utils/objectKeyPaths';
import { getLocalizationData } from '../../localization/all';


// Get copy of localization data
const localizations = getLocalizationData();

const ReportItem = function ({ keyPath, test, locKey, pass }) {

  let iconName = `check square`,
      color    = `green`;
  if (!pass) {
    iconName = `window close`;
    color    = `red`;
  }

  return (
    <List.Item>
      <List.Icon
        name          = { iconName }
        color         = { color }
        size          = { `large` }
        verticalAlign = { `middle` } />
      <List.Content>
        { keyPath } { test } '{ locKey }'.
      </List.Content>
    </List.Item>
  );
};


const ReportList = function ({ results }) {

  let items = [];
  for (let result of results) {

    let item = (
      <ReportItem
        key     = { result.keyPath }
        keyPath = { result.keyPath }
        test    = { result.test }
        locKey  = { result.locKey }
        pass    = { result.pass } />
    );

    items.push(item);
  }

  return (
    <List>{ items }</List>
  );
};


class LocalizationReport extends Component {

  state = {
    modalOpen:        false,
    modelLocKey:      null,
    compareLocKey:    null,
    filter:           `false`,
    localizationKeys: [],
  };

  // @todo Why not do this at the top before this
  // component is even created? Then there wouldn't
  // have to be a check for null in the comparison function.
  // Or do it when constructing the component. I don't think
  // there's anything that would preclude that in here.
  componentDidMount() {
    // Get the list of non-EN localizations for testing
    let localizationKeys = Object.keys(localizations);
    const enIndex        = localizationKeys.indexOf(`en`);

    // Initilize our state if EN localization exists
    if (enIndex !== -1) {
      // Remove EN from our keys to loop over
      localizationKeys.splice(enIndex, 1);

      this.setState({
        modelLocKey:   `en`,
        compareLocKey: localizationKeys[ 0 ],
        localizationKeys,
      });
    }
  }

  toggleModalOpen = () => {
    let modalOpen = this.state.modalOpen;
    this.setState({ modalOpen: !modalOpen });
  };

  setLanguage = (e, { value }) => { this.setState({ compareLocKey: value }); };
  
  setFilter = (e, { value }) => { this.setState({ filter: value }); };
 
  filterResults (results, filter) {
    if (filter === `all`) { 
      return results;
    }

    let pass = filter === `true`;
    return results.filter((result) => {
      return result.pass === pass;
    });
  };

  compareLocalizations (modelLocKey, compareLocKey) {
    let results = [];

    if (modelLocKey !== null && compareLocKey !== null) {
      // Get the key paths from the model (EN) localization
      const modelKeyPaths = getKeyPathsArray(localizations[ modelLocKey ], false);
     
      // Loop through all model (EN) key paths
      let requiredKeyPathResults = modelKeyPaths.map((keyPath) => {
        let keyPathAsStr   = keyPath.join(`.`),
            keyExistsInLoc = _.has(localizations[ compareLocKey ], keyPath);

        return {
          keyPath: keyPathAsStr,
          test:    `should exist in`,
          locKey:  compareLocKey,
          pass:    keyExistsInLoc,
        };
      });

      /*
      * Find keys in the model that don't exist in our model with any version.
      * 
      * So if DE has about.myKey_v2 and EN has about.myKey_v5, we don't want to include a
      * message saying to remove about.myKey_v2, since the above checks will indicate that 
      * this key is simply out of date.
      * 
      * However, if DE has about.myKey_v2, we essentially want to check EN for 
      * about.myKey_v{any version}. If none is found then we display a message.  To do this, 
      * we'll strip all versions before doing our checks.
      */
       
      // Get the key paths from the model (EN) localization, but without any version numbers
      const modelKeyPathStringsNoVer = getKeyPathStrings(getKeyPathsArray(localizations[ modelLocKey ], true));
     
      // Get the key paths from the localization we're comparing against EN
      const compareKeyPaths = getKeyPathsArray(localizations[ compareLocKey ], false);

      // Find any keys paths that shouldn't be in the localization we're comparing to our model 
      // We won't return passing checks, since requiredKeyPathResults effectively includes those
      const accumulateExtraKeyPaths = function (extraKeyPaths, keyPath) {
        let keyPathAsStr = keyPath.join(`.`);
       
        // If this keyPath has a version number, remove it so we can compare against the model key 
        // paths which have had their versions removed
        let keyPathAsStrNoVer = keyPathAsStr.split(`_v`)[ 0 ];

        const matchesKeyPath = function (modelKeyPath) {
          return modelKeyPath === keyPathAsStrNoVer;
        };

        let keyIndex       = _.findIndex(modelKeyPathStringsNoVer, matchesKeyPath),
            keyExistsInLoc = keyIndex > -1;
        
        if (!keyExistsInLoc) {
          extraKeyPaths.push({
            keyPath: keyPathAsStr,
            test:    `should not exist in`,
            locKey:  compareLocKey,
            pass:    keyExistsInLoc,
          });
        }

        return extraKeyPaths;
      };  // Ends accumulateExtraKeyPaths()
      
      let extraKeyPathResults = compareKeyPaths.reduce(accumulateExtraKeyPaths, []);
      results = requiredKeyPathResults.concat(extraKeyPathResults);
    }  // ends if (need to get any results)

    return results;
  };
 
  render () {
    let {
      modelLocKey,
      compareLocKey,
      localizationKeys,
      filter,
    } = this.state;

    const localizationOptions = localizationKeys.map((key) => {
      return { text: key, value: key };
    });

    const filterOptions = [
      { text: `All`,     value: `all` },
      { text: `Passing`, value: `true` },
      { text: `Failing`, value: `false` },
    ];

    return (
      <Modal
        trigger = { <Button onClick={ this.toggleModalOpen }>Localization Report</Button> }
        open    = { this.state.modalOpen }
        onClose = { this.toggleModalOpen }
        closeIcon>

        <Modal.Header>Localization Report</Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <p>
              This report indicates whether keys in the 'en' localization file are present in 
              your chosen localization. It will also list any keys in your chosen localization 
              which should be removed.
          
              <Icon
                name  = { `check square` }
                size  = { `large` }
                color = { `green` } />indicates a check passed.

              <Icon
                name  = { `window close` }
                size  = { `large` }
                color = { `red` } />indicates a check failed and action is needed.
            </p>
            <Form>
              <Form.Group>
                <Form.Field inline>
                  <label>Localization:</label>
                  <Dropdown
                    compact
                    search
                    selection
                    scrolling
                    defaultValue = { compareLocKey }
                    options      = { localizationOptions }
                    onChange     = { this.setLanguage } />
                </Form.Field>
            
                <Form.Field inline>
                  <label>Show:</label>
                  <Dropdown
                    compact
                    search
                    selection
                    scrolling
                    defaultValue = { filter }
                    options      = { filterOptions }
                    onChange     = { this.setFilter } />
                </Form.Field>
              </Form.Group>
            </Form>

            <ReportList
              results = { this.filterResults(this.compareLocalizations(modelLocKey, compareLocKey), this.state.filter) }
              filter  = { filter } />
            
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick = { this.toggleModalOpen }>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
};

export {
  LocalizationReport,
  ReportItem,
  ReportList,
};
