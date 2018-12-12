// REACT COMPONENTS
import React from 'react';
import { Header } from 'semantic-ui-react';


/** <h1> styles available for form (and other) text.
*
* @function
* @param {object} props
* @property {string} props.subheading - For when some
*     kind of clarifier is needed.
* @property {object} props.children - Ususally a string
*     to be shown as the heading text.
*
* @returns Component
*/
const ContentH1 = function ({ subheading, children }) {

  if (!children) {
    return null;
  }

  return (
    <div className={ `text-h1` } >
      <div /> {/** div here to make sure header margin doesn\'t collapse */}
      <Header
        as    = { `h3` }
        style = {{ display: `inline-block` }}>
        { children }
      </Header>
      <ContentSubH1>{ subheading }</ContentSubH1>
      <br />
    </div>
  );

};  // Ends <ContentH1>


/** A clearer way than a ternary operator to have a possible
*     subheader and separate styling.
*
* @function
* @param {object} props
* @property {object} props.children - Contents of this element
*
* @returns Component
*/
const ContentSubH1 = function ({ children }) {

  if (!children) {
    return null;
  }

  return (
    <div
      className = { `text-sub-h1` }
      style     = {{ display: `block`, textAlign: `left` }}>
      { children }
    </div>
  );

};  // Ends <ContentSubH1>


/* @todo To discuss: Should form-specific headings be in a different file? */


/** Weekly/Monthly/Yearly headings combined for the
*     top of columns that need those time intervals.
*
* @function
* @param {object} props
* @property {object} props.type - Very fragile. Used to
*     create the heading for the column for labels of the
*     inputs - labels like 'Earned Income'. This was created
*     for income and expenses columns to try to cue the user
*     about the info they were putting in. The current uses
*     are to create the headings 'Income Type' and 'Expenses
*     Type', so the user will have an extra hint about what
*     information they should be giving at that moment.
*
* @returns Component
*/
const IntervalColumnHeadings = function ({ type }) {

  let styles      = { fontSize: `14px` },
      toUpper     = function (letter) {
        return letter.toUpperCase();
      },
      asLowerCase = type.toLowerCase(),
      toReplace   = /\b[a-z]/g,
      columnTitle = asLowerCase.replace(toReplace, toUpper) + ` Type`;

  return (
    <div style={{ display: `inline-block` }}>
      <ColumnHeading
        type    = { type }
        colName = { `weekly` }
        style   = { styles }>
        Weekly
      </ColumnHeading>
      <ColumnHeading
        type    = { type }
        colName = { `monthly` }
        style   = { styles }>
        Monthly
      </ColumnHeading>
      <ColumnHeading
        type    = { type }
        colName = { `yearly` }
        style   = { styles }>
        Yearly
      </ColumnHeading>
      <ColumnHeading
        type        = { type }
        colName     = { type }
        style       = { styles }
        columnTitle = { columnTitle }>
        { columnTitle }
      </ColumnHeading>
    </div>
  );

};  // Ends <IntervalColumnHeadings>


/** Style for text at the tops of columns, like
*     cashflow or household columns.
*
* @function
* @param {object} props
* @property {string} props.type - Used for element classes
* @property {string} props.colName - Also for the element classes
* @property {object} props.style - Style override
* @property {object} props.children - Usually the heading text
*
* @returns Component
*/
const ColumnHeading = function ({ type, colName, style, children }) {
  // @todo Move 'cashflow' stuff elsewhere
  let classes = type + `-column cashflow-column header ` + colName;
  return (
    <Header
      as        = { `h4` }
      className = { classes }
      style     = { style }
      color     = { `teal` }>
      { children }
    </Header>
  );
};  // Ends <ColumnHeading>


export {
  ContentH1,
  ContentSubH1,
  ColumnHeading,
  IntervalColumnHeadings,
};
