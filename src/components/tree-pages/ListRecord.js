import React ,{ Component } from 'react';
import axios from "axios";
import { link } from "react-router-dom"

class ListRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render(){
        return( 
 <div className="container">
 <hr />
<table id="table" className="col-lg-12 table table-striped">
  <thead>
  
   <tr>
        <h2>
            <th>DATE</th>
            <th>IRRIGATION</th>
            <th>SALT</th>
            <th>SOIL</th>
            <th>ILLNESS</th>
            <th>I_DESCRIPTION</th>
            <th>ALL OBSERVATION</th>
            <th>DELETE</th>
        </h2>
    </tr>
  </thead>  
   
        <tr>  
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            
            <th><button type="submit">Delete!</button></th>
           
        </tr> 
   
  
</table>
    <div className="row">
      <div className="col-lg-12">
       <form id="contact-form" >
          <div className="row">
            <div className="col-md-12">
              <div className="form-group col-md-12">
                <label for="" className="col-md-2"><h4>Printer *</h4></label>
               
              </div>
            </div>
           </div> 
           <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label for="form_interface"><h4>Interface *</h4></label>
               
                <div className="help-block with-errors"></div>
              </div>
            </div>
           </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label for="form_device"><h4>Device *</h4></label>
                   
                <div className="help-block with-errors"></div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="form_pos"><h4>POS</h4></label>
               
                <div className="help-block with-errors"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label for="form_message"><h4>Observation*</h4></label>
            
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
  </div>


        )
    }
}


export default ListRecord