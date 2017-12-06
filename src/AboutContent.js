import React from 'react';
import { Header } from 'semantic-ui-react';

// CUSTOM COMPONENTS
import { ExternalLink } from './forms/formHelpers';

/** Too simplify the process of creating content for the 'About' page */

const AboutContent = function ( props ) {

  return (
    <wrapper>
      
      <Header as='h1' style={{ fontSize: '4em' }}>About the Cliff Effects Tool</Header>

      <Header as='h3'>What is this?</Header>
      <p>This tool can help show how a change in income affects how much someone receives in public assistance from SNAP and Section 8 Housing Voucher benefits. It was designed for the case managers at <ExternalLink href='http://www.prohope.org/'>Project Hope</ExternalLink> with the aim of helping to predict changes in their client's benefits.</p>

      <Header as='h3'>Why are you doing this?</Header>
      <p>When a slight change in a household’s circumstances - say, a slight pay raise - disproportionately lowers their benefits, that’s called a “cliff effect”. The household is working to increase what they earn, but they end up with a net loss that actually puts them further behind. These “cliff effects” prevent many families from actually getting off of public assistance programs.</p>
      <p>Cliff effects are also very hard to predict. The interactions between income, household size, many other criteria, and the effects of the programs themselves impact each other in unexpected ways. We're exploring ways to deal with this issue of complexity and help families better understand and predict their situation.</p>
      <p><a href='#about/#learn-more'>Learn more about cliff effects</a></p>

      <Header as='h3'>How do I use this tool?</Header>
      <p>Go step-by-step to add information about a client's current benefits, household, income, and other relevant information. This information will be used to predict the client's approximate benefit amount. When you reach the end, change the 'Future Income' amount to see how a change in earned income will cause a change in benefit amount. Currently, the SNAP and Section 8 Housing Voucher programs are both available. Note that predictions may not directly match up with a client’s current benefit amount. The app’s focus is the amount of change that occurs in benefits when there are changes in earned income.</p>
      <p>Please note that this app does not store user data, so <strong>if you refresh the page the data you've entered will be lost</strong>. Each time you go through the app, it's a clean slate.</p>

      <Header as='h3'>Who's doing this?</Header>
      <p>This application is part of a project made possible by a Boston Foundation Open Door Grant to the University of Massachusetts Boston's <ExternalLink href='https://www.umb.edu/csp'>Center for Social Policy</ExternalLink>, in close partnership with <ExternalLink href='http://www.prohope.org/'>Project Hope</ExternalLink> and <ExternalLink href='http://www.codeforboston.org/'>Code for Boston</ExternalLink>. The Center for Social Policy is the lead partner for the <ExternalLink href='https://onsolidgroundma.org/'>On Solid Ground Coalition</ExternalLink>.</p>
      <p>The code base is being maintained <ExternalLink href='https://github.com/codeforboston/cliff-effects'>on GitHub</ExternalLink> by <ExternalLink href='http://www.codeforboston.org/'>Code for Boston</ExternalLink> volunteers. For more information or to report a bug, please contact andrew@codeforboston.org.</p>

      <Header as='h3'>Thank You</Header>
      <p>Here's a special thank you to all the Code for Boston volunteers who brought you this application, especially Annie LaCourt, Isaac Chansky, Michelle Bernstein, Alec Danaher, Sasha Maryl, Drew Love, Liani Lye, Liam Morley, Nick Francisci, Stephen Chin, Shameek Poddar, Will McIntosh, Don Blair, Ethan Strominger, Nick Lee, Jonathan Marcus, and Emily Wasserman.</p>

      <Header as='h3' name={'learn-more'}>Learn More</Header>
      <p>A bit more about cliff effects:</p>
      <ul>
        <li><ExternalLink href='https://www.youtube.com/watch?v=BveX_rID4_E'>https://www.youtube.com/watch?v=BveX_rID4_E</ExternalLink></li>
        <li><ExternalLink href='http://www.nccp.org/projects/files/NCCP_CO_presentation07.pdf'>http://www.nccp.org/projects/files/NCCP_CO_presentation07.pdf</ExternalLink></li>
        <li><ExternalLink href='https://www.umb.edu/editor_uploads/images/centers_institutes/center_social_policy/The_Road_to_the_Cliff_Edge_08.16.17.pdf'>https://www.umb.edu/editor_uploads/images/centers_institutes/center_social_policy/The_Road_to_the_Cliff_Edge_08.16.17.pdf</ExternalLink></li>
      </ul>

      <br/>
      <p><strong>Important note:</strong> This application is a minimum viable product. It should not be used as the sole tool to understand a client's eligibility for SNAP and Section 8, or for any other public assistance program.</p>

    </wrapper>
  );

};  // End AboutContent(<>)


export { AboutContent };
