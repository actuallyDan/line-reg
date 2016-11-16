import React, { Component } from 'react';
import Table from './Table.jsx';
import {Chart} from 'react-google-charts'
import StatWrapper from './StatWrapper.jsx';
class App extends Component {
  constructor(){
    super();
    this.state ={
      data: [],
      chart: {
        height: window.innerHeight - 180 ,
        width: window.innerWidth - window.innerWidth * 0.55
      }
    };
  }
  updateData(data){
    let max = Number.MIN_VALUE, min = Number.MAX_VALUE;
    let yMin = min, xMin = min, yMax = max, xMax = max;
    let yLabel = document.getElementById("yLabel").value;
    let x1Label = document.getElementById("x1Label").value;

    for (var i = 1; i < data.length; i++) {
      yMin = data[i][1] < yMin ? data[i][1] : yMin  
      xMin = data[i][0] < xMin ? data[i][0] : xMin  
      yMax = data[i][1] > yMax ? data[i][1] : yMax  
      xMax = data[i][0] > xMax ? data[i][0] : xMax  
    }    
    this.setState({
      data: data,
      options: {
        title: x1Label + " vs. " + yLabel,
        hAxis: {title: x1Label, minValue: (xMin >= 0 ? 0 : xMin), maxValue: xMax},
        vAxis: {title: yLabel, minValue: (yMin >= 0 ? 0 : yMin), maxValue: yMax},
        legend: 'none',
        trendlines: {0: {
          type: 'linear',
           visibleInLegend: true
        }}
      },
      summaryStats:{
        n: data.length - 1,
        max_X: xMax,
        min_X: xMin,
        max_Y: yMax,
        min_Y: yMin,
        r: parseFloat(this.findRValue(data)).toFixed(4)
      }
    });

    console.log(this.state);
  }
  findRValue(data){
    let x_array = [], y_array = [];
    for(var i = 1, j = data.length; i < j; i++){
      x_array.push(data[i][0]);
      y_array.push(data[i][1]);
    }
    let x_sum = 0, y_sum = 0, x_sum_sq = 0, y_sum_sq = 0, prod_sum = 0;
    let n = x_array.length;
    for(let i = 0; i < n; i++){ 
      x_sum += x_array[i];
      y_sum += y_array[i];
      x_sum_sq += Math.pow(x_array[i], 2);
      y_sum_sq += Math.pow(y_array[i], 2);
      prod_sum += x_array[i] * y_array[i];
    }

    let numerator = prod_sum - (x_sum * y_sum / n);
    let denominator = Math.sqrt( (x_sum_sq - Math.pow(x_sum, 2) / n) * (y_sum_sq - Math.pow(y_sum, 2) / n) );

    return denominator === 0 ? 0 : numerator / denominator;
  }
  componentDidMount(){
    window.addEventListener("resize", this.handleResize.bind(this));
  }
  handleResize(){
    this.setState({
      chart: {
        height: window.innerHeight - 150 ,
        width: window.innerWidth - window.innerWidth * 0.55
      }
    });
  }
  setLabels(){
    let yLabel = document.getElementById("yLabel").value;
    let x1Label = document.getElementById("x1Label").value;
    if(x1Label !== "" || yLabel !== ""){
     this.setState({  
      options: {
        title: x1Label + " vs. " + yLabel,
        hAxis:{title: x1Label},
        vAxis:{title: yLabel},
        trendlines: {0: {type: this.state.options.trendlines[0].type,
        visibleInLegend: true}}
      }
    });
   }
 }
 toggleTrendLine(){
  let trend = this.state.options.trendlines[0].type === "linear" ? "exponential" : "linear";
  this.setState({  
      options: {
        title: x1Label + " vs. " + yLabel,
        hAxis:{title: x1Label},
        vAxis:{title: yLabel},
        trendlines: {0: {type: trend,
        visibleInLegend: true}}
      }
    });
 }
render() {
  return (

    <div className="App">
    <div id="side-nav"> 
    <div id="data-table-header">
    <p className="header-title flow-text">Data Table</p>
    <p className="header-subtitle flow-text">Enter results in the table below</p>
    </div>
    <Table updateData={this.updateData.bind(this)}/>
    </div>
    <div id="main">
    <div id="header"> 
    <p className="header-title flow-text">Linear Regression</p>
    <p className="header-subtitle flow-text">watch the data render on the right</p>
    <p className="header-built-with">Built with React and React Google Charts</p>
    </div>
    <div id="label-wrapper">
    <label htmlFor="yLabel" > Y Axis Label</label>              <input type="text" id="yLabel" onKeyUp={this.setLabels.bind(this)} defaultValue="Y Value"/> 
    <label htmlFor="x1Label" > X<sub>1</sub> Axis Label </label><input type="text" id="x1Label" onKeyUp={this.setLabels.bind(this)} defaultValue="X Value"/>
    <label htmlFor="toggleTrend"> Use Exponential? </label> <input type="checkbox" id="toggleTrend" onClick={this.toggleTrendLine.bind(this)}/>
    </div>
    <div id="graph-wrapper"> 
    {this.state.data.length > 1 ? <Chart chartType="ScatterChart" data={this.state.data} options={this.state.options} width={this.state.chart.width} graph_id="ScatterChart" height={ this.state.chart.height}  /> : "Enter data on the left to see the graph"}
    </div> 
    {this.state.data.length > 1 ? <StatWrapper stats={this.state.summaryStats} /> : ""}
    </div>
    </div>
    );
}
}

export default App;
