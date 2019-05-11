import React , { Component } from "react";
import { render } from "react-dom";
import { Chart } from "react-google-charts";
import axios from "axios" ;

class ChartOne extends Component{
    constructor(){
        super()
        this.state={
          groupArray:[],
          chardata:[]
        }}

componentDidMount(){
    axios.get(
      `${process.env.REACT_APP_API_URL}/allgroup`,
      { withCredentials:true}
    )
    .then(responseFromApi => {
      //console.log("groups" , responseFromApi.data)
      this.setState({ groupArray: responseFromApi.data})
    })
    .catch(err => console.log(err))
}

 render() {
      const  group  = this.state.groupArray;
   //   console.log( "todo", group)
     // let chardata = [["Group", "Qty tree"]];
     this.state.chardata =  [["Group", "Qty tree"]];
      group.map((onegroup , index) =>{
        let qtyTree = onegroup.treeId.length;
        return (
           //console.log("inside map", onegroup.name , onegroup.treeId.length);
          // chardata.push([onegroup.name,qtyTree])
          this.state.chardata.push([onegroup.name,qtyTree])
         )
      })
      console.log( "chardata imagen ono",this.state.chardata )
     return (
      <div className={"my-pretty-chart-container"}>
        <Chart
          chartType="Bar"

          data={this.state.chardata}
           // ["Group", "Qty tree"],
           // [4, 5.5], [8, 12],[4, 7],[1,5]
          
          width="100%"
          height="200px"

          options={{
            //colors: ['#b0120a', '#ffab91'],
            // Material design options
            chart: {
              
              title: 'Tree per Group',
              subtitle: 'Qty of trees per Group',
            },
          }}
          legendToggle
        />
      </div>
    );
  }
}

export default ChartOne
  
