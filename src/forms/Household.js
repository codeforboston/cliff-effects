// REACT COMPONENTS
import React from 'react';
import {
  Button,
  Form,
  Header,
  Checkbox,
  Icon,
} from 'semantic-ui-react';

import Select from 'react-select';

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
// REUSED
// ======================
const Columns = {};

// `noMargin` is a bit hacky, but it'll do for now
Columns.One = function ({ children, className }) {
  className = className || ``;
  return (
    <div className={ className + ` column column-one` }>
      { children }
    </div>
  );
};

Columns.Two = function ({ children, className }) {
  className = className || ``;
  return (
    <div className={ className + ` column column-two` }>
      { children }
    </div>
  );
};

Columns.Three = function ({ children, className }) {
  className = className || ``;
  return (
    <div className={ className + ` column column-three` }>
      { children }
    </div>
  );
};

Columns.Four = function ({ children, className }) {
  className = className || ``;
  return (
    <div className={ className + ` column column-four` }>
      { children }
    </div>
  );
};


const ColumnHeader = function ({ children, columnNum }) {

  let Container = Columns[ columnNum ];

  return (
    <Container>
      <ColumnHeading
        type    = { `household` }
        colName = { `` }>
        { children }
      </ColumnHeading>
    </Container>
  );

};


const MemberButton = function ({ basic, color, iconName, className, onClick }) {

  color = color || null;

  return (
    <Button
      circular
      type      = { `button` }
      basic     = { !!basic }
      color     = { color }
      icon      = { iconName }
      className = { className }
      onClick   = { onClick } />
  );

};


// ======================
// UNIQUE
// ======================

const Role = function ({ member, setMember, setDropdownMember, translations }) {

  let thisRole  = null,
      className = `head`;

  if (member.index === 0) {

    thisRole = (<span>{ translations.i_headOfHousehold }</span>);

  } else if (member.index === 1) {

    className = `second-member-choice`;  // -1em

    let options = [
      { label: translations.i_spouse, value: 'spouse', name: 'm_role' },
      { label: translations.i_childOther, value: 'member', name: 'm_role' },
    ];

    let selectedValue = options.find((obj) => {
      return obj.value === member.m_role;
    });

    thisRole = (
      <Select
        selection
        name     = { `m_role` }
        value    = { selectedValue }
        options  = { options }
        onChange = { setDropdownMember } />
    );

  } else {

    thisRole = (<span>{ translations.i_childOther }</span>);

  }  // ends which member index

  // Styles will have to be adjusted.
  return (<div className={ `role ` + className }>{ thisRole }</div>);

};  // Ends <Role>


const MemberField = function ({ household, time, setHousehold, updateClientValue, translations }, indx) {

  let member     = household[ indx ],
      routeStart = `household/` + indx + `/`;
  member.index   = indx;  // Just needed as member prop in this file

  let onMemberChange = function (evnt, inputProps) {
    let route = routeStart + inputProps.name,
        data  = { route: route, value: inputProps.value };
    updateClientValue(evnt, data);
  };

  let onMemberDropdownChange = function (selectedOption) {
    const data = {
      route: routeStart + selectedOption.name,
      value: selectedOption.value,
    };
    updateClientValue(selectedOption, data);
  };


  let onMemberChecked = function (evnt, inputProps) {
    let route = routeStart + inputProps.name,
        data  = { route: route, value: inputProps.checked };
    updateClientValue(evnt, data);
  };

  let removeMember = function (evnt, inputProps) {
    household.splice(indx, 1);
    setHousehold(evnt, household);
  };

  // For keyboard access (already does spacebar)
  let onKeyDown = function (evnt) {
    if (evnt.key === `Enter`) {
      evnt.target.click();
    }
  };

  let format = function (value) {
    return value;
  };

  let onBlur = function () {
    return true;
  };

  // The font size thing is a bit weird, but... later
  return (
    <Form.Field
      className = { `flex-item member` }
      key       = { indx }>

      <Columns.One>
        { (indx > 0) ? (
          <MemberButton
            className = { `remove` }
            onClick   = { removeMember }
            iconName  = { `remove` } />
        ) : (
          <span>
            { (household.length > 1) ? (
              <Icon
                fitted
                className = { `no-removing` }
                name      = { `ban` } />
            ) : (
              null
            ) }
          </span>
        ) }
      </Columns.One>

      <Columns.Two>
        <Role
          member           = { member }
          setMember        = { onMemberChange }
          setDropdownMember={ onMemberDropdownChange }
          translations     = { translations } />
      </Columns.Two>

      <Columns.Three>
        <ManagedNumberField
          value            = { member.m_age }
          name             = { `m_age` }
          className        = { time + ` member-age ` }
          displayValidator = { hasOnlyNonNegWholeNumberChars }
          storeValidator   = { isNonNegWholeNumber }
          format           = { format }
          store            = { onMemberChange }
          onBlur           = { onBlur } />
      </Columns.Three>

      <Columns.Four>
        <Checkbox
          name      = { `m_disabled` }
          checked   = { member.m_disabled }
          onChange  = { onMemberChecked }
          onKeyDown = { onKeyDown } />
      </Columns.Four>

    </Form.Field>
  );

};  // Ends <MemberField>


