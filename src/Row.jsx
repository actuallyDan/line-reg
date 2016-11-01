import React from 'react';

export default class Row extends React.Component {
	constructor(){
		super();
		this.state = {
			colLength: 5,
			columns: []
		}
	}
	componentWillMount(){
		let colLen = this.state.colLength, colDetail = [];
		for (var i = 1; i <= colLen; i++) {
			colDetail.push({id: String.fromCharCode("A".charCodeAt(0)+i-1) })
		}
		this.setState({columns: colDetail});
	}
	handleKeyPress(e){
		if(e.key === "Enter" || e.key === "ArrowDown"){
			this.props.addRow(e);
		} else if(e.key === "ArrowRight"){
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
		
		return (<tr>
			{Object.keys(this.state.columns).map((key) => {
				return <td key={key}> <input id={this.state.columns[key].id + this.props.row} data-cell-id={this.state.columns[key].id + this.props.row} type="text"  handleKeyPress={this.nextRow.bind(this)}/> </td>
			})}
			</tr>)
	}
}