import React from 'react';
import { mount } from 'enzyme';
import { defaultsDeep } from 'lodash';

import { ExpensesOther } from '../../forms/ExpensesOther';
import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

const GREATER_THAN_ZERO = 1;

const displayRow = (page, generic) => {
  return page.find(`CashFlowDisplayRow[generic="${generic}"]`);
};
const inputRow = (page, generic) => {
  return page.find(`CashFlowInputsRow[generic="${generic}"]`);
};

describe('<ExpensesOther>', () => {
  const defaultProps = {
    time:              'monthly',
    updateClientValue: jest.fn(),
  };

  const buildPage = (clientValues = {}) => {
    const client = defaultsDeep({}, clientValues, CLIENT_DEFAULTS.current);
    return mount(<ExpensesOther
      { ...defaultProps }
      timeState={ client } />);
  };

  it('renders housing costs control when related costs', () => {
    const homeless = { housing: 'homeless' }; // no housing costs
    expect(displayRow(buildPage(homeless), 'housingCosts')).toHaveLength(0);

    const renter = { housing: 'renter', rent: GREATER_THAN_ZERO };
    expect(displayRow(buildPage(renter), 'housingCosts')).toHaveLength(1);
  });

  it('renders dependent care control when costs unrelated to transportation', () => {
    const transportCosts = { childTransportation: GREATER_THAN_ZERO };
    expect(displayRow(buildPage(transportCosts), 'dependentCare')).toHaveLength(0);

    const childCare = { childDirectCare: GREATER_THAN_ZERO };
    expect(displayRow(buildPage(childCare), 'dependentCare')).toHaveLength(1);
  });

  it('renders dependent transport control when related costs', () => {
    const childCare = { childDirectCare: GREATER_THAN_ZERO };
    expect(displayRow(buildPage(childCare), 'dependentTransport')).toHaveLength(0);

    const transportCosts = { childTransportation: GREATER_THAN_ZERO };
    expect(displayRow(buildPage(transportCosts), 'dependentTransport')).toHaveLength(1);
  });

  it('renders medical costs control when related costs', () => {
    expect(displayRow(buildPage(), 'medicalTotal')).toHaveLength(0);
    
    const medicalCosts = { otherMedical: GREATER_THAN_ZERO };
    expect(displayRow(buildPage(medicalCosts), 'medicalTotal')).toHaveLength(1);
  });

  it('renders cable and internet costs control when not homeless', () => {
    const homeless = { housing: 'homeless' };
    expect(inputRow(buildPage(homeless), 'otherExpensesCable')).toHaveLength(0);

    const renter = { housing: 'renter' };
    expect(inputRow(buildPage(renter), 'otherExpensesCable')).toHaveLength(1);
  });

  it('renders utilities costs control when not homeless', () => {
    const homeless = { housing: 'homeless' };
    expect(inputRow(buildPage(homeless), 'otherExpensesUtilities')).toHaveLength(0);

    const renter = { housing: 'renter' };
    expect(inputRow(buildPage(renter), 'otherExpensesUtilities')).toHaveLength(1);
  });
});
