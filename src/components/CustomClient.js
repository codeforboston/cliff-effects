import React from 'react';
import { Divider } from 'semantic-ui-react';

// Reference
// https://codepen.io/hartzis/pen/VvNGZP?editors=0010
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader

const getText = function ( evnt, loadClient ) {

    evnt.preventDefault();

    let reader = new FileReader(),
        file = evnt.target.files[0];

    reader.onload = ( readerEvnt ) => {

      var fileText = reader.result

      if ( fileText.indexOf('{"client":{"current"') > -1 ) {
        var json = JSON.parse( fileText );
        loadClient( json );
      }

    }

    reader.readAsText(file);
}


const CustomClient = function ({ mayLoadCustomClient, loadClient }) {

  if ( mayLoadCustomClient ) {
    return (
      <div>
        <input type={'file'} onChange={function ( evnt ) { getText( evnt, loadClient ) }} />
        <Divider />
      </div>
    );
  } else {
    return null;
  }

};  // End <CustomClient>

export { CustomClient };
