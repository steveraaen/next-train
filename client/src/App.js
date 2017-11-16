import React, { Component } from 'react';
import axios from 'axios'
import './App.css';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          stops: {}
        }
    this.getAll = this.getAll.bind(this)
    this.getStops = this.getStops.bind(this)
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
    render() {
      var stopArr = this.state.stops
      if(Array.isArray(stopArr)) {     
      console.log(stopArr.length)
      var newStopArr = stopArr.map((stp, idx) => 
        <div className="row" key={idx}>
          <div className="col-sm-6" >{stp.properties.stop_name}</div>
          <div className="col-sm-6" >{stp.properties.stop_id}</div>

        </div>
      )
}
    return (
      <div className="App">
            <h1>3 stations.</h1>
            <div className="container">{newStopArr}</div>
              
            
      </div>
    );
    }
}

export default App;