import React from 'react';
import { shallow } from 'enzyme';
import { ShowOnYes } from '../../forms/ShowOnYes';
/**
* Factory function to create a ShallowWrapper for the App component.
* @function setup
* @param {object} props - Component props specific to this setup.
* @param {object} state - Initial state for setup.
* @returns {ShallowWrapper}
*/
const setup = (props = {}, state = null) => {
const wrapper = shallow(<ShowOnYes { ...props } />)
if (state) wrapper.setState(state);
return wrapper;
}
/**
* Return ShallowWrapper containing node(s) with the given data-test value.
* @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
* @param {string} val - Value of data-test attribute for search.
* @returns {ShallowWrapper}
*/
const findByTestAttr = (wrapper, val) => {
return wrapper.find(`[data-test="${val}"]`);
}
test('renders without error', () => {
const wrapper = setup();
const testComponent = findByTestAttr(wrapper, 'component-showonyes');
expect(testComponent.length).toBe(1);
});