import React, { Component } from 'react';
import Table from './Table.jsx';
import {Chart} from 'react-google-charts'

class App extends Component {
  constructor(){
    super();
    this.state ={
      data: [],
      chart: {
        height: window.innerHeight - 180 ,
        width: window.innerWidth - window.innerWidth * 0.4
      }
    };
  }
  updateData(data){
    let max = Math.minValue, min = Math.maxValue;
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
        hAxis: {title: x1Label, minValue: (xMin >= 0 ? 0 : xMin), maxValue: yMax},
        vAxis: {title: yLabel, minValue: (yMin >= 0 ? 0 : yMin), maxValue: xMax},
        legend: 'none',
        trendlines: {0: {}}
      }
    });

  }
  componentDidMount(){
    window.addEventListener("resize", this.handleResize.bind(this));
  }
  handleResize(){
    this.setState({
      chart: {
        height: window.innerHeight - 150 ,
        width: window.innerWidth - window.innerWidth * 0.35
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
        trendlines: {0: {}}
      }
      });
    }
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
          <label htmlFor="yLabel" > Y Axis Label</label>              <input type="text" id="yLabel" onKeyUp={this.setLabels.bind(this)} defaultValue="Y Value"/> 
          <label htmlFor="x1Label" > X<sub>1</sub> Axis Label </label><input type="text" id="x1Label" onKeyUp={this.setLabels.bind(this)} defaultValue="X Value"/>
          <label htmlFor="x2Label" > X<sub>2</sub> Axis Label </label><input type="text" id="x2Label"/> 
          <label htmlFor="x3Label" > X<sub>3</sub> Axis Label </label><input type="text" id="x3Label"/>  
          <label htmlFor="x4Label" > X<sub>4</sub> Axis Label </label><input type="text" id="x4Label"/> 
          <div id="graph-wrapper"> 
            {this.state.data.length > 1 ? <Chart chartType="ScatterChart" data={this.state.data} options={this.state.options} width={this.state.chart.width} graph_id="ScatterChart" height={ this.state.chart.height}  /> : ""}
         </div> 
        </div>
      </div>
      );
  }
}

export default App;
