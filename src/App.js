import React, { Component } from 'react';
import Table from './Table.jsx';
import {Chart} from 'react-google-charts'

class App extends Component {
  constructor(){
    super();
    this.state ={
      data: []
    };
  }
  updateData(data){
    let max = Math.minValue, min = Math.maxValue;
    let yMin = min, xMin = min, yMax = max, xMax = max;
    for (var i = 1; i < data.length; i++) {
      yMin = data[i][1] < yMin ? data[i][1] : yMin  
      xMin = data[i][0] < xMin ? data[i][0] : xMin  
      yMax = data[i][1] > yMax ? data[i][1] : yMax  
      xMax = data[i][0] > xMax ? data[i][0] : xMax  
    }    
    this.setState({
      data: data,
      options: {
          title: data[0][0] + " vs. " + data[0][1],
          hAxis: {title: data[0][0], minValue: (xMin >= 0 ? 0 : xMin), maxValue: yMax},
          vAxis: {title: data[0][1], minValue: (yMin >= 0 ? 0 : yMin), maxValue: xMax},
          legend: 'none',
          trendlines: {0: {}}
        }
      });
  
}
  render() {
    return (

      <div className="App">
        <Table updateData={this.updateData.bind(this)}/>
        {this.state.data.length > 1 ? <Chart chartType="ScatterChart" data={this.state.data} options={this.state.options} graph_id="ScatterChart"  width={"100%"} height={"400px"}  legend_toggle={true} /> : ""}
      </div>
    );
  }
}

export default App;
