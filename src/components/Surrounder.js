import React from 'react';


const Surrounder = function ({ Top, Left, Right, Bottom, children }) {

  let contents = { top: null, left: null, right: null, bottom: null };

  if (Top) {
    contents.top = (<div className={ `top horizontal` }>{ Top }</div>);
  }
  if (Left) {
    contents.left = (<div className={ `left vertical` }>{ Left }</div>);
  }
  if (Right) {
    contents.right = (<div className={ `right vertical` }>{ Right }</div>);
  }
  if (Bottom) {
    contents.bottom = (<div className={ `bottom horizontal` }>{ Bottom }</div>);
  }

  return (
    <div className={ `surrounder` }>
      { contents.top }

      <div className={ `middle horizontal` }>
        { contents.left }

        <div className={ `center horizontal content` }>
          { children }
        </div>

        { contents.right }
      </div>

      { contents.bottom }  
    </div>
  );

};  // Ends <Surrounder>


export { Surrounder };
