import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 6,
    marginBottom: 6,
    fontWeight: 400,
  },
  south: {
  	backgroundColor:"#E39134",
  	justify: "right"
  }
};


class Schedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ts: Math.round((new Date()).getTime() / 1000),
			value: 'a',
		}

	}
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };
	render() {

		if(this.props.north && this.props.south) {

	var nrth = this.props.north
	var sth = this.props.south
	console.log(this.props)
		var nrthMap = nrth.map((time, idx) => 
		<TableRow key={idx}>
            <TableRowColumn key={idx + "_nt"}>{time.routeId}</TableRowColumn>
            <TableRowColumn key={idx + "_nm"}>{moment.unix(time.arrivalTime).format("HH:mm")}</TableRowColumn>
            <TableRowColumn key={idx + "_nts"}>{Math.round((time.arrivalTime - this.state.ts) / 60)}</TableRowColumn>
          </TableRow>

			)
		var sthMap = sth.map((time, idx) => 
		<TableRow key={idx}>
            <TableRowColumn key={idx + "_st"}>{time.routeId}</TableRowColumn>
            <TableRowColumn key={idx + "_sm"}>{moment.unix(time.arrivalTime).format("HH:mm")}</TableRowColumn>
            <TableRowColumn key={idx + "_sts"}>{Math.round((time.arrivalTime - this.state.ts) / 60)}</TableRowColumn>
          </TableRow>

			)
}
		return (
	<div className="App">
<Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="North" value="a">
          <div>
            <h2 style={styles.headline}>Northbound Trains</h2>
		<Table >
			<TableHeader displaySelectAll={false} >
				<TableRow >
			        <TableHeaderColumn>Line</TableHeaderColumn>
			        <TableHeaderColumn>Arrives At</TableHeaderColumn>
   					<TableHeaderColumn>Arrives In (minutes)</TableHeaderColumn>					
				</TableRow>
			</TableHeader>
			<TableBody displayRowCheckbox={false}>
				{ nrthMap }
			</TableBody>
		</Table>
          </div>
        </Tab>
        <Tab style={styles.south} label="South" value="b">
          <div>
            <h2 style={styles.headline}>Southbound Trains</h2>
		<Table >
			<TableHeader displayRowCheckbox={false}>
				<TableRow >
			        <TableHeaderColumn>Line</TableHeaderColumn>
			        <TableHeaderColumn>Arrives At</TableHeaderColumn>
   					<TableHeaderColumn>Arrives In (minutes)</TableHeaderColumn>					
				</TableRow>
			</TableHeader>
			<TableBody displayRowCheckbox={false}>
				{ sthMap }
			</TableBody>
		</Table>
          </div>
        </Tab>
      </Tabs>




	</div>
			)
	} 
}
export default Schedule
















