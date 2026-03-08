import Account from '../models/AccountModel.js';

export const createAccount = async (req, res) => {
    try {
        const { accountName, accountId, accountType, balance, gender } = req.body;


        const existingAccount = await Account.findOne({ accountId });
        if (existingAccount) {
            return res.status(400).json({ message: 'Account ID already exists' });
        }


        if (balance < 1000) {
            return res.status(400).json({ message: 'Initial balance must be at least 1000' });
        }

        const newAccount = new Account({
            accountName,
            accountId,
            accountType,
            balance,
            gender,
            status: 'Active'
        });

        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Active', 'Deactivated'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const account = await Account.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const { accountName, accountId, accountType, gender } = req.body;

        const updatedAccount = await Account.findByIdAndUpdate(
            id,
            { accountName, accountId, accountType, gender },
            { new: true, runValidators: true }
        );

        if (!updatedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json(updatedAccount);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Account ID already exists' });
        }
        res.status(500).json({ message: error.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findByIdAndDelete(id);

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
