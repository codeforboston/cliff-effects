import React from 'react';


const Surrounder = function ({ top, left, right, bottom, children }) {

  return (
    <div className = { `surrounder` }>
      <div className = { `top horizontal` } >
        { top }
      </div>

      <div className = { `middle horizontal` } >
        <div className = { `left vertical` } >
          { left }
        </div>
        <div className = { `center horizontal content` } >
          { children }
        </div>
        <div className = { `right vertical` } >
          { right }
        </div>
      </div>

      <div className = { `bottom horizontal` } >
        { bottom }
      </div>      
    </div>
  );

};  // End <Surrounder>


export { Surrounder };
