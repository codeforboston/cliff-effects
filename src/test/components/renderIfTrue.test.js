import React from 'react';
import renderer from 'react-test-renderer';

import { renderIfTrue } from '../../components/renderIfTrue';

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

describe('renderIfTrue returns', () => {

  test('given component on `true` condition', async () => {
    const rendered = renderer.create(
      <div>Test content</div>
    );

    var returned = renderIfTrue(true, rendered),
        renderedStr = JSON.stringify(rendered.toJSON()),
        returnedStr = JSON.stringify(returned.toJSON());
    await sleep(5 * 60 * 1000);
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
