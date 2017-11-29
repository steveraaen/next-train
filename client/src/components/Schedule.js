import React, { Component } from 'react';
import axios from 'axios'
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
		this.state = {
			schedule: ""
		}
	this.getSchedule = this.getSchedule.bind(this)
	}
getSchedule() {
	return axios.get('./api/train', {
		params: {
			station: this.props.selectedStop,
			feed: parseInt(this.props.feed)
		}
	}).then((response) => {
                console.log(response)
                this.setState({ schedule: response })
            })
            .catch(function(error) {
                console.log(error);
            });
}
componentWillReceiveProps(nextProps) {
	console.log(this.props)
	this.getSchedule(this.nextProps)
	}
	render() {
		return (
			<div>Hello</div>
			)
	} 
}
export default Schedule