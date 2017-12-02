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
        }
    this.handleClick = this.handleClick.bind(this)
    this.getAll = this.getAll.bind(this)
    this.getStops = this.getStops.bind(this)
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
    var sta = this.state.selectedStop;
    var feed = this.state.feed
    return axios.get('/api/train', {
      params: {
        station: sta,
        feed: parseInt(feed)
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
      this.getSchedule(e.currentTarget.dataset.id, parseInt(e.currentTarget.dataset.feed))

       this.setState({selectedStop: e.currentTarget.dataset.id,
                      feed: parseInt(e.currentTarget.dataset.feed)
                        })  


e.preventDefault();
    }
    render() {
     const listStyle = {
    list: {

    /*color: 'white',*/
  },
};
  var stopArr = this.state.stops
      if(Array.isArray(stopArr)) {     
      console.log(stopArr)
      var newStopArr = stopArr.map((stp, idx) => 

        <ListItem style={listStyle.list} key={idx} data-id={stp.properties.stop_id} data-feed={stp.properties.stop_feed} value={stp.properties.stop_id} onClick={this.handleClick.bind(this)} primaryText={stp.properties.stop_name + "  is   " + parseFloat((stp.distance.dist * 100) / 100).toFixed(3) + "  miles away"} />       
      )
}
    return (
    <MuiThemeProvider>
    <div>
      <div className="App">
            <h1>Nearest 3 Stations</h1>
            <List >{newStopArr}</List>            
      </div>
      <Schedule schedule={this.state.schedule} north={this.state.north} south={this.state.south}/>
   
      </div>
      
    </MuiThemeProvider>
    );
    }
}

export default App;