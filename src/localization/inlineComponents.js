/** Contains inline components that can be substituted into snippets
 *  using the interpolation functions in utls/interpolation.js. See en.js
 *  for examples of usage.
 */

import React from 'react';
import { Icon } from 'semantic-ui-react';
import { ExternalLink } from '../forms/formHelpers';
import contributors from './contributors';

export default {
  // About page
  __importantNote__:          <strong />,
  __projectHope__:            <ExternalLink href='http://www.prohope.org/'>Project Hope</ExternalLink>,
  __refreshWarning__:         <strong />,
  __centerForSocialPolicy__:  <ExternalLink href='https://www.umb.edu/csp'>Center for Social Policy</ExternalLink>,
  __codeForBoston__:          <ExternalLink href='http://www.codeforboston.org/'>Code for Boston</ExternalLink>,
  __onSolidGroundCoalition__: <ExternalLink href='https://onsolidgroundma.org/'>On Solid Ground Coalition</ExternalLink>,
  __github__:                 <ExternalLink href='https://github.com/codeforboston/cliff-effects'>GitHub</ExternalLink>,
  __contactEmail__:           <a href="mailto:andrew@codeforboston.org">andrew@codeforboston.org</a>,
  __namesExceptLast__:        <span>{ contributors.slice(0, -1).join(', ') }</span>,
  __lastName__:               <span>{ contributors[ contributors.length - 1 ] }</span>,
  // Footer
  __heartIcon__:
    <Icon
      name='heart'
      size='small' />,
};
