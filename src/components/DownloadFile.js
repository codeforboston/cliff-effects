import React from 'react';

/**
 * Download file link.
 * 
 * @param props {object}
 * @param props.children {string|null} - Optional link text
 * @param props.filename {string}
 * @param props.url {string}
 */
const DownloadFile = ({ children = "Download file", filename, url }) =>
  <a href={url} download={filename}>
    {children}
  </a>;

export default DownloadFile;
