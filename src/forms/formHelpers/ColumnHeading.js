import React from 'react';
import { Header } from 'semantic-ui-react';

/**
 * @todo description
 * 
 * @param {Object} props
 * @param {string} props.type - Appended as class `${type}-column`
 * @param {string} props.colName - Appended as class
 * @param {Object} props.style
 * @param {*} props.children
 *
 * @returns {Object} - React Element
 */
const ColumnHeading = function ({ children, colName, style, type }) {
  const classes = `${type}-column header ${colName}`;
  return (
    <Header as='h4' className={classes} style={style} color='teal'>
      { children }
    </Header>
  );
};

export default ColumnHeading;
