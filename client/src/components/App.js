import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Schedule from './Schedule';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          stops: {},
          selectedStop: ""
        }
    this.getAll = this.getAll.bind(this)
    this.getStops = this.getStops.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getSchedule = this.getSchedule.bind(this)
    }
        getStops(lnglat) {
          console.log(this.state.lnglat)
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
        console.log(this.state)
    }
  getSchedule(station, feed) {
    return axios.get('/api/train', {
      params: {
        station: this.state.selectedStop,
        feed: parseInt(this.state.feed)
      }

    }).then((response) => {

      console.log(response.data.schedule)
      this.setState({ schedule: response.data.schedule })
      for(var stp in response.data.schedule) {
        this.setState({
                    north: response.data.schedule[stp].N,
                    south: response.data.schedule[stp].S
        })
      }

    })
    .catch(function(error) {
        console.log(error);
    });
  }
    componentDidMount() {
      
        this.getAll() 
    }
    handleClick(e) {
      e.preventDefault();      
       this.setState({selectedStop: e.currentTarget.dataset.id,
                               feed: parseInt(e.currentTarget.dataset.feed)
                        })  
      this.getSchedule(this.state.selectedStop, this.state.feed)

    }
    render() {
     
  var stopArr = this.state.stops
      if(Array.isArray(stopArr)) {     
      console.log(stopArr.length)
      var newStopArr = stopArr.map((stp, idx) => 

        <ListItem key={idx} data-id={stp.properties.stop_id} data-feed={stp.properties.stop_feed} value={stp.properties.stop_id} onClick={this.handleClick.bind(this)} primaryText={stp.properties.stop_name}/>       
      )
}
    return (
    <MuiThemeProvider>
    <div>
      <div className="App">
            <h1>3 stations.</h1>
            <List >{newStopArr}</List>            
      </div>
      <Schedule schedule={this.state.schedule} north={this.state.north} south={this.state.south}/>
   
      </div>
      
    </MuiThemeProvider>
    );
    }
}

export default App;