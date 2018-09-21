import React from 'react';
import { Header, Message } from 'semantic-ui-react';
import { ExternalLink } from '../forms/formHelpers';

// CUSTOM COMPONENTS

/** Todo simplify the process of creating content for the 'About' page */

const AboutContent = function ({ snippets }) {
  return (
    <div>

      <Header
        as='h1'
        style={{ fontSize: '4em' }}>
        { snippets.aboutPageHeader_v1 }
      </Header>

      <Header as='h3'>{ snippets.whatForHeader_v1 }</Header>
      <Message>{ snippets.whatForImportantNote_v1 }</Message>
      <p>{ snippets.whatFor_v2 }</p>

      <Header as='h3'>{ snippets.whyHeader_v1 }</Header>
      <p>{ snippets.why1_v1 }</p>
      <p>{ snippets.why2_v1 }</p>

      <ul>
        <li>
          <ExternalLink href="https://www.youtube.com/watch?v=BveX_rID4_E">
            { snippets.videoLinkText_v1 }
          </ExternalLink>
        </li>

        <li>
          <ExternalLink href="http://www.nccp.org/projects/files/NCCP_CO_presentation07.pdf">
            { snippets.quantLinkText_v1 }
          </ExternalLink>
        </li>

        <li>
          <ExternalLink href="https://www.umb.edu/editor_uploads/images/centers_institutes/center_social_policy/The_Road_to_the_Cliff_Edge_08.16.17.pdf">
            { snippets.benefitsLinkText_v1 }
          </ExternalLink>
        </li>
      </ul>

      <Header as='h3'>{ snippets.howToUseHeader_v1 }</Header>
      <p>{ snippets.howToUse_v1 }</p>
      <Message>{ snippets.howToUseNote_v1 }</Message>

      <Header as='h3'>{ snippets.whoMadeThisHeader_v1 }</Header>
      <p>{ snippets.whoMadeThis1_v1 }</p>
      <p>{ snippets.whoMadeThis2_v1 }</p>
      <p>{ snippets.whoMadeThis3_v1 }</p>

    </div>
  );

};  // End AboutContent(<>)


export { AboutContent };
