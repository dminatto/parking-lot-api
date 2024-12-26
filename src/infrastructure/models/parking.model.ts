import * as mongoose from "mongoose";

const ParkingHistorySchema = new mongoose.Schema({
  plate:{type: String},
  time: {type: Number},
  paid: {type: Boolean},
  left: {type: Boolean},
  createdDate: {type: Date, default:Date.now},
  updatedDate: {type: Date}
});

const ParkingSchema = new mongoose.Schema({
  plate:{type: String},
  history: { type : [ParkingHistorySchema] , "default" : [] },
  createdDate: {type: Date, default:Date.now},
  updatedDate: {type: Date}
});


export default mongoose.model('Parking', ParkingSchema);
