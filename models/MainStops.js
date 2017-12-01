var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mainStopSchema = new Schema({
  type: {type: String, default: "Feature" },
  properties: {
      stop_name:{ type: String, required: true},
      stop_id:{ type: String, required: true},
      stop_feed:{ type: Number, required: false}     
  },
   geometry: {
    coordinates: [Number]
   }
});

var mainsubstop = mongoose.model("mainsubstop", mainStopSchema);

module.exports = mainsubstop;

