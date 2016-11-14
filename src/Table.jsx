import React from 'react';
import Row from './Row.jsx';

export default class Table extends React.Component {
	constructor(){
		super();
		// let rows = this.generateRows().bind(this);
		this.state = {
			rowLength: window.innerHeight / 27,
			rows: [],
			data: [["X Label", "Y Label"]]
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
		} else if(e.target.value !== ""){
			// this.addValue(e.target.getAttribute("data-cell-id"), e.target.value);
			let thisCell = e.target.getAttribute("data-cell-id").substring(0,1);
			let thisRow = e.target.getAttribute("data-cell-id").substring(1);
			let match = thisCell === "A" ? "B" : "A";
			let thisCellValue = parseFloat(document.getElementById(thisCell + thisRow).value);
			let matchValue = parseFloat(document.getElementById(match + thisRow).value);
			let currData = this.state.data;

			if (thisCellValue !== "NaN" && matchValue !== "NaN") {
				//If X1 has a corresponding Y value or vice versa add it to the data array of arrays
				thisCell = match === "A"? [thisCellValue, matchValue] : [matchValue, thisCellValue];
				//console.log(thisCell);
				currData[thisRow] = thisCell;
				this.setState({data: currData});
				this.props.updateData(this.state.data);
			} else {
				currData.splice(thisRow, 1);
				this.setState({data: currData});
				this.props.updateData(this.state.data);
			}
		} else if (e.which < 48 || e.which > 57 || e.which !== 8 || e.which !== 46){
			e.target.substring(0, e.target.length - 2);
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
