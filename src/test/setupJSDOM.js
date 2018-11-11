// Provide virtual browser object for enzyme testing
// https://airbnb.io/enzyme/docs/guides/jsdom.html

const { jsdom } = require('jsdom');

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = { userAgent: 'node.js' };

let copyProps = function (src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => {
      return typeof target[ prop ] === 'undefined';
    })
    .reduce((result, prop) => {
      return {
        ...result,
        [ prop ]: Object.getOwnPropertyDescriptor(src, prop),
      };
    }, {});
  Object.defineProperties(target, props);
};
copyProps(document.defaultView, global);
