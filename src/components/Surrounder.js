import React from 'react';


const Surrounder = function ({ Top, Left, Right, Bottom, children }) {

  return (
    <div className = { `surrounder` }>
      <div className = { `top horizontal` } >
        { Top ? Top : null }
      </div>

      <div className = { `middle horizontal` } >
        <div className = { `left vertical` } >
          { Left ? Left : null }
        </div>
        <div className = { `center vertical content` } >
          { children }
        </div>
        <div className = { `right vertical` } >
          { Right ? Right : null }
        </div>
      </div>

      <div className = { `bottom horizontal` } >
        { Bottom ? Bottom : null }
      </div>      
    </div>
  );

};  // End <Surrounder>


export { Surrounder };
