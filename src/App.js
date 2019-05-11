import React, { Component } from 'react';
import { Switch , NavLink, Route }  from 'react-router-dom'
   

import logo from './elcateo.JPG';
import './App.css';
import axios from 'axios';

import Signup from './components/user-pages/Signup'
import Login from './components/user-pages/Login'
import AddTree from './components/tree-pages/AddTree'
import Logout from './components/user-pages/Logout'
import AddRecord from './components/tree-pages/AddRecord'
import ListRecord from './components/tree-pages/ListRecord'
import Search from './components/tree-pages/Search'
import ChartOne from './components/tree-pages/ChartOne'
import ChartTwo from './components/tree-pages/ChartTwo'
import ChartThree from './components/tree-pages/ChartThree'
import Illness from     './components/illness/Illness'
import EditIllness from './components/illness/EditIllness'

class App extends Component {
  constructor(props){
    super(props)
    // console.log('00000000 ', this.props)
// we are checking if the customer is checkin
//the first time has to be null
    this.state ={
      currentUser: null,
  
    }
 }

 // app.js only will load once
 //componentDimount go the the data that I want all the times

 componentDidMount(){
   console.log("entro a componentdidmount y esta mejor")
   //talk with the back end
   axios.get(
     //"http://localhost:5000/api/checkuser"
     `${process.env.REACT_APP_API_URL}/checkuser`, 
     { withCredentials:true})
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

logoutClick() {
  console.log(" entroooooo");
  axios.delete(
   `${process.env.REACT_APP_API_URL}/logout`,
    { withCredentials: true } // FORCE axios to send cookies across domains
  )
  .then(() => {
     // make "currentUser" empty again (like it was at the start)
    this.syncCurrentUser(null);
    this.props.history.push(`/login`)

  })
  .catch(err => {
    console.log("Logout ERROR", err);
    alert("Sorry! Something went wrong.");
  });
}


  render() {
    return (
      <div id="root">
         <div className="row">
         <div className="col-lg-2">
            <div className="sidebar" data-color="black">
                 <div className="sidebar-background">
                    <div className="logo">
                      <div className="logo-img">
                        <img src={logo} alt="My logo" style={{height:100}}/>
                           El Cateo 
                      </div>
                  </div>
                  {this.state.currentUser ? ( 
                    <nav class="navbar ">
                     <ul class="navbar-nav">
                        <li class="nav-item">
                         <NavLink to="/addtree"> ADD TREE </NavLink>
                         
                        </li>
                        <li class="nav-item">
                         <NavLink to="/search"> SEARCH </NavLink>
                         
                        </li>
                        <li class="nav-item">
                        <NavLink to="/addIllness"> ILLNESS </NavLink>
                        </li>
                     </ul>
                    </nav>
                ) : (
                      <div></div>
                  )}
               </div>
            </div>
        </div>
      <div className="col-lg-10">
          <div className="main-panel">
            <div className="App">
                {this.state.currentUser ? ( 
               <section> 
                  <header>
                    <nav className="navbar navbar-default">
                    <i className="pe-7s-close-circle">
                     
                    </i>
                      <p> Welcome { this.state.currentUser.username} 
                       <button onClick={() => this.logoutClick()}>Log Out</button> </p>
                    </nav>
                    <hr className="colorgraph"/>
                 </header>
                   
                <div className="row">
                  <div className="col-lg-6 ">
                    <div className="card card-stats"><ChartOne /></div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="card card-stats"><ChartTwo/></div>
                  </div>
                  
                </div>
               
              </section> 
              ) : ( 
                  null
                )}
                
            <Switch>
                <Route exact path = "/search" render = {(props) =>                 
                    <Search
                      currentUser={ this.state.currentUser}
                      onUserChange={ userDoc => this.syncCurrentUser(userDoc)} 
                      {...props}
                      
                    />
                }/>
                  <Route exact path = "/editillness" render = {(props) =>                 
                    <EditIllness
                      currentUser={ this.state.currentUser}
                      onUserChange={ userDoc => this.syncCurrentUser(userDoc)} 
                      {...props}
                      
                    />
                }/>
                <Route exact path = "/" render = {(props) =>                 
                    <Login 
                      currentUser={ this.state.currentUser}
                      onUserChange={ userDoc => this.syncCurrentUser(userDoc)} 
                      {...props} 
                    />
                }/>
                <Route exact path = "/signup" render={ ()=>
                  <Signup currentUser={ this.state.currentUser} 
                    onUserChange={ userDoc => this.syncCurrentUser(userDoc)}/>
                } >
                </Route>
               <Route exact path ="/logout" render={ (props)=>
                  <Logout 
                    currentUser={ this.state.currentUser}
                    onUserChange= { userDoc => this.syncCurrentUser(userDoc)} 
                    {...props}
                    />
                  }>
                </Route>
               <Route path="/addTree" render={ (props)=>
                  <AddTree {...props} currentUser={ this.state.currentUser} 
                   onUserChange={ userDoc => this.syncCurrentUser(userDoc)}/>
                } >
                </Route>
                {/* <Route exact path ="/listRecord" render={ ()=>
                  <ListRecord currentUser={ this.state.currentUser} 
                   onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                   />
                } >
                </Route> */}
               <Route exact path ="/addRecord/:id" render={ (props) =>
                  <AddRecord {...props} currentUser={ this.state.currentUser} 
                  onUserChange={ userDoc => this.syncCurrentUser(userDoc)} /> 
                  }>
               </Route>

                <Route exact path ="/listRecord/:id" component={ListRecord}/>

                <Route path="/addIllness" render={ (props)=>
                  <Illness {...props} currentUser={ this.state.currentUser} 
                   onUserChange={ userDoc => this.syncCurrentUser(userDoc)}/>
                } >
                </Route>
           </Switch>
             
          </div>
          </div>
          </div>
          </div> 
       </div>
   );
  }
}

export default App;
