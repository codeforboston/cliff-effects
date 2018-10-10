import React from 'react';
import { mount } from 'enzyme';
import { cloneDeep, set } from 'lodash';

import { StackedBarGraph } from '../../../forms/output/StackedBarGraph';
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';

jest.mock('react-chartjs-2', () => {
  const BarMock = () => null;

  return {
    Bar(props) {
      return <BarMock {...props} />;
    },
  };
});

describe('<StackedBarGraph>', () => {
  let client;

  const buildGraph = () => mount(<StackedBarGraph client={client} />);

  beforeEach(() => {
    client = cloneDeep(CLIENT_DEFAULTS);
  });

  it('matches snapshot', () => {
    expect(buildGraph()).toMatchSnapshot();

    set(client, 'current.hasSnap', true);
    expect(buildGraph()).toMatchSnapshot();

    set(client, 'current.earned', 100);
    expect(buildGraph()).toMatchSnapshot();

    set(client, 'future.earned', 200);
    expect(buildGraph()).toMatchSnapshot();

    set(client, 'current.earned', 300);
    expect(buildGraph()).toMatchSnapshot();

    set(client, 'current.hasSection8', true);
    expect(buildGraph()).toMatchSnapshot();

    set(client, 'future.earned', 400);
    expect(buildGraph()).toMatchSnapshot();
  });
});
