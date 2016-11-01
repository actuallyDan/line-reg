import React from 'react';
import Row from './Row.jsx';

export default class Table extends React.Component {
	constructor(){
		super();
		// let rows = this.generateRows().bind(this);
		this.state = {
			rowLength: 5,
			rows: []
					};
	}
	componentWillMount(){
		let rowLen = this.state.rowLength, rowDetail = [];
		for (var i = 1; i <= rowLen; i++) {
			rowDetail.push({id: i })
		}
		this.setState({rows: rowDetail});
	}
	addRow(event){
		if(event.key === "Enter" || event.key === "ArrowDown"){
            let thisRow = event.target.getAttribute("data-cell-id");
            if (parseInt(thisRow.substring(1,thisRow.length), 10) === this.state.rowLength) {
            	let tempRows = this.state.rows;
            	tempRows.push({id: this.state.rowLength + 1});
            	this.setState({rowLength: this.state.rowLength + 1, rows: tempRows});
            }
            let newRow = thisRow.substring(0,1) + (parseInt(thisRow.substring(1,thisRow.length), 10) + 1);
            document.getElementById(newRow).focus();
		}
	}

	render(){
		// console.log(this.state.rows);
		return(
			<table id="data-table">
			<thead><tr>
			<th>Y</th>
			<th>X<sub>1</sub></th>
			<th>X<sub>2</sub></th>
			<th>X<sub>3</sub></th>
			<th>X<sub>4</sub></th>

			</tr></thead>
			<tbody>
			{Object.keys(this.state.rows).map((key) => {
				return <Row key={key} row={this.state.rows[key].id} addRow={this.addRow.bind(this)}/>
			})}
			</tbody>
			</table>
			);
	}
}
 