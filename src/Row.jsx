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
	render(){
		
		return (<tr>
			{Object.keys(this.state.columns).map((key) => {
				return <td key={key}> <input id={this.state.columns[key].id + this.props.row} data-cell-id={this.state.columns[key].id + this.props.row} type="text"  onKeyUp={this.props.handleKeyPress}/> </td>
			})}
			</tr>)
	}
}