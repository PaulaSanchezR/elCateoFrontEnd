import React, { Component } from 'react';
import axios from 'axios';


class AddTreeRecord extends Component {
        state={
            treeId: '',
            irrigation:'', 
            irrigationdescription:'' ,
             soilhelth:'',    
             soildescription:'',
            salt:'', 
            saltdescription:'', 
            illness:'' ,  
            illnessdescription:'',
            message:'',
            illenessArray:[]

        }

 handleSubmit(event){
    event.preventDefault();
    const {   treeId , irrigation, irrigationdescription, soilhelth, soildescription, salt, saltdescription,illness, illnessdescription } = this.state;
    axios.post(
        //`http://localhost:5000/api/treerecord/${this.props.tree._id}`,
        `${process.env.REACT_APP_API_URL}/${this.props.tree._id}`,
        {    treeId , 
            irrigation, 
            irrigationdescription, 
            soilhelth, 
            soildescription, 
            salt, 
            saltdescription,
            illness, 
            illnessdescription
        },
        { withCredentials:true }
    )
    .then(responseFromDB => {
        console.log("add Tree Record", responseFromDB.data)
        this.setState({ isSubmitSuccessful:true})
    })
    .catch(err => console.log(err))
 }       

 genircSync(event){
     const { name,value} = event.target;
     this.setState( { [name]: value })
 }


componentDidMount(){
    axios.get(
        //`http://localhost:5000/api/illness`,
        `${process.env.REACT_APP_API_URL}/illness`,
        { withCredentials:true}
    )
    .then( responseFromApi => {
        console.log( " illness ==", responseFromApi.data);
        this.setState( { illenessArray:responseFromApi.data})
    })
    .catch(err => console.log(err))
   
}

    render(){
        const illenessArray = this.state.illenessArray;
        return(
            <section>
            <div className="row" >
            {/*<div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">/*/}
            <div className="col-lg-12">
            <form onSubmit ={event => this.handleSubmit(event)} >
            <h2>Add Tree Record</h2>
                <hr className="colorgraph"/>
                <div className="form-group">
                    <input 
                    value={ this.state.irrigation}
                    onChange={ event => this.genircSync(event)}
                    type="text"
                    name="irrigation" 
                    id="irrigation" 
                    className="form-control input-lg" 
                    placeholder="irrigation" 
                    required data-error="Please, Add irrigation." 
                    />
                    <div className="help-block with-errors"></div>
                </div> 
             
                <div className="form-group">
                    <input 
                    value={ this.state.irrigationdescription}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="irrigationdescription" 
                    id="irrigationdescription" 
                    className="form-control input-lg" 
                    placeholder="irrigationdescription" 
                    required data-error="Please, Add irrigationdescription." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
               
                <div className="form-group">
                    <input 
                    value={ this.state.soilhelth}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="soilhelth" 
                    id="soilhelth" 
                    className="form-control input-lg" 
                    placeholder="soilhelth" 
                    required data-error="Please, Add soilhelth." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
              
                <div className="form-group">
                    <input 
                    type="text" 
                    value={ this.state.soildescription}
                    onChange={event => this.genircSync(event)}
                    name="soildescription" 
                    id="soildescription" 
                    className="form-control input-lg" 
                    placeholder="soildescription" 
                    required data-error="Please, Add soildescription." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
              
                <div className="form-group">
                    <input 
                    value={ this.state.salt}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="salt" 
                    id="salt" 
                    className="form-control input-lg" 
                    placeholder="salt" 
                    required data-error="Please, Add salt." 
                    />
                    <div className="help-block with-errors"></div>
                </div> 
                
                <div className="form-group">
                    <input 
                    value={ this.state.saltdescription}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="saltdescription" 
                    id="saltdescription" 
                    className="form-control input-lg" 
                    placeholder="saltdescription" 
                    required data-error="Please, Add saltdescription." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
                
                <div className="form-group">
                    <select  
                        className="form-control form-control-lg"
                        value={ this.state.illness}
                        onChange={ event => this.genircSync(event)}
                        name="illness" 
                        required data-error="Please, Add desciption.">
                        { illenessArray.map(oneIllenes => {
                            return(
                                 <option value={oneIllenes._id}>{oneIllenes.name}</option>
                            )
                        })}
                    
                    </select>
                    <div className="help-block with-errors"></div>
                </div> 
               
                <div className="form-group">
                    <input 
                    value={ this.state.illnessdescription}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="illnessdescription" 
                    id="illnessdescription" 
                    className="form-control input-lg" 
                    placeholder="illnessdescription" 
                    required data-error="Please, Add illnessdescription." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
                <button> Submit</button>
            </form>
            </div>
            </div>
          
{/* if the message is not NULL then show the message */}
{ this.state.message && <div> { this.state.message } </div> }
        </section> 


        )

    }
}

export default AddTreeRecord