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
