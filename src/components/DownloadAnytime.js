// REACT COMPONENTS
import React from 'react';
import { Button } from 'semantic-ui-react';

// CUSTOM COMPONENTS
import DownloadFile from './DownloadFile';


const DownloadAnytime = function ( props ) {

  return (
    <DownloadFile data={{client: props.client}}>
      <Button type='button' color='teal' size='medium' className={'fixed'} id={'download_data_fixed'}>
        Download Data
      </Button>
    </DownloadFile>   
  );

};  // End <DownloadAnytime>


export { DownloadAnytime };
