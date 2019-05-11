import React ,{ Component } from 'react';
import axios from "axios";
import Barcode from 'react-barcode'
import { Link} from 'react-router-dom'
import Popup from "reactjs-popup";

class ListIllness extends Component {
    constructor(props){
        super(props);
       // console.log("props===", this.props)
        this.state = {
            currentUser: null,
            records: [],
        }
    }

 componentDidMount(){
     axios.get(
        `${process.env.REACT_APP_API_URL}/illness`,
        { withCredentials:true, })
        .then(responseFromApi => {
            console.log("all illness" , responseFromApi)
            const records = responseFromApi.data;
            this.setState({ records });
        })
    
    }   

 deleteRecord(id){
    console.log("==", id)
   // const { params } = this.props.match;
    axios.delete(
       //process.env.REACT_APP_SERVER_URL + `/treerecord/${id}`)
       `${process.env.REACT_APP_API_URL}/illnessremove/${id}`)
    .then(responseFromApi => {
        axios.get(
            `${process.env.REACT_APP_API_URL}/illness`,
            { withCredentials:true, })
            .then(responseFromApi => {
                console.log("updated illness after delete" , responseFromApi)
                const records = responseFromApi.data;
                this.setState({ records });
        })
        //console.log("delete tree", responseFromApi)
        //console.log("props illnes",this.props)
      this.props.history.push(`/addIllness`)
    })
    .catch(err => console.log(err))
} 
 

    render(){
        console.log("props", this.props)
        return(
            <table id="table" className="col-lg-12 table table-striped">
 <tbody> 
  <tr >
      <th collapse="8">
      {/* <Link to={`/addRecord/${params.id}`}> Add New Illness</Link> */}
      </th>
  </tr>
   <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>LOOKS LIKE</th>
            <th>CONTROL</th>
            <th>ILLNESS</th>
            <th>OBSERVATION</th>

    </tr>
  </tbody>  
   {this.state.records.map(oneRecord => { 

     return(
        <tr>  
            <th>{oneRecord._id}</th>
            <th>{oneRecord.name}</th>
            <th>{oneRecord.lookslike}</th>
            <th>{oneRecord.control}</th>
            <th>{oneRecord.observation}</th>
            <th>  <button onClick={() => this.deleteRecord(`${oneRecord._id}`) }>Delete</button>
            <Popup
                trigger={<button className="button"> Open Modal </button>}
                modal
                closeOnDocumentClick
                >
                <span>   <div className="row" >
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
                </div>
                 </span>
            </Popup>
          </th>
           
        </tr> 
        )
    }
    )}
  
</table>

        )
    }
}

export default ListIllness;