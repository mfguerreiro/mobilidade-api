import mongoose from '../../../config/mongodb/mongoose';
const { Schema } = mongoose;

const modelName = 'userPosition';
const userPositionSchema = new Schema(
  {
    fkUserCad: {
      type: Number,
      index: true,
      required: true,
    },
    position: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      accuracy: Number,
      speed: Number,
      compass: Number,
      altitude: Number,
      time: Date,
    },
    sendAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(modelName, userPositionSchema);
