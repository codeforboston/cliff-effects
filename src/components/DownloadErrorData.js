import React from 'react';

import DownloadFileAs from './DownloadFileAs';

/**
 * Download provided error as JSON.
 * @extends React.PureComponent
 * 
 * @param props {object}
 * @param props.client {object}
 * @param props.error {Error}
 */
class DownloadErrorData extends React.PureComponent {
  render() {
    const { client, error } = this.props;

    const data = {
      client: client,
      error: {
        message: error.message,
        stack: error.stack
      }
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const filename = `cliff-effects-${new Date().toISOString().slice(0, 10)}`
  
    return (
      <DownloadFileAs url={url} defaultFilename={filename}>
        Download error report
      </DownloadFileAs>
    );
  }
}

export default DownloadErrorData;
