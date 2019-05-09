import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
        constructor(props){
            super(props);
            // console.log("/////", this.props)
            this.state={
                username:'',
                password:'',
                message:null,
                currentUser: null,
            }
        }

genericSync(event){
    const { name, value} = event.target;
    this.setState ( { [name]: value})
    // console.log("value", event.target.value)
}

handleSubmit(event){
    event.preventDefault();
    axios.post(
        "http://localhost:5000/api/login",
        this.state,
        { withCredentials:true}
    )
    .then( responseFromServer =>{
        const login = responseFromServer.data;
        this.props.onUserChange(login);
        this.setState({currentUser: login})
        // console.log('666666666 ', this.props)
        if(this.state.currentUser){
            // console.log("-0- 0- 0- 0- 0- 0-")
            this.props.history.push("/addTree")
        }
    })
    .catch(err => {
        if(err.response && err.response.data){
            return this.setState({ message:err.response.data.message})
        }
    })
}


    render(){
        // console.log(this.props, 'HHLEOEOOEOEOEOEOEO')
        return (
            <section> 
        {/* {this.state.currentUser ? <Redirect to="/addTree" /> : ( */}
          
                 <div className="container">
                    <div className="row" style={{marginTop:150}}>
                    <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-3 col-md-offset-3">
                        <form onSubmit = { event => this.handleSubmit(event)}>
                            <fieldset>
                                <h2>Please Sign In</h2>
                                <hr class="colorgraph"/>
                                <div class="form-group">
                                    <input 
                                    value={this.state.username}
                                    onChange ={ event => this.genericSync(event)}
                                    type="text" 
                                    name="username" 
                                    id="username" 
                                    class="form-control input-lg" 
                                    placeholder="Username"
                                    required data-error="Please, Add Username."/>
                                </div>
                                <div class="form-group">
                                    <input 
                                    onChange = { event => this.genericSync(event)}
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    class="form-control input-lg" 
                                    placeholder="Password"
                                    required data-error="Please, Add Password."/>
                                </div>
                                <span class="button-checkbox">
                                    <button type="button" class="btn" data-color="info">Remember Me</button>
                                        </span>
                                <hr class="colorgraph" />
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                        <input type="submit" 
                                        class="btn btn-lg btn-success btn-block" value="Sign In"/>
                                    </div>
                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                        <a href="/signup" class="btn btn-lg btn-primary btn-block">Register</a>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            
        
        </section>

         
        )
    }
}
export default Login;
