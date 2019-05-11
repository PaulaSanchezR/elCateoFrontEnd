import React ,{ Component } from 'react';
import axios from "axios";
import Barcode from 'react-barcode'
import { Link} from 'react-router-dom'

class ListRecord extends Component {
    constructor(props){
        super(props);
       // console.log("props===", this.props)
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
      axios.get(
      //  `http://localhost:5000/api/treerecord/${params.id}`,  
       `${process.env.REACT_APP_API_URL}/treerecord/${params.id}`,
        //  `http://localhost:5000/api/treerecord/5cbb91d2de7bd47381adeee7`,
           {
              withCredentials:true,
          })
          .then(responseFromApi => {
              console.log("list tree =====================", responseFromApi.data)
              const records = responseFromApi.data;
              this.setState({ treeRecordArray:records});
          })
          .catch(err => {
              console.log(err);
            })
  } 
 
  showEditForm(){
     // console.log("entro" )
      this.setState({ showEdit: false})
  }


 
  deleteRecord(id){
      console.log("==", id)
      const { params } = this.props.match;
      axios.delete(
         //process.env.REACT_APP_SERVER_URL + `/treerecord/${id}`)
         `${process.env.REACT_APP_API_URL}/treerecord/${id}`)
      .then(responseFromApi => {
          console.log("delete tree", responseFromApi)
        this.props.history.push(`/listRecord/${params.id}`)
      })
      .catch(err => console.log(err))
  }

    render(){
        const treeRecordArray = this.state.treeRecordArray;
        console.log("tree" , treeRecordArray)
        const treeInfo = this.state.treeRecordArray[0];
        const { params } = this.props.match; 
             
 return( 
   
 <div className="Container-fluid">
  
{

<div className="row" >

<div className="col-lg-8 card card-stats">
    <form onSubmit ={event => this.handleSubmit(event)} >
    <h2>Tree</h2>
        <hr className="colorgraph"/>
       
            <div className="form-group">
                    <Barcode  value={params.id} />
            </div>
           <div className="row" >  
            <div className="form-group">
                <input 
                 value={ treeInfo ? treeInfo.treeId.name : ""}
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
                value={ treeInfo ? treeInfo.treeId.position : ""}
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
                value={ treeInfo ? treeInfo.treeId.latitud : ""}
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
                value={ treeInfo ? treeInfo.treeId.altitud : ""}
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
                value={ treeInfo ? treeInfo.treeId.desciption : ""}
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
            {/* <option value="">{ treeInfo ? treeInfo.treeId.desciption : ""}</option> */}
                
                
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
      <Link to={`/addRecord/${params.id}`}> Add New Record</Link>
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
            <th>{oneRecord._id}</th>
            <th>{oneRecord.illnessdescription}</th>
            <th>{oneRecord.soildescription}</th>
            
            <th>  <button onClick={() => this.deleteRecord(`${oneRecord._id}`) }>Delete</button></th>
           
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