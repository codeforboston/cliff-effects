import React from 'react';

import ColumnHeading from './ColumnHeading';

const wrapperStyle = { display: 'inline-block' };

const baseStyles = {
  marginTop: '0.7em',
  marginBottom: '0.7em',
  display: 'inline-block',
  fontSize: '14px'
};

const inputStyles = {
  ...baseStyles,
  width: '7em',
  textAlign: 'center'
};

const lefterStyles = {
  ...inputStyles,
  marginRight: '0.2em'
};

const rightStyles = {
  ...inputStyles,
  marginRight: '0.9em'
};

/**
 * @todo description
 * 
 * @param {Object} props
 * @param {string} props.type - Appended to <ColumnHeading>'s as class
 *
 * @returns {Object} - React Element
 */
const IntervalColumnHeadings = function ({ type }) {
  const columnTitle = type.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase()) + " Type";

  return (
    <wrapper style={wrapperStyle}>
      <ColumnHeading type={type} colName='weekly' style={lefterStyles}>Weekly</ColumnHeading>
      <ColumnHeading type={type} colName='monthly' style={lefterStyles}>Monthly</ColumnHeading>
      <ColumnHeading type={type} colName='yearly' style={rightStyles}>Yearly</ColumnHeading>
      <ColumnHeading type={type} colName={type} style={baseStyles} columnTitle={columnTitle}>
        { columnTitle }
      </ColumnHeading>
    </wrapper>
  );
};

export default IntervalColumnHeadings;
