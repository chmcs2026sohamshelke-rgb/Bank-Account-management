import { useState, useEffect } from 'react';
import axios from '../lib/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const TransactionForm = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Parse query params
    const queryParams = new URLSearchParams(location.search);
    const initialAccountId = queryParams.get('accountId') || '';
    const initialType = queryParams.get('type') || 'Deposit';

    const [formData, setFormData] = useState({
        accountId: initialAccountId,
        amount: '',
        type: initialType
    });

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('/accounts');
                setAccounts(response.data);
                if (response.data.length > 0 && !initialAccountId) {
                    setFormData(prev => ({ ...prev, accountId: response.data[0]._id }));
                }
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load accounts');
                setLoading(false);
            }
        };
        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = formData.type === 'Deposit' ? '/transactions/deposit' : '/transactions/withdraw';

        try {
            await axios.post(endpoint, {
                accountId: formData.accountId,
                amount: Number(formData.amount)
            });
            toast.success(`${formData.type} successful!`);
            setFormData({ ...formData, amount: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Transaction failed');
        }
    };

    if (loading) return <div className="text-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">New Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Select Account</span>
                    </label>
                    <select
                        name="accountId"
                        className="select select-bordered w-full"
                        value={formData.accountId}
                        onChange={handleChange}
                        required
                    >
                        {accounts.map(acc => (
                            <option key={acc._id} value={acc._id}>
                                {acc.accountName} ({acc.accountId}) - ₹{acc.balance}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Transaction Type</span>
                    </label>
                    <div className="flex gap-4">
                        <label className="label cursor-pointer gap-2">
                            <span className="label-text">Deposit</span>
                            <input
                                type="radio"
                                name="type"
                                value="Deposit"
                                className="radio radio-success"
                                checked={formData.type === 'Deposit'}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="label cursor-pointer gap-2">
                            <span className="label-text">Withdraw</span>
                            <input
                                type="radio"
                                name="type"
                                value="Withdraw"
                                className="radio radio-error"
                                checked={formData.type === 'Withdraw'}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Amount</span>
                    </label>
                    <input
                        type="number"
                        name="amount"
                        placeholder="e.g. 500"
                        className="input input-bordered w-full"
                        value={formData.amount}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`btn w-full mt-6 ${formData.type === 'Deposit' ? 'btn-success' : 'btn-error'}`}
                >
                    {formData.type === 'Deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
