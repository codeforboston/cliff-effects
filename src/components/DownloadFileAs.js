import React from 'react';

import DownloadFile from './DownloadFile';

/**
 * Download file with editable name.
 * @extends React.Component
 * 
 * @param props {object}
 * @param props.children {string} - Link label
 * @param props.defaultFilename {string} - Initial value of filename
 * @param props.url {string} - URL to file
 */
class DownloadFileAs extends React.Component {
  updateFilename = filename => this.setState({ filename: filename });

  constructor(props) {
    super(props);
    this.state = { filename: props.defaultFilename };
  }

  render() {
    const { children, data } = this.props;
    const { filename } = this.state;

    return (
      <div>
        <input onChange={this.updateFilename} value={filename} />
        <DownloadFile data={data} filename={filename}>
          {children}
        </DownloadFile>
      </div>
    );
  }
}

export default DownloadFileAs;
