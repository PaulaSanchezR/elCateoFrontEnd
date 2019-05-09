import React , { Component } from 'react';
import axios from 'axios';

class Search extends Component {
                constructor(){
                   super();
                   this.state={
                       search:''
                   }
                   console.log('= = == = = = = = == = = == = ', this.state)
                }

handleSubmit = event =>{
     const searchTree = this.state.search;
     console.log("searhc",searchTree)
     event.preventDefault();
     
     axios
       .get(
        `http://localhost:5000/api/treerecord/${searchTree}`,
        { searchTree },
        {withCredentials:true})
        .then(responseFromDB =>{
            console.log("db", responseFromDB.data)
            this.setState({ tree:responseFromDB.data})
            this.props.history.push(`/listRecord/${searchTree}`)
        })
        .catch(err => { console.log("gfgdf",err)})

    }

genericSync(event){
        console.log(event.target.name)
        console.log(event.target.value)
        const { name, value} = event.target;
        this.setState( { [event.target.name]: event.target.value})
        console.log(this.state);
         }
                                
render(){
    return(
        <div className="row">
            <div className="col-lg-12">
            <form onSubmit={ event => this.handleSubmit(event)}>
                <input 
                  onChange={event => this.genericSync(event)}
                  type="text"
                  name="search"
                  id="search"
                  className = "form-control input-lg"
                  placeholder = " search"
                />
                <input type="submit" className="btn btn-success btn-send" value="Submit"/>
            </form>
            </div>
        </div>
    )
}
}

export default Search;