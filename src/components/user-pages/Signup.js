import React, { Component } from 'react' ;
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';

class Signup extends Component {
        constructor(props){
            super(props);
            this.state={
                //this is the req.body of each input field
                name:"",
                lastName:"",
                email:"",
                username:"",
                password:"",
                message:null,
            }
        }
// use this foer every react fromr to catch the event of the from
genircSync(event){
    
    const { name, value } = event.target;
    this.setState({ [name]: value})
    console.log("value", event.target.value)

}

handleSubmit(event){
    event.preventDefault();
    axios.post(
        //"http://localhost:5000/api/signup",
        `${process.env.REACT_APP_API_URL}/signup`, //route where I sent the inf
        this.state, // what I am sending (since its post route I need to send the form info)
        { withCredentials:true} // and optional credential : true in CORS
    )
    .then( responseFromServer => {
        console.log ( "response ", responseFromServer)
        // .data is a axios property 
        const newUser = responseFromServer.data;
        //method to update the state
        this.props.onUserChange(newUser);
    })
    .catch(err =>{
        //console.log("error While signup", err)
        if (err.response && err.response.data){
            return this.setState({ message:err.response.data.message})
        }
    })
}

   render(){
       if(this.props.currentUser){
           return(
            <section> <h2> Your are signed up!</h2>
            <p> Welcome , { this.props.currentUser.name}</p>
            <p> Email, { this.props.currentUser.email}</p>
            </section>
           )
       }
        return(
                <section>
                    <div className="container">
                    <div className="row" style={{marginTop:150}}>
                    <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                    <form onSubmit ={event => this.handleSubmit(event)} >
                    <h2>Please Register</h2>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <input 
                            value={ this.state.name}
                            onChange={ event => this.genircSync(event)}
                            type="text"
                            name="name" 
                            id="name" 
                            className="form-control input-lg" 
                            placeholder="Name" 
                            required data-error="Please, Add Name." 
                            />
                            <div className="help-block with-errors"></div>
                        </div> 
  
                        <div className="form-group">
                            <input 
                            value={ this.state.lastName}
                            onChange={ event => this.genircSync(event)}
                            type="text" 
                            name="lastName" 
                            id="lastName" 
                            className="form-control input-lg" 
                            placeholder="lastName" 
                            required data-error="Please, Add LastName." 
                            />
                            <div className="help-block with-errors"></div>
                        </div>
                        <div className="form-group">
                            <input 
                            value={ this.state.email}
                            onChange={ event => this.genircSync(event)}
                            type="text" 
                            name="email" 
                            id="email" 
                            className="form-control input-lg" 
                            placeholder="email" 
                            required data-error="Please, Add Email." 
                            />
                            <div className="help-block with-errors"></div>
                        </div>
                        <div className="form-group">
                            <input 
                            type="text" 
                            value={ this.state.username}
                            onChange={event => this.genircSync(event)}
                            name="username" 
                            id="username" 
                            className="form-control input-lg" 
                            placeholder="username" 
                            required data-error="Please, Add username." 
                            />
                            <div className="help-block with-errors"></div>
                        </div>
                        <div className="form-group">
                            <input 
                            value={ this.state.password}
                            onChange={ event => this.genircSync(event)}
                            type="password" 
                            name="password" 
                            id="password" 
                            className="form-control input-lg" 
                            placeholder="Name" 
                            required data-error="Please, Add password." 
                            />
                            <div className="help-block with-errors"></div>
                        </div> 


                        <hr class="colorgraph" />
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                        <input type="submit" 
                                        class="btn btn-lg btn-success btn-block" value="Sign In"/>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                        <a href="/" class="btn btn-lg btn-primary btn-block">Login</a>
                                    </div>
                                </div>
                    </form>
                    </div>
                    </div>
                    </div>
        {/* if the message is not NULL then show the message */}
        { this.state.message && <div> { this.state.message } </div> }
                </section>   




        )
    }

}

export default Signup;