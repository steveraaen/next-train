/*import axios from 'axios';
var lnglat = [-73.9840013, 40.676688899999995]  
var helpers = {

    getStops: function(lnglat) {
        return axios.get('/api/stops', {
                params: {
                    coordinates: [lnglat]
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
}
export default helpers*/