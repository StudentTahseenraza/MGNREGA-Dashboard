import mongoose from 'mongoose';

const mgnregaSchema = new mongoose.Schema({
  districtId: {
    type: Number,
    required: true,
    index: true
  },
  financialYear: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  monthNumber: {
    type: Number,
    required: true
  },
  peopleBenefited: {
    type: Number,
    default: 0
  },
  personDays: {
    type: Number,
    default: 0
  },
  avgDaysPerPerson: {
    type: Number,
    default: 0
  },
  wageRate: {
    type: Number,
    default: 0
  },
  totalWorks: {
    type: Number,
    default: 0
  },
  completedWorks: {
    type: Number,
    default: 0
  },
  differentlyAbledWorked: {
    type: Number,
    default: 0
  },
  materialCost: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
mgnregaSchema.index({ districtId: 1, financialYear: 1, monthNumber: 1 });
mgnregaSchema.index({ districtId: 1, year: 1, monthNumber: 1 });

export default mongoose.model('MGNREGAData', mgnregaSchema);