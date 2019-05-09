import React ,{ Component } from 'react';
import axios from "axios";
import { Redirect} from 'react-router-dom'

class AddRecord extends Component {
    constructor(props){
        super(props);
        //console.log("*******  GET PROPS ****", props)
        this.state = {
            irrigation : '',
            irrigationdescription : '',
            soilhelth : '',
            soildescription: '',
            salt: '',
            saltdescription: '',
            illness : '',
            illnessdescription: '',
            illnessArray:[],
        }
    }


componentDidMount(){
             axios.get(
              `http://localhost:5000/api/illness`, {
                  withCredentials:true,
              })
              .then(responseFromApi => {
                  //console.log("datos fron DB", responseFromApi.data)
                 this.setState({ illnessArray:responseFromApi.data });
              })
              .catch(err => {
                  console.log(err);
                })
      } 

handleSubmit = event =>{
        const { params } = this.props.match
       // console.log("//// parames  /////", params.id)
        event.preventDefault();
        const { irrigation ,
                irrigationdescription,
                soilhelth ,
                soildescription,
                salt ,
                saltdescription,
                illness  ,
                illnessdescription
                } = this.state;
        axios 
             .post(
                  `http://localhost:5000/api/treerecord/${params.id}`,
                  { irrigation ,
                    irrigationdescription,
                    soilhelth ,
                    soildescription,
                    salt ,
                    saltdescription,
                    illness  ,
                    illnessdescription},
                    {withCredentials:true})
              .then(responseFromDB =>{
                //console.log("data", responseFromDB.data)
                const recordInf = responseFromDB.data;
                 this.setState({ record: recordInf ,isSubmitSuccess:true })
                 this.props.history.push(`/listRecord/${params.id}`)
              })
              .catch(err => {
                console.log(err)
              } )      
 }
genircSync(event){
    const { name, value} = event.target;
    this.setState( { [name]: value})
}

render(){
    const illnessArrayinfo = this.state.illnessArray;
    console.log ("illnessArrayinfo",illnessArrayinfo)
     return(
        <div className="row">
        {/* <div><h1>{params.id}</h1></div> */}
        <div className="col-lg-12">
         <form id="contact-form" onSubmit = { event => this.handleSubmit(event)}  >
            <div className="row">
              <div className="col-md-6">
                <div className="form-group col-md-12">
                  <label for="" className="col-md-12">Irrigation*</label>
                  <input 
                      value={ this.state.irrigation}
                      onChange={ event => this.genircSync(event)}
                      type="text"
                      name="irrigation" 
                      id="irrigation" 
                      className="form-control input-lg" 
                      placeholder="Irrigation" 
                      required data-error="Please, Add irrigation." 
                      />
                     
                </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group col-md-12">
                      <label for="" className="col-md-12">Irrigation Description*</label>
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
                         
                  </div>
              </div>
             
            </div> 
             <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label for="form_interface">Salt</label>
                  <input 
                      value={ this.state.salt}
                      onChange={ event => this.genircSync(event)}
                      type="text"
                      name="salt" 
                      id="salt" 
                      className="form-control input-lg" 
                      placeholder="Salt" 
                      required data-error="Please, Add irrigation." 
                      />
                 
                </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                  <label for="form_interface">Salt Description</label>
                  <input 
                      value=''
                      type="text"
                      name="saltdescription"
                      id="saltdescription"
                      placeholder="Salt Description"
                      className="form-control input-lg"
                      require data-error="Please, Add Salt Desciption"/>
                  
                  
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label for="form_device">Soil *</label>
                  <input 
                      value={ this.state.salt}
                      onChange={ event => this.genircSync(event)}
                      type="text"
                      name="soil" 
                      id="soil" 
                      className="form-control input-lg" 
                      placeholder="Soil" 
                      required data-error="Please, Add Soil." 
                      />
                  
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label for="form_pos">Illness</label>
                  <select  
                          className="form-control form-control-lg"
                          value={ this.state.illness}
                          onChange={ event => this.genircSync(event)}
                          name="illness" 
                          required data-error="Please, Add illness.">
                          <option value="none">==NONE</option>
                          {illnessArrayinfo.map(oneIllness => {
                              return(
                                 <option value={oneIllness._id}>{oneIllness.name}</option>
                              )
                          })}
                    
                  </select>
                  <div className="help-block with-errors"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label for="form_message">Observation*</label>
              
                  <div className="help-block with-errors"></div>
                </div>
              </div>
              <div className="col-md-12">
                <input type="submit" className="btn btn-success btn-send" value="Submit"/>
              </div>
            </div>       
          
          </form>
        </div>
      </div>
  
    )
 }




}

export default AddRecord;