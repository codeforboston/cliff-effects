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

  let Container = Columns[ columnNum ];

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

class Role extends React.PureComponent {
  handleRoleChange = (event, { value }) => {
    this.props.onChange({ role: value });
  };

  render() {
    const { member, snippets } = this.props;
    
    let ThisRole  = null,
        margin   = '0';
  
    if (this.props.index === 0) {
  
      ThisRole  = <span>{ snippets.i_headOfHousehold }</span>;
  
    } else if (this.props.index === 1) {
  
      margin = '-1em';
  
      const options = [
        { text: snippets.i_spouse, value: 'spouse' },
        { text: snippets.i_childOther, value: 'member' },
      ];
  
      ThisRole = <Dropdown
        selection
        name={ 'm_role' }
        value={ member.get('m_role') }
        options={ options }
        onChange={ this.handleRoleChange } />;
  
    } else {
  
      ThisRole = <span>{ snippets.i_childOther }</span>;
  
    }
  
    // Styles will have to be adjusted.
    return (
      <div style={{ display: 'inline-block', width: '100%', textAlign: 'left', marginLeft: margin }}>
        { ThisRole }
      </div>
    );

  }
}  // End Role(<>)


class MemberField extends React.PureComponent {
  handleDisabledChecked = (event, { checked }) => {
    this.props.onIsDisabledChange({ isDisabled: checked, index: this.props.index });
  };

  handleKeyDown = (event) => {
    // For keyboard access (already does spacebar)
    if (event.key === 'Enter') {
      event.target.click();
    }
  };

  handleRoleChange = ({ role }) => {
    this.props.onRoleChange({ role, index: this.props.index });
  };

  handleAgeChange = (event, { value }) => {
    this.props.onAgeChange({ age: value, index: this.props.index });
  };

  handleRemove = () => {
    this.props.remove({ index: this.props.index });
  };

  render() {
    const { household, member, snippets, canRemove, index } = this.props;
  
    // The font size thing is a bit weird, but... later
    return (
      <Form.Field
        className='flex-item'>
  
        <Columns.One>
          { canRemove ? (
            <MemberButton
              className={ 'remove' }
              onClick={ this.handleRemove }
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
            index = { index }
            onChange={ this.handleRoleChange }
            snippets={ snippets } />
        </Columns.Two>
  
        <Columns.Three>
          <ManagedNumberField
            value            = { member.get('m_age') }
            name             = { 'm_age' }
            className        = { 'current member-age' }
            displayValidator = { hasOnlyNonNegWholeNumberChars }
            storeValidator   = { isNonNegWholeNumber }
            format           = { function (value) { return value; } }
            store            = { this.handleAgeChange }
            onBlur           = { function () { return true; } } />
        </Columns.Three>
  
        <Columns.Four>
          <Checkbox
            name={ 'm_disabled' }
            checked={ member.get('m_disabled') }
            onChange={ this.handleDisabledChecked }
            onKeyDown = { this.handleKeyDown } />
        </Columns.Four>
  
      </Form.Field>
    );
  }
}  // End MemberField()

class HouseholdContent extends React.PureComponent {
  getMembers = () => {
    const { household, setMemberAge, setMemberIsDisabled, setMemberRole, snippets } = this.props;
    
    return household.map(
      (member, index) => {
        return (
          <MemberField
            key={ index }
            member={ member }
            household = { household }
            snippets = { snippets }
            canRemove={ index > 0 }
            index = { index }
            onIsDisabledChange = { setMemberIsDisabled }
            onAgeChange = { setMemberAge }
            onRoleChange = { setMemberRole } />
        );
      }
    ).toArray();
  };  // End getMembers()

  addMember = () => {
    let member;
    if (this.props.household.size === 1) {
      member = { m_age: 30, m_role: 'spouse', m_disabled: false };
    } else {
      member = { m_age: 12, m_role: 'member', m_disabled: false };
    }

    this.props.addMember({ member });
  };  // End addMember()
  
  render() {
    const { snippets } = this.props;

    return (
      <div className='field-aligner two-column'>
        <div style={{ marginBottom: '.5em' }}>
          <ColumnHeader columnNum='One' />
          <ColumnHeader columnNum='Two'> { snippets.i_role }</ColumnHeader>
          <ColumnHeader columnNum='Three'>{ snippets.i_age }</ColumnHeader>
          <ColumnHeader columnNum='Four'>{ snippets.i_disabled }</ColumnHeader>
        </div>

        { this.getMembers() }

        <Button
          type={ 'button' }
          id={ 'addMember' }
          basic
          onClick={ this.addMember }>
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
  }
}  // End HouseholdContent()


// `props` is a cloned version of the original props. References broken.
const HouseholdStep = function ({
  setMemberIsDisabled,
  setMemberRole,
  setMemberAge,
  addMember,
  removeMember,
  navData,
  household,
  snippets,
}) {

  return (
    <FormPartsContainer
      title     = { snippets.i_title }
      clarifier = { snippets.i_clarifier }
      navData   = { navData }
      formClass = { `household` }>
      <HouseholdContent
        setMemberIsDisabled = { setMemberIsDisabled }
        setMemberAge = { setMemberAge }
        setMemberRole = { setMemberRole }
        addMember = { addMember }
        removeMember = { removeMember }
        household={ household }
        snippets={ snippets } />
    </FormPartsContainer>
  );

};  // End HouseholdStep()

export { HouseholdStep };
