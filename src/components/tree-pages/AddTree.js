import React, { Component } from 'react';
import axios from 'axios';


class AddTree extends Component {
    constructor(props){
    super(props);
    console.log('=-=-=-=-=-=-=-= ', props)
    this.state ={
        _id:'',
        name:'',
        position: '',
        latitud: '',
        altitud: '',
        desciption: '',
        groupId:'',
        message:'',
        groupArray:[],
         };
    }
         
genircSync(event){
    const { name, value } = event.target;
    this.setState( { [name]: value})
    console.log("name ==", event.target.name, "value ==", event.target.value)
 }


handleSubmit = event => {
        event.preventDefault();
        const { name, position,latitud,altitud,desciption, groupId } = this.state;
        axios
            .post(
                //'http://localhost:5000/api/tree',
                `${process.env.REACT_APP_API_URL}/tree`,
                { name, position,altitud,latitud,desciption, groupId },
                { withCredentials:true }
                )
            .then(responseFromDB =>{
              //  console.log("add tree", responseFromDB.data)
                const treeInfo = responseFromDB.data;
                this.setState({ treeInfo })
             //   this.props.history.push('/listRecord/5ccf7d12fc09b77672dc44de')
           //  console.log('here!!!!')
                //this.props.history.push(`/listRecord/${treeInfo.treeInf._id}`);
                this.props.history.push(`/addRecord/${treeInfo.treeInf._id}`)
             })
            .catch( err => console.log(err))
    }


componentDidMount(){
        axios.get(
            //"http://localhost:5000/api/allgroup",
            `${process.env.REACT_APP_API_URL}/allgroup`,
            { withCredentials:true }
        )
        .then( responseFromApi => {
            console.log( "groups== ", responseFromApi.data)
            this.setState( { groupArray: responseFromApi.data})
        })
        .catch(err => console.log(err))
    }


    render(){
        const  groupArray  = this.state.groupArray
        
           
        // console.log('props are: ', this.props.history)

        // if (tree) {
        //      //console.log("entro all tree info", tree.treeInf._id);
        //     // return <Redirect to={`/listRecord/${tree.treeInf._id}`}/>;
        //     <ListRecord  theTree ={ this.state} />
        //<Redirect to="/listRecord" theTree ={this.state} />
        // }
   
        return (
         
         <section>
            {/* {this.state.treeInfo ?   <Redirect to={{
                                                    pathname:"/listRecord" ,
                                                    state :{id:tree.treeInf._id}} 
                                                }/>  
            :( */}

            <div className="row" >
            {/*<div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">/*/}
            <div className="col-lg-12">
            <form onSubmit ={event => this.handleSubmit(event)} >
            <h2>Add Tree</h2>
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
                    value={ this.state.latitud}
                    onChange={ event => this.genircSync(event)}
                    type="text" 
                    name="latitud" 
                    id="latitud" 
                    className="form-control input-lg" 
                    placeholder="latitud" 
                    required data-error="Please, Add latitud." 
                    />
                    <div className="help-block with-errors"></div>
                </div>
                <hr className="colorgraph"/>
                <div className="form-group">
                    <input 
                    type="text" 
                    value={ this.state.altitud}
                    onChange={event => this.genircSync(event)}
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
                <hr className="colorgraph"/>
                <div className="form-group">
                
                    <select  
                        className="form-control form-control-lg"
                        value={ this.state.groupId}
                        onChange={ event => this.genircSync(event)}
                        name="groupId" 
                        required data-error="Please, Add desciption.">
                        <option value="none">==NONE</option>
                        { groupArray.map(oneGroup => {
                            return(
                                 <option value={oneGroup._id}>{oneGroup.name}</option>
                            )
                        })}
                    
                    </select>
                    <div className="help-block with-errors"></div>
                </div> 
                <button> Submit</button>
            </form>
            </div>
            </div>
          
          {/* ) } */}

{/* if the message is not NULL then show the message */}
{ this.state.message && <div> { this.state.message } </div> }
        </section> 
        )
    }

}

export default AddTree;
