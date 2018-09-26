import React from 'react';
import renderer from 'react-test-renderer';

import { renderIfTrue } from '../../components/renderIfTrue';

describe('renderIfTrue returns', () => {

  test('given component on `true` condition', () => {
    const rendered = renderer.create(
      <div>Test content</div>
    );

    var returned = renderIfTrue(true, rendered),
        renderedStr = JSON.stringify(rendered.toJSON()),
        returnedStr = JSON.stringify(returned.toJSON());

    expect(renderedStr).toEqual(returnedStr);
  });

  test('null on `false` condition', () => {
    const rendered = renderer.create(
      <div>Test content</div>
    );

    var returned = renderIfTrue(false, rendered);

    expect(returned).toEqual(null);
  });

});
