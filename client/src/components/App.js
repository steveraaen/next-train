import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Schedule from './Schedule';
import CardExampleWithAvatar from './CardExample';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          stops: {}
        }
    this.getAll = this.getAll.bind(this)
    this.getStops = this.getStops.bind(this)
    this.handleClick = this.handleClick.bind(this)
    }
        getStops(lnglat) {
        return axios.get('/api/stops', {
                params: {
                    coordinates: this.state.lnglat
                }
            })
            .then((response) => {
                console.log(response.data)
                this.setState({ stops: response.data })
            })
            .catch(function(error) {
                console.log(error);
            });

    }
      getAll() {
        var uloc = navigator.geolocation.getCurrentPosition(function(pos) {
            var { longitude, latitude, accuracy } = pos.coords
            this.setState({
                longitude: longitude,
                latitude: latitude,
                lnglat: [longitude, latitude],
                accuracy: accuracy
            })
            this.getStops()

        }.bind(this))
    }
    componentWillMount() {
      this.getAll()  
    }
    handleClick(e) {
      e.preventDefault();
        console.log(e.target.innerHTML)
        console.log(this.state)
        this.setState({selectedStop: e.target.innerHTML})       
    }
    render() {
  var stopArr = this.state.stops
      if(Array.isArray(stopArr)) {     
      console.log(stopArr.length)
      var newStopArr = stopArr.map((stp, idx) => 
        
        <ListItem className="row" key={idx} id={stp.properties.stop_id} value={stp.properties.stop_id} onClick={this.handleClick.bind(this)} >
          <div className="col-sm-4" >{stp.properties.stop_name}</div>
          <div className="col-sm-4" >{stp.properties.stop_id}</div>
          <div className="col-sm-4" >{stp.properties.parent_station}</div>
        </ListItem>
      )
}
    return (
    <MuiThemeProvider>
    <div>
      <div className="App">
            <h1>3 stations.</h1>
            <List >{newStopArr}</List>            
      </div>
      <Schedule selStop={this.state.stops}/>
      <CardExampleWithAvatar stops={ this.state.stops}/>
      </div>
      
    </MuiThemeProvider>
    );
    }
}

export default App;