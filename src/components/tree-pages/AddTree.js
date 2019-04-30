import React, { Component } from 'react';
import axios from 'axios';


class Addtree extends Component {
    state ={
        name:'',
        position: '',
        altitud: '',
        longitud: '',
        desciption: ''
    };

    handleSubmit = event => {
        event.preventDefault();
        const { name, position,altitud,longitud,desciption} = this.state;
        axios
            .post(
                'http://localhost:5000/api/tree',
                { name, position,altitud,longitud,desciption },
                { withCredentials:true }
                )
            .then()
            .catch()
    
    
    
    
    }




    render(){
        return (
            <section>
            <div className="container">
            <div className="row" style={{marginTop:150}}>
            <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
            <form onSubmit ={event => this.handleSubmit(event)} >
            <h2>Tree Inf</h2>
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
                <hr className="colorgraph"/>
                <div className="form-group">
                    <input 
                    value={ this.state.position}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="position" 
                    id="position" 
                    className="form-control input-lg" 
                    placeholder="position" 
                    required data-error="Please, Add position." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
                <hr className="colorgraph"/>
                <div className="form-group">
                    <input 
                    value={ this.state.altitud}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="altitud" 
                    id="altitud" 
                    className="form-control input-lg" 
                    placeholder="altitud" 
                    required data-error="Please, Add altitud." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
                <hr className="colorgraph"/>
                <div className="form-group">
                    <input 
                    type="text" 
                    value={ this.state.longitud}
                    onChange={event => this.genircSync(event)}
                    name="longitud" 
                    id="longitud" 
                    className="form-control input-lg" 
                    placeholder="longitud" 
                    required data-error="Please, Add longitud." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
                <hr className="colorgraph"/>
                <div className="form-group">
                    <input 
                    value={ this.state.desciption}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="desciption" 
                    id="desciption" 
                    className="form-control input-lg" 
                    placeholder="Name" 
                    required data-error="Please, Add desciption." 
                    />
                    <div className="help-block with-errors"></div>
                </div> 
                <button> Sign Up</button>
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

export default Addtree;
