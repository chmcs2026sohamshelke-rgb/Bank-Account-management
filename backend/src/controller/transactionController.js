import Transaction from '../models/Transaction.js';
import Account from '../models/AccountModel.js';

export const deposit = async (req, res) => {
    try {
        const { accountId, amount } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be positive' });
        }

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (account.status !== 'Active') {
            return res.status(400).json({ message: 'Account is not active' });
        }

        account.balance += Number(amount);
        if (account.accountType === 'Saving') {
            account.accountType = 'Savings';
        }
        await account.save();

        const transaction = new Transaction({
            accountId: account._id,
            type: 'Deposit',
            amount,
        });
        await transaction.save();


        account.transactions.push(transaction._id);
        await account.save();

        res.status(201).json({ transaction, balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const withdraw = async (req, res) => {
    try {
        const { accountId, amount } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be positive' });
        }

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (account.status !== 'Active') {
            return res.status(400).json({ message: 'Account is not active' });
        }

        if (account.accountType === 'Savings' || account.accountType === 'Saving') {
            return res.status(400).json({ message: 'In a savings account you cant withdraw the amount' });
        }


        if (account.balance - amount < 1000) {
            return res.status(400).json({ message: 'Insufficient balance. Minimum balance of 1000 required.' });
        }

        account.balance -= Number(amount);
        if (account.accountType === 'Saving') {
            account.accountType = 'Savings';
        }
        await account.save();

        const transaction = new Transaction({
            accountId: account._id,
            type: 'Withdraw',
            amount,
        });
        await transaction.save();


        account.transactions.push(transaction._id);
        await account.save();

        res.status(201).json({ transaction, balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const { accountId } = req.params;
        const transactions = await Transaction.find({ accountId }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
