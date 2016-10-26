import React from 'react';
import Row from './Row.jsx';

export default class Table extends React.Component {
	constructor(){
		super();
		// let rows = this.generateRows().bind(this);
		this.state = {
			rowLength: 5,
			rows: []
		}
	}
	componentWillMount(){
		let rowLen = this.state.rowLength, rowDetail = [];
		for (var i = 1; i <= rowLen; i++) {
			rowDetail.push({id: i })
		}
		this.setState({rows: rowDetail});
	}

	render(){
		console.log(this.state.rows);
		return(
			<table id="data-table">
			<tbody>
			{Object.keys(this.state.rows).map((key) => {
				return <Row key={key} row={this.state.rows[key].id}/>
			})}
			</tbody>
			</table>
			);
	}
}
 