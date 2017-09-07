import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Route
} from 'react-router-dom'
import ReactRedirect from 'react-redirect';
import HomePage from './homePage'
// import AboutPage from './aboutPage'
import LoginPage from './loginPage'
import VisitPage from './visitPage'
import ClientDetailPage from './clientDetailPage'
import ClientIntakePage from './clientIntakePage'


/** About page links to project hope about page
* 
* @see Uses {@link https://www.npmjs.com/package/react-redirect}
* 
* @todo IS THIS RUNNING AS IF FROM A SERVER ON GH-PAGES BRANCH?
* "If you use it on server, call ReactRedirect.rewind() after
* rendering components to string to retrieve the redirect location
* given to the innermost ReactRedirect. You can then embed this
* title into HTML page template.
* Because this component keeps track of mounted instances, you have
* to make sure to call rewind on server, or you'll get a memory leak."
* @todo For some reason, when clicking 'back' on the project hope
* page, you have to go back twice to get back to our page. I've tried
* this elsewhere (like from issue #11) and it doesn't happen. Is this
* a local development issue? A running-on-a-server issue? Both tests
* were on Chrome v60.0.3112.113
*/
var AboutPage = React.createClass({
  render: function () {
    // redirect to "www.prohope.org/about" while this component is mounted 
    return (
      <ReactRedirect location='http://www.prohope.org/about/'>
      </ReactRedirect>
    );
  }
});

// Change HashRouter tags below to Router tags to turn off hash routing; only used to be compatible with GitHub Pages

class App extends React.Component {
  state = {loggedIn: false}
  render() {
    return(
  <HashRouter>
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route path="/about" component={AboutPage}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/visit/:clientId/:visitId" component={VisitPage}/>
      <Route path="/detail/:id" component={ClientDetailPage}/>
      <Route path="/intake" component={ClientIntakePage}/>
    </div>
  </HashRouter>)
  }
}

export default App;
