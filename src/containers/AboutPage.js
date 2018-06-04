import React from 'react';

import { AboutContent } from '../components/AboutContent';
import { PageLayout } from '../components/PageLayout';

const AboutPage = ({ snippets }) => {
  return (
    <div>
      <PageLayout>
        <AboutContent snippets={ snippets } />
      </PageLayout>
    </div>
  );
};

export default AboutPage;
