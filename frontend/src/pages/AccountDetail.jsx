import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaShieldAlt } from 'react-icons/fa';

const TransactionHistory = () => {
    const { accountId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionLoading, setTransactionLoading] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        accountName: '',
        accountId: '',
        accountType: 'Savings',
        gender: 'Male'
    });
    const [editLoading, setEditLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch account details for display FIRST
                const accountsRes = await axios.get('/accounts');
                const foundAccount = accountsRes.data.find(acc => acc._id === accountId);
                if (foundAccount) {
                    setAccount({
                        ...foundAccount,
                        accountType: foundAccount.accountType === 'Saving' ? 'Savings' : foundAccount.accountType
                    });
                    setEditFormData({
                        accountName: foundAccount.accountName,
                        accountId: foundAccount.accountId,
                        accountType: foundAccount.accountType === 'Saving' ? 'Savings' : foundAccount.accountType,
                        gender: foundAccount.gender
                    });
                }

                // Fetch transactions safely so if disabled, it doesn't break
                try {
                    const historyRes = await axios.get(`/transactions/${accountId}`);
                    setTransactions(historyRes.data);
                } catch (txError) {
                    console.log("Transactions not available.");
                    setTransactions([]);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error('Failed to load data');
                setLoading(false);
            }
        };

        if (accountId) fetchData();
    }, [accountId]);

    const handleTransaction = async (type) => {
        if (!transactionAmount || transactionAmount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        setTransactionLoading(true);
        const endpoint = type === 'Deposit' ? '/transactions/deposit' : '/transactions/withdraw';

        try {
            await axios.post(endpoint, {
                accountId: accountId,
                amount: Number(transactionAmount)
            });
            toast.success(`${type} successful!`);
            setTransactionAmount('');

            // Refresh data
            const accountsRes = await axios.get('/accounts');
            const foundAccount = accountsRes.data.find(acc => acc._id === accountId);
            if (foundAccount) setAccount(foundAccount);

            try {
                const historyRes = await axios.get(`/transactions/${accountId}`);
                setTransactions(historyRes.data);
            } catch (txError) {
                console.log("Failed to refresh transactions");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Transaction failed');
        } finally {
            setTransactionLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to completely delete this account? This action cannot be undone.')) return;

        try {
            await axios.delete(`/accounts/${accountId}`);
            toast.success('Account deleted successfully');
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            toast.error('Failed to delete account');
        }
    };

    const handleToggleStatus = async () => {
        if (!account) return;
        const newStatus = account.status === 'Active' ? 'Deactivated' : 'Active';
        if (!window.confirm(`Are you sure you want to change the status to ${newStatus}?`)) return;

        try {
            const res = await axios.patch(`/accounts/${accountId}`, { status: newStatus });
            setAccount(res.data);
            toast.success(`Account status changed to ${newStatus}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        try {
            const res = await axios.put(`/accounts/${accountId}`, editFormData);
            setAccount(res.data);
            toast.success('Account updated successfully');
            setIsEditModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update account');
        } finally {
            setEditLoading(false);
        }
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="text-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    Transaction History {account ? `- ${account.accountName}` : ''}
                </h2>
                <div className="flex gap-2">
                    {account && (
                        <button onClick={handleToggleStatus} className={`btn btn-outline ${account.status === 'Active' ? 'btn-warning' : 'btn-success'}`}>
                            <FaShieldAlt /> {account.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                    )}
                    <button onClick={() => setIsEditModalOpen(true)} className="btn btn-primary btn-outline" disabled={!account}>
                        <FaEdit /> Edit Account
                    </button>
                    <button onClick={handleDelete} className="btn btn-error btn-outline" disabled={!account}>
                        <FaTrash /> Delete Account
                    </button>
                    <Link to="/" className="btn btn-outline">Back</Link>
                </div>
            </div>

            {account && (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-base-100 p-6 rounded-xl shadow border border-base-200">
                        <h3 className="font-bold text-xl mb-4 text-primary border-b pb-2">Account Information</h3>
                        <div className="grid grid-cols-2 gap-y-3">
                            <div>
                                <span className="text-gray-500 font-semibold block text-sm">Account Name</span>
                                <span className="font-medium text-lg">{account.accountName}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 font-semibold block text-sm">Current Balance</span>
                                <span className={`font-bold text-lg ${account.balance < 1000 ? 'text-error' : 'text-success'}`}>₹{account.balance}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 font-semibold block text-sm">Account ID</span>
                                <span className="font-mono bg-base-200 px-2 py-0.5 rounded text-sm">{account.accountId}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 font-semibold block text-sm">Account Type</span>
                                <span className={`badge ${account.accountType === 'Savings' || account.accountType === 'Saving' ? 'badge-primary' : 'badge-secondary'}`}>{account.accountType || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 font-semibold block text-sm">Gender</span>
                                <span>{account.gender}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 font-semibold block text-sm">Created On</span>
                                <span className="text-sm">{new Date(account.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 font-semibold block text-sm">Status</span>
                                <span className={`badge ${account.status === 'Active' ? 'badge-success' : 'badge-error'}`}>{account.status || 'Active'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-base-100 p-6 rounded-xl shadow border border-base-200">
                        <h3 className="font-bold text-lg mb-4">Quick Transaction</h3>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                placeholder="Amount"
                                className="input input-bordered w-full"
                                value={transactionAmount}
                                onChange={(e) => setTransactionAmount(e.target.value)}
                                disabled={transactionLoading}
                                min="1"
                            />
                            <button
                                onClick={() => handleTransaction('Deposit')}
                                disabled={transactionLoading || !transactionAmount}
                                className="btn btn-success text-white"
                            >
                                Deposit
                            </button>
                            <button
                                onClick={() => handleTransaction('Withdraw')}
                                disabled={transactionLoading || !transactionAmount}
                                className="btn btn-error text-white"
                            >
                                Withdraw
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn, index) => (
                            <tr key={index} className="hover">
                                <td>{new Date(txn.date).toLocaleString()}</td>
                                <td>
                                    <span className={`badge ${txn.type === 'Deposit' ? 'badge-success' : 'badge-error'}`}>
                                        {txn.type}
                                    </span>
                                </td>
                                <td className="font-bold">₹{txn.amount}</td>
                            </tr>
                        ))}
                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center py-4">No transactions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isEditModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box relative">
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                        >✕</button>
                        <h3 className="text-lg font-bold mb-4">Edit Account Details</h3>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Account Name</span></label>
                                <input type="text" name="accountName" className="input input-bordered w-full" value={editFormData.accountName} onChange={handleEditChange} required />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Account ID</span></label>
                                <input type="text" name="accountId" className="input input-bordered w-full" value={editFormData.accountId} onChange={handleEditChange} required />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Account Type</span></label>
                                <select name="accountType" className="select select-bordered w-full" value={editFormData.accountType} onChange={handleEditChange}>
                                    <option value="Savings">Savings</option>
                                    <option value="Current">Current</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Gender</span></label>
                                <div className="flex gap-4">
                                    <label className="label cursor-pointer gap-2">
                                        <span className="label-text">Male</span>
                                        <input type="radio" name="gender" value="Male" className="radio radio-primary" checked={editFormData.gender === 'Male'} onChange={handleEditChange} />
                                    </label>
                                    <label className="label cursor-pointer gap-2">
                                        <span className="label-text">Female</span>
                                        <input type="radio" name="gender" value="Female" className="radio radio-primary" checked={editFormData.gender === 'Female'} onChange={handleEditChange} />
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-full mt-4" disabled={editLoading}>
                                {editLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;
