import React from 'react';

/**
 * Download file link.
 * 
 * @param props {object}
 * @param props.children {string|null} - Optional link text
 * @param props.data {object} - Data to be saved
 * @param props.filename {string}
 */
const DownloadFile = ({ children = 'Download file', data, filename = 'cliff-effects.json', ...otherProps }) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  return (
    <a {...otherProps} href={url} download={filename}>
      {children}
    </a>
  );
};

export default DownloadFile;
