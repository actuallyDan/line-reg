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
	focus(e){
		e.target.style.boxShadow = (e.target.style.boxShadow  === "" || e.target.style.boxShadow  === "none") ? "0 0 10px #0090ff" : "none";
	}
	render(){
		
		return (<tr>
			{Object.keys(this.state.columns).map((key) => {
				return <td key={key}> <input className="table-cell" 
											 id={this.state.columns[key].id + this.props.row} 
											 data-cell-id={this.state.columns[key].id + this.props.row} 
											 type="text"
											 onFocus={this.focus}  
 											 onBlur={this.focus}  
											 onKeyUp={this.props.handleKeyPress}/> 
						</td>
			})}
			</tr>)
	}
}