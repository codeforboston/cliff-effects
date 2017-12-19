import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BenefitsTable } from '../../forms/BenefitsTable';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

configure({ adapter: new Adapter() });

test('Benefits table renders correctly', () => {
  const rendered = renderer.create(
    <BenefitsTable client={CLIENT_DEFAULTS}/>
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});