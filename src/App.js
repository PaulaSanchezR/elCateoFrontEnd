import React, { Component } from 'react';
import { Switch , NavLink, Route }  from 'react-router-dom'
   

import logo from './elcateo.JPG';
import './App.css';
import axios from 'axios';

import Signup from './components/user-pages/Signup'
import Login from './components/user-pages/Login'
import Addtree from './components/tree-pages/AddTree'
import Logout from './components/user-pages/Logout'
import AddTreeRecord from './components/tree-pages/AddTreeRecord'
import ListRecord from './components/tree-pages/ListRecord'

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
        <div className="row">
         <div className="col-lg-3">
            <div className="sidebar" data-color="black">
  
                  <div className="sidebar-background">
                    <div className="logo">
                      <div className="logo-img">
                        <img src={logo} alt="My logo" style={{height:100}}/>
                      El Cateo 
                      </div>
                     
                  </div>
                  {this.state.currentUser ? ( 
                
                    <ul className="nav">
                        
                        <li>
                        <NavLink to="/addtree"> Add Tree </NavLink>
                        </li>
                    </ul>
                ) : (
                      <div></div>
                  )}
                  
                </div>
            </div>
           </div>
           <div className="col-lg-9">
          <div className="main-panel">
            <div className="App">
              
              {this.state.currentUser ? ( 
              
                <section> 
                  <header>
                  <nav className="navbar navbar-default">
                  <i className="pe-7s-close-circle"><div> Log out</div></i>
                    <p> Welcome { this.state.currentUser.username}</p>
                  </nav>
                  <hr className="colorgraph"/>
                 </header>
                
                <div className="row">
                 <div className="col-lg-3 ">
                  <div className="card card-stats"><p>ensayo</p></div>
                 </div>
                 <div className="col-lg-3 ">
                  <div className="card card-stats"><p>ensayo</p></div>
                 </div>
                 <div className="col-lg-3 ">
                  <div className="card card-stats"><p>ensayo</p></div>
                 </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 card card-stats">
                  <Addtree />
                   {/* <Switch>
                      <Route path ="/addtree"   component= { Addtree } />
                   </Switch> */}  
                  </div>
                  <div className="col-log-3">
                  </div>
                </div>
                
               </section> 
              
           
                ) : ( 
                
                <Switch>
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
                <Route exact path ="/logout" render={ ()=>
                <Logout currentUser={ this.state.currentUser}
                  onUserChange= { userDoc => this.syncCurrentUser(userDoc)} />
                }>
                </Route>
                <Route exact path ="/treeRecord" render={ () =>
                <AddTreeRecord />
                }/>
                <Route path ="/listRecord/:idtree" component={ListRecord}/>
              </Switch> )

              }
             
          </div>
          </div>
          </div>
          </div> 
       </div>
   );
  }
}

export default App;
