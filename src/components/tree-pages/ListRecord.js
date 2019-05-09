import React ,{ Component } from 'react';
import axios from "axios";
import Barcode from 'react-barcode'

import { Redirect } from 'react-router-dom'

class ListRecord extends Component {
    constructor(props){
        super(props);
        console.log("props===", this.props)
        this.state = {
            showEdit:true,
            currentUser: null,
            treeRecordArray:[],
        }
    }

// handleSubmit = event =>{
//     event.preventDefault();
//     const {} = this.state

// }

componentDidMount(){
    const { params } = this.props.match;
    console.log( "listRecord params.id", params.id)
    // const id = this.props.theTree.treeInfo.className_id
    // console.log(" todo ",this.props.theTree)
   //console.log("props", this.props.theTree.className_id)
    //   const { params } = id.match
    //   console.log ("params== ", params)
      axios.get(
       `http://localhost:5000/api/treerecord/${params.id}`,
        //  `http://localhost:5000/api/treerecord/5cbb91d2de7bd47381adeee7`,
           {
              withCredentials:true,
          })
          .then(responseFromApi => {
              console.log("datos fron DB=====================", responseFromApi.data)
              const records = responseFromApi.data;
              this.setState({ treeRecordArray:records});
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

     
        const treeRecordArray = this.state.treeRecordArray;
        const treeInfo = this.state.treeRecordArray[0];
    //    console.log(" tree Info ==", treeInfo) 
    //     console.log("////", this.state.treeRecordArray.length)
   
    const { params } = this.props.match; 
   // console.log('8888888 ----------------------- ', this.state.treeRecordArray.length)
    return( 
      
        // if does not have any record redirect to AddRecord
 <div className="Container-fluid">
  
  {

<div className="row" >

<div className="col-lg-8">
    <form onSubmit ={event => this.handleSubmit(event)} >
    <h2>Tree</h2>
        <hr className="colorgraph"/>
       
            <div className="form-group">
                    <Barcode 
                         value={params.id}
                    />
            </div>
           <div className="row" >  
            <div className="form-group">
                <input 
                 value={treeInfo}
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
                value="{}"
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
                value="{}"
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
                value="{}"
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
                value="{}"
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
            {/* <option value={group._id}>{group.name}</option> */}
                
                
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
   {treeRecordArray.map(oneRecord => {

     return(
        <tr>  
            <th>{oneRecord.createdAt}</th>
            <th>{oneRecord.irrigation}</th>
            <th>{oneRecord.salt}</th>
            <th>{oneRecord.soilhelth}</th>
            <th>{/*oneRecord.illness.name*/}</th>
            <th>{oneRecord.illnessdescription}</th>
            <th>{oneRecord.soildescription}</th>
            
            <th><button type="submit">Delete!</button></th>
           
        </tr> 
        )
    })}
  
</table>
</div>

}  
  </div>


        )
    }
 }


export default ListRecord