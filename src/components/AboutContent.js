import React from 'react';
import { Header, Message } from 'semantic-ui-react';

// CUSTOM COMPONENTS
import { ExternalLink } from '../forms/formHelpers';
import { interpolateSnippets } from '../utils/interpolation';

/** Todo simplify the process of creating content for the 'About' page */

const namesList = [ 'Annie LaCourt', 'Isaac Chansky', 'Michelle Bernstein', 'Alec Danaher', 'Sasha Maryl', 'Drew Love', 'Liani Lye', 'Andrew Cunningham', 'Liam Morley', 'Nick Francisci', 'Stephen Chin', 'Shameek Poddar', 'Will McIntosh', 'Andrew Seeder', 'Ben Lewis', 'Don Blair', 'Ethan Strominger', 'Nick Lee', 'Jonathan Marcus', 'Emily Wasserman', 'Ethan Blackwood', 'Valerie Kenyon' ];

const inlineComponents = {
  importantNote:   <strong />,
  projectHope:     <ExternalLink href='http://www.prohope.org/'>Project Hope</ExternalLink>,
  refreshWarning:  <strong />,
  csp:             <ExternalLink href='https://www.umb.edu/csp'>Center for Social Policy</ExternalLink>,
  cfb:             <ExternalLink href='http://www.codeforboston.org/'>Code for Boston</ExternalLink>,
  solidGround:     <ExternalLink href='https://onsolidgroundma.org/'>On Solid Ground Coalition</ExternalLink>,
  github:          <ExternalLink href='https://github.com/codeforboston/cliff-effects'>GitHub</ExternalLink>,
  contactEmail:    <a href="mailto:andrew@codeforboston.org">andrew@codeforboston.org</a>,
  namesExceptLast: <span>{ namesList.slice(0, -1).join(', ') }</span>,
  lastName:        <span>{ namesList[ namesList.length - 1 ] }</span>,
};

const AboutContent = function ({ snippets }) {
  snippets = interpolateSnippets(snippets, inlineComponents);

  return (
    <div>

      <Header
        as='h1'
        style={{ fontSize: '4em' }}>
        { snippets.aboutPageHeader }
      </Header>

      <Header as='h3'>{ snippets.whatForHeader }</Header>
      <Message>{ snippets.whatForImportantNote }</Message>
      <p>{ snippets.whatFor }</p>

      <Header as='h3'>{ snippets.whyHeader }</Header>
      <p>{ snippets.why1 }</p>
      <p>{ snippets.why2 }</p>

      <ul>
        <li>
          <ExternalLink href="https://www.youtube.com/watch?v=BveX_rID4_E">
            { snippets.videoLinkText }
          </ExternalLink>
        </li>

        <li>
          <ExternalLink href="http://www.nccp.org/projects/files/NCCP_CO_presentation07.pdf">
            { snippets.quantLinkText }
          </ExternalLink>
        </li>

        <li>
          <ExternalLink href="https://www.umb.edu/editor_uploads/images/centers_institutes/center_social_policy/The_Road_to_the_Cliff_Edge_08.16.17.pdf">
            { snippets.benefitsLinkText }
          </ExternalLink>
        </li>
      </ul>

      <Header as='h3'>{ snippets.howToUseHeader }</Header>
      <p>{ snippets.howToUse }</p>
      <Message>{ snippets.howToUseNote }</Message>

      <Header as='h3'>{ snippets.whoMadeThisHeader }</Header>
      <p>{ snippets.whoMadeThis1 }</p>
      <p>{ snippets.whoMadeThis2 }</p>
      <p>{ snippets.whoMadeThis3 }</p>

    </div>
  );

};  // End AboutContent(<>)


export { AboutContent };
