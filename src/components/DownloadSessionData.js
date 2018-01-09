import React from 'react';

import DownloadFile from './DownloadFile';

/**
 * Download link for various data on the current session.
 * @extends React.PureComponent
 * 
 * @param props {object}
 * @param props.client {object}
 */
class DownloadSessionData extends React.PureComponent {
  render() {
    const { client } = this.props;

    const json = JSON.stringify({ client: client });
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const filename = 'cliff-effects-data.json';

    return (
      <DownloadFile filename={filename} url={url} >
        Download session data
      </DownloadFile>
    );
  }
}

export default DownloadSessionData;
