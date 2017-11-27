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
   	type: {type: String, default: "Point"},
   	coordinates: {type: [Number], index: '2dsphere'}
   }
});

var mainSubStop = mongoose.model("mainSubStop", mainStopSchema);

module.exports = mainSubStop;

