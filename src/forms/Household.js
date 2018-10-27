// REACT COMPONENTS
import React from 'react';
import {
  Button,
  Form,
  Dropdown,
  Header,
  Checkbox,
  Icon,
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { ColumnHeading } from '../components/headings';
import { ManagedNumberField } from './inputs';

// COMPONENT HELPER FUNCTIONS
import {
  isNonNegWholeNumber,
  hasOnlyNonNegWholeNumberChars,
} from '../utils/validators';

// OBJECT MANIPULATION
import { cloneDeep } from 'lodash';


// ======================
// GENERICS
// ======================
// To be able to adjust sizes easily
// Very specific to household size. May be worth creating
// a constructor for columns in general, or maybe use a Grid.
const columnStyle = {
  display:   'inline-block',
  textAlign: 'center',
  marginTop: '0.7em',
  // marginBottom: '0.7em'
};

const Columns = {};

// `noMargin` is a bit hacky, but it'll do for now
Columns.One = function ({ noMargin, children }) {
  let marginTop = columnStyle.marginTop;
  if (noMargin) {
    marginTop = 0;
  }
  return (<div style={{ ...columnStyle, marginTop: marginTop, width: '5em' }}> {children} </div>);
};

Columns.Two = function ({ noMargin, children }) {
  let marginTop = columnStyle.marginTop;
  if (noMargin) {
    marginTop = 0;
  }
  return (<div style={{ ...columnStyle, marginTop: marginTop, width: '20em', textAlign: 'left', paddingLeft: '1em' }}> {children} </div>);
};

Columns.Three = function ({ noMargin, children }) {
  let marginTop = columnStyle.marginTop;
  if (noMargin) {
    marginTop = 0;
  }
  return (<div style={{ ...columnStyle, marginTop: marginTop, width: '5em' }}> {children} </div>);
};

Columns.Four = function ({ noMargin, children }) {
  let marginTop = columnStyle.marginTop;
  if (noMargin) {
    marginTop = 0;
  }
  return (<div style={{ ...columnStyle, marginTop: marginTop, width: '10em' }}> {children} </div>);
};


const ColumnHeader = function ({ children, columnNum }) {

  const Container = Columns[ columnNum ];

  return (
    <Container>
      <ColumnHeading
        type={ 'household' }
        colName={ '' }>
        { children }
      </ColumnHeading>
    </Container>
  );

};


const MemberButton = function ({ basic, color, iconName, className, onClick }) {

  color = color || null;

  return (
    <Button
      type={ 'button' }
      basic={ !!basic }
      color={ color }
      icon={ iconName }
      className={ className }
      onClick={ onClick }
      style={{ padding: '0', height: '2.2em', width: '2.2em' }}
      circular />
  );

};


// ======================
// UNIQUE
// ======================

const Role = function ({ member, setMember, snippets }) {

  let ThisRole  = null,
      margin   = '0';

  if (member.index === 0) {

    ThisRole  = <span>{ snippets.i_headOfHousehold }</span>;

  } else if (member.index === 1) {

    margin = '-1em';

    const options = [
      { text: snippets.i_spouse, value: 'spouse' },
      { text: snippets.i_childOther, value: 'member' },
    ];

    ThisRole = <Dropdown
      selection
      name={ 'm_role' }
      value={ member.m_role }
      options={ options }
      onChange={ setMember } />;

  } else {

    ThisRole = <span>{ snippets.i_childOther }</span>;

  }

  // Styles will have to be adjusted.
  return (
    <div style={{ display: 'inline-block', width: '100%', textAlign: 'left', marginLeft: margin }}>
      { ThisRole }
    </div>
  );

};  // End Role(<>)


const MemberField = function ({ household, time, setHousehold, updateClientValue, snippets }, indx) {

  const member      = household[ indx ],
        routeStart  = 'household/' + indx + '/';
  member.index    = indx;  // Just needed as member prop in this file


  const onMemberChange = function (evnt, inputProps) {
    const route = routeStart + inputProps.name;
    const data  = { route: route, value: inputProps.value };
    updateClientValue(evnt, data);
  };


  const onMemberChecked = function (evnt, inputProps) {
    const route = routeStart + inputProps.name;
    const data  = { route: route, value: inputProps.checked };
    updateClientValue(evnt, data);
  };


  const removeMember = function (evnt, inputProps) {
    household.splice(indx, 1);
    setHousehold(evnt, household);
  };  // End removeMember()


  // For keyboard access (already does spacebar)
  const onKeyDown = function (evnt) {
    if (evnt.key === `Enter`) {
      evnt.target.click();
    }
  };


  // The font size thing is a bit weird, but... later
  return (
    <Form.Field
      className='flex-item'
      key={ indx }>

      <Columns.One>
        { indx > 0 ? (
          <MemberButton
            className={ 'remove' }
            onClick={ removeMember }
            iconName={ 'remove' } />
        ) : (
          <span>
            { household.length > 1 ? (
              <Icon
                fitted
                name={ 'ban' }
                style={{ color: '#cfcfd0', fontSize: '2.2em', verticalAlign: 'text-top' }} />
            ) : (
              null
            ) }
          </span>
        ) }
      </Columns.One>

      <Columns.Two>
        <Role
          member={ member }
          setMember={ onMemberChange }
          snippets={ snippets } />
      </Columns.Two>

      <Columns.Three>
        <ManagedNumberField
          value            = { member.m_age }
          name             = { 'm_age' }
          className        = { time + ' member-age ' + time }
          displayValidator = { hasOnlyNonNegWholeNumberChars }
          storeValidator   = { isNonNegWholeNumber }
          format           = { function (value) { return value; } }
          store            = { onMemberChange }
          onBlur           = { function () { return true; } } />
      </Columns.Three>

      <Columns.Four>
        <Checkbox
          name={ 'm_disabled' }
          checked={ member.m_disabled }
          onChange={ onMemberChecked }
          onKeyDown = { onKeyDown } />
      </Columns.Four>

    </Form.Field>
  );

};  // End MemberField()


const getMembers = function (current, time, setHousehold, updateClientValue, snippets) {

  const household = current.household,
        props     = {
          household:         household,
          time:              time,
          setHousehold:      setHousehold,
          updateClientValue: updateClientValue,
          snippets:          snippets,
        };

  const mems = [];
  for (let memi = 0; memi < household.length; memi++) {
    mems.push(MemberField(props, memi));
  };

  return mems;

};  // End getMembers()


const HouseholdContent = function ({ current, time, updateClientValue, snippets }) {

  // Don't mutate state properties
  const household = cloneDeep(current.household);


  const setHousehold = function (evnt, newHousehold) {

    const obj = {
      route: 'household',
      value: newHousehold,
    };

    updateClientValue(evnt, obj);

  };  // End setHousehold()


  const addMember = function (evnt, inputProps) {

    let member;
    if (household.length === 1) {
      member = { m_age: 30, m_role: 'spouse', m_disabled: false };
    } else {
      member = { m_age: 12, m_role: 'member', m_disabled: false };
    }

    household.push(member);
    setHousehold(evnt, household);

  };  // End addMember()


  return (
    <div className='field-aligner two-column'>
      <div style={{ marginBottom: '.5em' }}>
        <ColumnHeader columnNum='One' />
        <ColumnHeader columnNum='Two'> { snippets.i_role }</ColumnHeader>
        <ColumnHeader columnNum='Three'>{ snippets.i_age }</ColumnHeader>
        <ColumnHeader columnNum='Four'>{ snippets.i_disabled }</ColumnHeader>
      </div>

      { getMembers(current, time, setHousehold, updateClientValue, snippets) }

      <Button
        type={ 'button' }
        id={ 'addMember' }
        basic
        onClick={ addMember }>
        <Columns.One noMargin={ true }>
          <Icon
            name={ 'plus' }
            circular
            inverted
            color={ 'teal' } />
        </Columns.One>

        <Columns.Two noMargin={ true }>
          <Header
            as='h4'
            color={ 'teal' }>
            { snippets.i_addMember }
          </Header>
        </Columns.Two>

        <Columns.Three noMargin={ true } />
        <Columns.Four noMargin={ true } />
      </Button>

    </div>
  );

};  // End HouseholdContent()


// `props` is a cloned version of the original props. References broken.
const HouseholdStep = function ({ updateClientValue, navData, client, snippets }) {

  return (
    <FormPartsContainer
      title     = { snippets.i_title }
      clarifier = { snippets.i_clarifier }
      navData   = { navData }
      formClass = { `household` }>
      <HouseholdContent
        updateClientValue = { updateClientValue }
        current={ client.current }
        time={ 'current' }
        snippets={ snippets } />
    </FormPartsContainer>
  );

};  // End HouseholdStep()

export { HouseholdStep };
