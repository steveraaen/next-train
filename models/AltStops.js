var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var altStopSchema = new Schema({
 
type: String,
  properties: {
      name: String,
      url: String,
      line: String,
      objectid: Number,
      notes: String
  },
   geometry: {}
});

var AltSubStop = mongoose.model("AltSubStop", altStopSchema);

module.exports = AltSubStop;