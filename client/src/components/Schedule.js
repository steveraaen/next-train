import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Schedule extends Component {
	constructor(props) {
		super(props);
	}

	render() {
	var northTimes = [];
	var southTimes = [];
	var allTimes = [];
		if(this.props.timeTable) {	
		var tt = this.props.timeTable
		for(var n in tt) {
			northTimes.push(tt[n].N)
			southTimes.push(tt[n].S)
		}
		allTimes.push(northTimes, southTimes)
console.log(allTimes)
			for(let i = 0; i < 4; i++) {
				var fullLine = <TableRow><TableRowColumn key={i}>{allTimes[0][0][i].arrivalTime}</TableRowColumn><TableRowColumn key={i+1}>{allTimes[1][0][i].arrivalTime}</TableRowColumn></TableRow>
			}

			
		}
		return (
			<Table>
				<TableHeader>
					<TableRow>
					    <TableHeaderColumn>North</TableHeaderColumn>
					    <TableHeaderColumn>South</TableHeaderColumn>
						
					</TableRow>
				</TableHeader>
				<TableBody>
					{fullLine}
				</TableBody>
			</Table>
			)
	} 
}
export default Schedule
















