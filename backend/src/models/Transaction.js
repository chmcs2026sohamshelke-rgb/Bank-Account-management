import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Deposit', 'Withdraw']
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
