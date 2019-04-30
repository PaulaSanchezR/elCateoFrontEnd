import React, { Component } from 'react';
import { Switch , NavLink, Route }  from 'react-router-dom'
   

import logo from './elcateo.JPG';
import './App.css';
import axios from 'axios';

import Signup from './components/user-pages/Signup'
import Login from './components/user-pages/Login'
import Addtree from './components/tree-pages/AddTree'



class App extends Component {
  constructor(){
    super()
// we are checking if the customer is checkin
//the first time has to be null
    this.state ={
      currentUser: null,
    }
 }

 // app.js only will load once
 //componentDimount go the the data that I want all the times

 componentDidMount(){
   console.log("entro a componentdidmount")
   //talk with the back end
   axios.get("http://localhost:5000/api/checkuser", { withCredential:true})
     .then( responseFromBackend => {
       console.log("check",responseFromBackend.data)
      const { theUser } = responseFromBackend.data;
      this.syncCurrentUser(theUser);
       
     })
     
 }
 // if I already login update the state
//  pass the method to my child asking if we have a user
syncCurrentUser(user){
  console.log("user ==", user)
  this.setState ({ currentUser:user});
}
  render() {
    return (
      <div id="root">
        <div class="wrapper">
            <div class="sidebar" data-color="black">
                <div class="sidebar-background"></div>
              <div class="logo">
                  <div class="logo-img">
                    <img src={logo} alt="My logo" style={{height:100}}/>  
                  </div>
              </div>
        </div>
          <div class="main-panel">
            <div className="App">
              <header>
              </header>
              {this.state.currentUser ? ( 
              <section> <h2> Your are signed up!</h2>
                <p> Welcome , { this.state.currentUser.username}</p>
                
                </section>) : ( <Switch>
                <Route exact path = "/" render = { () =>
                  <Login currentUser={ this.state.currentUser}
                  onUserChange={ userDoc => this.syncCurrentUser(userDoc)} />
                  }> 
                </Route>
                 <Route exact path = "/signup" render={ ()=>
                  <Signup currentUser={ this.state.currentUser} 
                  onUserChange={ userDoc => this.syncCurrentUser(userDoc)}/>
                } >
                </Route>
              </Switch> )

              }
             
          </div>
          </div>
          </div>
       </div>
   );
  }
}

export default App;
