import React from 'react';
import { Menu, Image, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from './logo.png'

// const SimpleMenu = (props) => (
//   <Menu inverted color='teal'>
//         <Menu.Item>
//           <Link to="/"><Image src={logo} size='tiny' /></Link>
//         </Menu.Item>
//         <Menu.Item name='navigation'>
//         {props.client ? 
//           (<Link to={`/detail/${props.client.clientId}`}>Back to Client Detail</Link>) :
//           (<Link to="/">Go Home</Link>)}         
//         </Menu.Item>
//         {props.client ? 
//           (<Header as='h2' 
//                     content={'Visit #' + props.visit + ' for ' + props.client.name}
//                     inverted 
//                     style={{ fontSize: '2em', marginLeft: '1em', marginBottom: '1em', marginTop: '1em' }} />) : 
//         false}
//         <Menu.Menu position='right'>
//           <Menu.Item onClick={() => props.save(false)}>
//             Save
//           </Menu.Item>
//           <Menu.Item onClick={() => props.save(true)}>
//             Save and Exit
//           </Menu.Item>
//         </Menu.Menu>
//       </Menu>
// )

// This is for the first tests. We will add features back in
// as they become functional
// Change component name to something more descriptive. "FormHeader"?
const SimpleMenu = (props) => (
  <Menu inverted color='teal'>
    <Menu.Item>
      <Link to="/about"><Image src={logo} size='tiny' /></Link>
    </Menu.Item>
  </Menu>
)

export default SimpleMenu;