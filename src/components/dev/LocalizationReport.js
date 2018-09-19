import React, { Component } from 'react';
import {  
  Button,
  Dropdown,
  Form,
  Icon,
  List,
  Menu,
  Modal,
} from 'semantic-ui-react';
import _ from 'lodash';
import { getKeyPathsArray, getKeyPathStrings } from '../../utils/objectKeyPaths';

// DATA
import { localizations } from '../../localization/all';


const ResultsList = (props) => {
  
  const { results, filter } =  props;

  const filterResults = (results, filter) => {
    if (filter === 'all') { 
      return results;
    }
    let pass = filter === 'true' ? true : false;
    return results.filter((result) => {
      return result.pass === pass;
    });
  };

  let filteredResults = filterResults(results, filter);

  return filteredResults.map((filteredResult) => {
    return (
      <List.Item
        key={ filteredResult.keyPath }>
        <List.Icon
          name={ filteredResult.pass ? 'check square' : 'window close' }
          size='large'
          color={ filteredResult.pass ? 'green' : 'red' }
          verticalAlign='middle' />
        <List.Content>
          { filteredResult.keyPath } { filteredResult.test } '{ filteredResult.in }'.
        </List.Content>
      </List.Item>
    );
  });
};


class LocalizationReport extends Component {

  state = {
    modalOpen:        false,
    modelLocKey:      null,
    compareLocKey:    null,
    filter:           'all',
    localizationKeys: [],
  };

  componentDidMount() {
    // Get the list of non-EN localizations for testing
    let localizationKeys = Object.keys(localizations);
    const enIndex = localizationKeys.indexOf('en');

    // Initilize our state if EN localization exists
    if (enIndex !== -1) {
      // Remove EN from our keys to loop over
      localizationKeys.splice(enIndex, 1);

      this.setState({
        modelLocKey:   'en',
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
 
  compareLocalizations = (modelLocKey, compareLocKey) => {
    let results = [];

    if (modelLocKey !== null && compareLocKey !== null) {
      // Get the key paths from the model (EN) localization
      const modelKeyPaths = getKeyPathsArray(localizations[ modelLocKey ], false);
     
      // Loop through all model (EN) key paths
      let requiredKeyPathResults = modelKeyPaths.map((keyPath) => {
        let keyPathAsStr = keyPath.join('.');
        let keyExistsInLoc = _.has(localizations[ compareLocKey ], keyPath);

        return {
          keyPath: keyPathAsStr,
          test:    'should exist in',
          in:      compareLocKey,
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
      let extraKeyPathResults = compareKeyPaths.reduce((extraKeyPaths, keyPath) => {
        let keyPathAsStr = keyPath.join('.');
       
        // If this keyPath has a version number, remove it so we can compare against the model key 
        // paths which have had their versions removed
        let keyPathAsStrNoVer = keyPathAsStr.split('_v')[ 0 ];
        let keyExistsInLoc = _.findIndex(modelKeyPathStringsNoVer, (modelKeyPath) => {
          return modelKeyPath === keyPathAsStrNoVer ? true : false;
        }) === -1 ? false : true ;
        
        if (!keyExistsInLoc) {
          extraKeyPaths.push({
            keyPath: keyPathAsStr,
            test:    'should not exist in',
            in:      compareLocKey,
            pass:    keyExistsInLoc,
          });
        }
        return extraKeyPaths;
      }, []);
      results = requiredKeyPathResults.concat(extraKeyPathResults);
    }
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
      { text: 'All', value: 'all' },
      { text: 'Passing', value: 'true' },
      { text: 'Failing', value: 'false' },
    ];

    return (
      <Menu.Item>
        <Modal
          trigger={ <Button onClick={ this.toggleModalOpen }>Localization Report</Button> }
          open={ this.state.modalOpen }
          onClose={ this.toggleModalOpen }
          closeIcon>
          <Modal.Header>
            Localization Report
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>
                This report indicates whether keys in the 'en' localization file are present in 
                your chosen localization.  It will also list any keys in your chosen localization 
                which should be removed.
            
                <Icon
                  name='check square'
                  size='large'
                  color='green' />indicates a check passed.

                <Icon
                  name='window close'
                  size='large'
                  color='red' />indicates a check failed and action is needed.
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

              <List>
                <ResultsList
                  results = { this.compareLocalizations(modelLocKey, compareLocKey) }
                  filter  = { filter } />
              </List>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              primary
              onClick={ this.toggleModalOpen }>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Menu.Item>
    );
  }
};

export { LocalizationReport };
