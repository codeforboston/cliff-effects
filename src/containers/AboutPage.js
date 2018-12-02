import React from 'react';
import {
  Header,
  Message,
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import { ExternalLink } from '../components/ExternalLink';
import { PageLayout } from '../components/PageLayout';


const AboutPage = ({ translations }) => {
  return (
    <PageLayout>
        
      <Header
        className = { `ac-header` }
        as        = { `h1` }>
        { translations.i_aboutPageHeader }
      </Header>

      <Header as={ `h3` }>{ translations.i_whatForHeader }</Header>
      <Message>{ translations.i_whatForImportantNote }</Message>
      <p>{ translations.i_whatFor }</p>

      <Header as={ `h3` }>{ translations.i_whyHeader }</Header>
      <p>{ translations.i_why1 }</p>
      <p>{ translations.i_why2 }</p>

      <ul>
        <li>
          <ExternalLink href={ `https://www.youtube.com/watch?v=BveX_rID4_E` }>
            { translations.i_videoLinkText }
          </ExternalLink>
        </li>

        <li>
          <ExternalLink href={ `http://www.nccp.org/projects/files/NCCP_CO_presentation07.pdf` }>
            { translations.i_quantLinkText }
          </ExternalLink>
        </li>
      </ul>

      <Header as={ `h3` }>{ translations.i_howToUseHeader }</Header>
      <p>{ translations.i_howToUse }</p>
      <Message>{ translations.i_howToUseNote }</Message>

      <Header as={ `h3` }>{ translations.i_whoMadeThisHeader }</Header>
      <p>{ translations.i_whoMadeThis1 }</p>
      <p>{ translations.i_whoMadeThis2 }</p>
      <p>{ translations.i_whoMadeThis3 }</p>

    </PageLayout>
  );
};  // Ends <AboutPage>


export { AboutPage };
