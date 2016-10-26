import React, { Component } from 'react';
import Table from './Table.jsx';
import {Chart} from 'react-google-charts'

class App extends Component {
  constructor(){
    super();

    this.state ={
      data: [     ['Age', 'Weight'], [ 8,      12], [ 4,      5.5]],
      options: {
            title: 'Age vs. Weight',
          hAxis: {title: 'Age', minValue: 0, maxValue: 15},
          vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
          legend: 'none',
          trendlines: {0: {}}
      }
    }
  }
  render() {
    return (
      <div className="App">
        <Table />
        <Chart chartType="ScatterChart" data={this.state.data} options={this.state.options} graph_id="ScatterChart"  width={"100%"} height={"400px"}  legend_toggle={true} />
      </div>
    );
  }
}

export default App;
