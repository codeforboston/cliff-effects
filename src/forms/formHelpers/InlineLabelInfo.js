import React from 'react';

const style = { marginLeft: '1em' };

/**
 * @todo description
 * 
 * @param {Object} props
 * @param {*} props.children
 *
 * @returns {Object} - React Element
 */
const InlineLabelInfo = function ({ children }) {
  var labelInfoDisplay = 'hidden'; // Will be '' in future

  // return (
  //   <wrapper className = { 'label-info info-revealer' + labelInfoDisplay } style = {{
  //     position: 'relative', top: '-0.5em',
  //     marginLeft: '1em', padding: '0.1em 0.2em',
  //     textAlign: 'left', verticalAlign: 'middle',
  //     border: '1px solid black'
  //   }}>
  //     <wrapper className='info-indicator'>i</wrapper>
  //     <wrapper className='info-tooltip'>{props.children}</wrapper>
  //   </wrapper>
  // );

  return (
    <wrapper className={`label-info ${labelInfoDisplay}`} style={style}>
      { children }
    </wrapper>
  );
};

// Possible tooltip version of labels:
// (could be made official in the Row creator with conditionals)
// <label>Earned Income
//   <style type='display on hover handled in css'></style>
//   <div
//     className={ 'info-revealer' }
//     style={{
//       position: 'relative',
//       display: 'inline-block',
//       fontSize: '10px',
//       border: '1px solid black',
//       margin: '1em',
//       top: '-0.5em',
//       textAlign: 'center',
//       width: '1.6em',
//       height: '1.6em'
//     }}>
//     <div style={{ position: 'relative', top: '-0.2em' }}>i</div>
//     <div
//       className={ 'info-tooltip' }
//       style={{ position: 'absolute', padding: '.2em' }}
//     >
//       Weekly income = hourly wage times average number of work hours per week
//     </div>
//   </div>
// </label>

export default InlineLabelInfo;
