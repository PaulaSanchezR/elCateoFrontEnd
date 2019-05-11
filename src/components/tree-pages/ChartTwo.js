import React , { Component } from "react";
import { render } from "react-dom";
import { Chart } from "react-google-charts";
import axios from "axios" ;

class ChartTwo extends Component{
    constructor(){
        super()
        this.state={
          listtreerecordArray:[],
          chardata:[]
        }}

componentDidMount(){
    axios.get(
      `${process.env.REACT_APP_API_URL}/listtreerecord`,
      { withCredentials:true}
    )
    .then(responseFromApi => {
      console.log("listtree" , responseFromApi.data)
      this.setState({ listtreerecordArray: responseFromApi.data})
    })
    .catch(err => console.log(err))
}
  render() {
      const  Illeness  = this.state.listtreerecordArray;
      const  listtreerecord  = this.state.listtreerecordArray;
      console.log( "listtreeIdSort", listtreerecord)
 if (Illeness.length > 0){
              function countData(arrayElemets) {
                    console.log( "arrayElements", arrayElemets)
                    arrayElemets.sort();

                    let current = null;
                    let cnt = 0;
                    let countArray =[["Illness", "Qty tree"]]
                    for (let i = 0; i < arrayElemets.length; i++) {
                        if (arrayElemets[i] != current) {
                            if (cnt > 0) {
                              countArray.push([current,cnt]);
                            // console.log(current , ' comes --> ', cnt , ' times');
                              console.log(countArray)
                            }
                            current = arrayElemets[i];
                            cnt = 1;
                        } else {
                            cnt++;
                        }
                    }
                    if (cnt > 0) {
                        countArray.push([current,cnt]);
                        console.log(current , ' comes --> ' , cnt , ' times');
                    }
                    return countArray;
           }

     let newInf =[]
     Illeness.forEach((oneRecord) =>{
     let illness = oneRecord["illness"]; 
          // createing an array of names
          newInf.push(illness.name);
          console.log(newInf);
          console.log("count", countData(newInf))
            })

        // for(j=0; j< this.state.)
       // this.state.chardata.push(["Illness", "Qty tree"])
         this.state.chardata.push(countData(newInf))

      }
      
      console.log( "chardata",this.state.chardata )
     return (
      <div className={"my-pretty-chart-container"}>
        <Chart
          chartType="Bar"
          data=//{this.state.chardata}
          // {[
          //   ['City', '2010 Population', '2000 Population'],
          //   ['New York City, NY', 8175000, 8008000],
          //   ['Los Angeles, CA', 3792000, 3694000],
          //   ['Chicago, IL', 2695000, 2896000],
          //   ['Houston, TX', 2099000, 1953000],
          //   ['Philadelphia, PA', 1526000, 1517000],
          // ]}
          {[
            ["Illness", "Qty tree"],
            ["Avocado root rot", 13],
            ["Green root rot", 14],
            ["Red root rot", 5]
          ]}
          width="60%"
          height="200px"

          options={{
            colors: ['#86d155', '#ffab91'],
            // Material design options
            chart: {
              
              title: 'Illensss',
              subtitle: 'Qty sickness trees',
            },
          }}
          legendToggle
        />
      </div>
    );
  }
}

export default ChartTwo
  
