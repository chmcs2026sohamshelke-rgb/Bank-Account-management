import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
    unique: true,
  },
  accountType: {
    type: String,
    enum: ['Savings', 'Current'],
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v >= 1000;
      },
      message: 'Balance must be at least 1000.',
    },
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Deactivated'],
    default: 'Active',
  },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  }],
}, { timestamps: true });

const Account = mongoose.model('Account', accountSchema);
export default Account;
