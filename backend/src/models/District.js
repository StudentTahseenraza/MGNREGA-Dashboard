import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema({
  districtId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  hiName: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  stateCode: {
    type: String,
    required: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  boundary: {
    type: mongoose.Schema.Types.Mixed // For GeoJSON polygon
  }
}, {
  timestamps: true
});

districtSchema.index({ geometry: '2dsphere' });
districtSchema.index({ state: 1, name: 1 });

export default mongoose.model('District', districtSchema);