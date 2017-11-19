var request = require('request');
var Mta = require('mta-gtfs');
var moment = require('moment');

function getMtaSched() {
var mta = new Mta({
  key: 'd95f1fb11f498729369198ba2d321657', // only needed for mta.schedule() method
  feed_id: 2                
});

mta.schedule(['R31','R32'], 16).then(function (result) {

for(let i = 1; i < result.schedule.R32.S.length; i++) {
    let j = i - 1
    var time = moment.unix(result.schedule.R32.S[i].arrivalTime).format("YYYY-MM-DD HH:mm");
    console.log(time);

}

});
}
module.exports = getMtaSched