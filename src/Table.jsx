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
	addRow(e){
		if(e.key === "Enter" || e.key === "ArrowDown"){
            let thisRow = e.target.getAttribute("data-cell-id");
            if (parseInt(thisRow.substring(1,thisRow.length), 10) === this.state.rowLength) {
            	let tempRows = this.state.rows;
            	tempRows.push({id: this.state.rowLength + 1});
            	this.setState({rowLength: this.state.rowLength + 1, rows: tempRows});
            }
            let newRow = thisRow.substring(0,1) + (parseInt(thisRow.substring(1,thisRow.length), 10) + 1);
            document.getElementById(newRow).focus();
		}  else if(e.key === "ArrowRight"){
			let current = e.target;
			let next = current.parentNode;
			next = next.nextSibling;
			next = next.getElementsByTagName('input')[0];
			next.focus();
		} else if(e.key === "ArrowLeft"){
			let current = e.target;
			let next = current.parentNode;
			next = next.previousSibling;
			next = next.getElementsByTagName('input')[0];
			next.focus();
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
				return <Row key={key} row={this.state.rows[key].id} handleKeyPress={this.addRow.bind(this)}/>
			})}
			</tbody>
			</table>
			);
	}
}
 