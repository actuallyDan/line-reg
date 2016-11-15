import React from 'react';

export default class StatWrapper extends React.Component {
	render(){
		return (       
			<div id="stat-wrapper">
				<table>
				<thead>
					<tr><th colSpan="2">Summary Statistics</th></tr>
				</thead>
				<tbody>
					<tr><td>n:</td><td>{this.props.stats.n}</td></tr>
					<tr><td>Max X: </td><td>{this.props.stats.max_X}</td></tr>
					<tr><td>Min X:</td><td>{this.props.stats.min_X}</td></tr>
					<tr><td>Max Y:</td><td>{this.props.stats.max_Y}</td></tr>
					<tr><td>Min Y:</td><td>{this.props.stats.min_Y}</td></tr>
					<tr><td>r: </td><td>{this.props.stats.r}</td></tr>

				</tbody>
				</table>
			</div>
			);
	}
}