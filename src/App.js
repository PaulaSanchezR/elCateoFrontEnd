import React, { Component } from 'react';
import logo from './elcateo.JPG';
import './App.css';
import axios from 'axios';

import Signup from './components/user-pages/Signup'


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
      <div className="App">
      <header>
       <img src={logo} alt="My logo" style={{height:200}}/>  
      </header>
     
       <Signup currentUser={ this.state.currentUser} 
            onUserChange={ userDoc => this.syncCurrentUser(userDoc)}/>
      </div>
    );
  }
}

export default App;
