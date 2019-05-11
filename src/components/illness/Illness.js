import React, { Component } from 'react';
import axios from 'axios';
import ListIllness from './ListIllness';

class Illness extends Component {
    constructor(props){
        super(props);
        this.state={
            name :''     ,
            lookslike :'',
            control:''   ,
            observation :'' ,
            illnessInfo:'',
            buttonChange:''
        }
    }
handleSubmit = event => {
    event.preventDefault();
    console.log("illness data", this.state)
    const{ name,lookslike , control ,observation } = this.state;
    axios
        .post(
            `${process.env.REACT_APP_API_URL}/illness`,
            { name,lookslike , control ,observation },
            {withCredentials:true}
        )
        .then(responseFromDB => {
            console.log("add Illenss", responseFromDB)
            const illnessInfo = responseFromDB.data;
            this.setState( {illnessInfo});
           // this.props.history.push(`/list/${illnessInfo._id}`)
        })
        .catch( err => console.log(err))
    

}
genircSync(event){
    const { name, value } = event.target;
    this.setState( { [name]: value})
   //console.log("name ==", event.target.name, "value ==", event.target.value)
 }

    render(){
            return(
            <div className="row" >
                <div className="col-lg-12 card card-stats">
           
                <form onSubmit ={event => this.handleSubmit(event)} >
                <h2>Add illness</h2>
                <hr className="colorgraph"/>
                <div className="form-group">
                <input 
                    value={this.state.name}
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
                    value={ this.state.lookslike}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="lookslike" 
                    id="lookslike" 
                    className="form-control input-lg" 
                    placeholder="lookslike" 
                    required data-error="Please, Add lookslike." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
                <hr className="colorgraph"/>
                <div className="form-group">
                    <input 
                    value={ this.state.control}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="control" 
                    id="control" 
                    className="form-control input-lg" 
                    placeholder="control" 
                    required data-error="Please, Add control." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
                <hr className="colorgraph"/>
                <div className="form-group">
                    <input 
                    value={ this.state.observation}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="observation" 
                    id="observation" 
                    className="form-control input-lg" 
                    placeholder="observation" 
                    required data-error="Please, Add observation." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
                    <button>Submit </button> 
                </form>
               
                </div>
                 <ListIllness {...this.props}/> 
            </div>
    
        )
    }
}


export default Illness;