const getMembers = function (current, time, setHousehold, updateClientValue, translations) {

  let household = current.household,
      props     = {
        household:         household,
        time:              time,
        setHousehold:      setHousehold,
        updateClientValue: updateClientValue,
        translations:      translations,
      };

  let mems = [];
  for (let memi = 0; memi < household.length; memi++) {
    mems.push(MemberField(props, memi));
  };

  return mems;

};


const HouseholdContent = function ({ current, time, updateClientValue, translations }) {

  // Don't mutate state properties
  let household = cloneDeep(current.household);

  let setHousehold = function (evnt, newHousehold) {

    let obj = {
      route: `household`,
      value: newHousehold,
    };

    updateClientValue(evnt, obj);

  };

  let addMember = function (evnt, inputProps) {

    let member;
    if (household.length === 1) {
      member = { m_age: 30, m_role: `spouse`, m_disabled: false };
    } else {
      member = { m_age: 12, m_role: `member`, m_disabled: false };
    }

    household.push(member);
    setHousehold(evnt, household);

  };

  return (
    <div className={ `field-aligner two-column` }>
      <div className={ `column-headers flex-item` }>
        <ColumnHeader columnNum={ `One` } />
        <ColumnHeader columnNum={ `Two` }>{ translations.i_role }</ColumnHeader>
        <ColumnHeader columnNum={ `Three` }>{ translations.i_age }</ColumnHeader>
        <ColumnHeader columnNum={ `Four` }>{ translations.i_disabled }</ColumnHeader>
      </div>

      { getMembers(current, time, setHousehold, updateClientValue, translations) }

      <Button
        basic
        type    = { `button` }
        id      = { `addMember` }
        onClick = { addMember }>
        <Columns.One className={ `add-row-column` }>
          <Icon
            circular
            inverted
            name  = { `plus` }
            color = { `teal` } />
        </Columns.One>

        <Columns.Two className={ `add-row-column` }>
          <Header
            as    = { `h4` }
            color = { `teal` }>
            { translations.i_addMember }
          </Header>
        </Columns.Two>

        <Columns.Three className={ `add-row-column` } />
        <Columns.Four className={ `add-row-column` } />
      </Button>

    </div>
  );

};  // Ends <HouseholdContent>


// `props` is a cloned version of the original props. References broken.
const HouseholdStep = function ({ updateClientValue, navData, client, translations }) {

  return (
    <FormPartsContainer
      title     = { translations.i_title }
      clarifier = { translations.i_clarifier }
      navData   = { navData }
      formClass = { `household` }>
      <HouseholdContent
        updateClientValue = { updateClientValue }
        current           = { client.current }
        time              = { `current` }
        translations      = { translations } />
    </FormPartsContainer>
  );

};


export { HouseholdStep };
