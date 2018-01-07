import React from 'react';

/**
 * Download file link.
 * 
 * @param props {object}
 * @param props.children {string|null} - Optional link text
 * @param props.filename {string}
 * @param props.url {string}
 */
const DownloadFile = ({ children = "Download file", filename, url, onClick }) =>
  <a href={url} download={filename} onClick={onClick}>
    {children}
  </a>;

export default DownloadFile;
