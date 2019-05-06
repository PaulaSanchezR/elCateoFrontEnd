import React ,{ Component } from 'react';
import axios from "axios";
import Barcode from 'react-barcode'

class ListRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            recordArray:[],
            showEdit:true,
            treeId: '',
            irrigation : '',
            irrigationdescription : '',
            soilhelth : '',
            soildescription: '',
            salt: '',
            saltdescription: '',
            illness : '',
            illnessdescription: ''

        }
    }

handleSubmit = event =>{
    event.preventDefault();
    const {} = this.state

}

componentDidMount(){
    const id = this.props.theTree.treeInfo.treeInf._id
    console.log(" todo ",this.props.theTree)
   //console.log("props", this.props.theTree.treeInf._id)
    //   const { params } = id.match
    //   console.log ("params== ", params)
      axios.get(
          `http://localhost:5000/api/treerecord/${id}`, {
              withCredentials:true,
          })
          .then(responseFromApi => {
              console.log("datos fron DB", responseFromApi.data)

              const records = responseFromApi.data;
              this.setState(records);
          })
          .catch(err => {
              console.log(err);
            })
  } 
 
  showEditForm(){
      console.log("entro" )
      this.setState({ showEdit: false})
  }
    render(){
    const { treeInf, group} = this.props.theTree.treeInfo
    console.log (" groupinf ===   ",group)
    console.log(" treeInfo== ", treeInf)
        return( 
      
 <div className="Container-fluid">
  { this.state.showEdit ? (   

<div className="row" >
{/*<div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">/*/}
<div className="col-lg-8">
    <form onSubmit ={event => this.handleSubmit(event)} >
    <h2>Tree</h2>
        <hr className="colorgraph"/>
       
            <div className="form-group">
                    <Barcode 
                         value={treeInf._id}
                    />
            </div>
           <div className="row" >  
            <div className="form-group">
                <input 
                value={ treeInf.name}
                onChange={ event => this.genircSync(event)}
                type="text"
                name="name" 
                id="name" 
                className="form-control input-lg" 
                placeholder="Name" 
                readonly="readonly"
                required data-error="Please, Add Name." 
                />
                <div className="help-block with-errors"></div>
            </div> 
            <hr className="colorgraph"/>
            <div className="form-group">
                <input 
                value={ treeInf.position}
                onChange={ event => this.genircSync(event)}
                type="text" 
                name="position" 
                id="position" 
                className="form-control input-lg" 
                placeholder="position" 
                readonly="readonly"
                required data-error="Please, Add position." 
                />
                <div className="help-block with-errors"></div>
            </div>
        </div>
   
        <div className="row" >
            <div className="form-group">
                <input 
                value={treeInf.latitud}
                onChange={ event => this.genircSync(event)}
                type="text" 
                name="latitud" 
                id="latitud" 
                className="form-control input-lg" 
                placeholder="latitud" 
                readonly="readonly"
                required data-error="Please, Add latitud." 
                />
                <div className="help-block with-errors"></div>
            </div>
            <hr className="colorgraph"/>
            <div className="form-group">
                <input 
                type="text" 
                value={treeInf.altitud}
                onChange={event => this.genircSync(event)}
                name="altitud" 
                id="altitud" 
                className="form-control input-lg" 
                placeholder="altitud" 
                readonly="readonly"
                required data-error="Please, Add altitud." 
                />
                <div className="help-block with-errors"></div>
            </div>
        </div>
       
        <div className="row">
            <div className="form-group">
                <input 
                value={treeInf.description}
                onChange={ event => this.genircSync(event)}
                type="text" 
                name="desciption" 
                id="desciption" 
                className="form-control input-lg" 
                placeholder="Name" 
                readonly="readonly"
                required data-error="Please, Add desciption." 
                />
                <div className="help-block with-errors"></div>
            </div> 
            <hr className="colorgraph"/>
            <div className="form-group">
            
                <select  
                    className="form-control form-control-lg"
                    onChange={ event => this.genircSync(event)}
                    name="groupId" 
                    required data-error="Please, Add desciption.">
                    <option value={group._id}>{group.name}</option>
                    {/* { groupArray.map(oneGroup => {
                        return(
                            <option value={oneGroup._id}>{oneGroup.name}</option>
                        )
                    })} */}
                
                </select>
                <div className="help-block with-errors"></div>
               </div>   
            </div> 
        <button> Submit</button>
        
    </form>
</div>





<table id="table" className="col-lg-12 table table-striped">
 <tbody> 
  <tr >
      <th collapse="8">
      <button onClick={() => this.showEditForm()}>Add Record</button>
      </th>
  </tr>
  
   <tr>
       
            <th>DATE</th>
            <th>IRRIGATION</th>
            <th>SALT</th>
            <th>SOIL</th>
            <th>ILLNESS</th>
            <th>I_DESCRIPTION</th>
            <th>ALL OBSERVATION</th>
            <th>DELETE</th>
       
    </tr>
  </tbody>  
   
        <tr>  
            <th>{this.state.createdAt}</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            
            <th><button type="submit">Delete!</button></th>
           
        </tr> 
   
  
</table>
</div>
):(
    <div className="row">
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
                    <div className="help-block with-errors"></div>
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
                        <div className="help-block with-errors"></div>
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
                <div className="help-block with-errors"></div>
              </div>
              <div className="col-md-5">
              <div className="form-group">
                <label for="form_interface">Salt</label>
                <input 
                    value={ this.state.soildescription}
                    onChange={ event => this.genircSync(event)}
                    type="text"
                    name="saltldescription" 
                    id="saltldescription" 
                    className="form-control input-lg" 
                    placeholder="saltl description" 
                    required data-error="Please, Add soildescription." 
                    />
                <div className="help-block with-errors"></div>
              </div>
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
                <div className="help-block with-errors"></div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label for="form_pos">Illness</label>
                <select  
                        className="form-control form-control-lg"
                        value={ this.state.illness}
                        onChange={ event => this.genircSync(event)}
                        name="illness" 
                        required data-error="Please, Add illness.">
                        <option value="none">==NONE</option>
                        {/* { groupArray.map(oneGroup => {
                            return(
                                 <option value={oneGroup._id}>{oneGroup.name}</option>
                            )
                        })} */}
                    
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
    )} 
  </div>


        )
    }
}


export default ListRecord