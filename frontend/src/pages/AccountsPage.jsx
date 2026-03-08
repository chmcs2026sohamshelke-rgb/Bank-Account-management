import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaIdCard, FaVenusMars, FaPiggyBank, FaShieldAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AccountsPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const navigate = useNavigate();

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('/accounts');
            setAccounts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch accounts', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            toast.error('Please enter an Account ID');
            return;
        }

        const foundAccount = accounts.find(
            acc => acc.accountId.toLowerCase() === searchQuery.toLowerCase()
        );

        if (foundAccount) {
            navigate(`/history/${foundAccount._id}`);
        } else {
            toast.error('Account ID is incorrect. Please use a valid ID.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-primary">
                All Accounts
            </h2>

            <div className="mb-8 max-w-md mx-auto">
                <div className="join w-full shadow-md">
                    <input
                        type="text"
                        placeholder="Search by Account ID..."
                        className="input input-bordered join-item w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="select select-bordered join-item"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Deactivated">Deactivated</option>
                    </select>
                    <button onClick={handleSearch} className="btn btn-primary join-item">Search</button>
                </div>
            </div>

            {accounts.length === 0 ? (
                <div className="text-center py-12 bg-base-200 rounded-xl shadow-inner">
                    <h3 className="text-2xl font-bold text-gray-500">No accounts found</h3>
                    <p className="py-4 text-gray-400">Get started by creating a new bank account.</p>
                    <Link to="/create" className="btn btn-primary">Create Your First Account</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accounts.filter(acc => {
                        const matchesSearch = acc.accountId.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchesStatus = statusFilter === 'All' || acc.status === statusFilter;
                        return matchesSearch && matchesStatus;
                    }).map((account) => (
                        <div key={account._id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all">
                            <div className="card-body">
                                <h3 className="card-title text-2xl mb-4 font-bold flex items-center gap-2">
                                    <FaUserAlt className="text-primary" /> {account.accountName}
                                </h3>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-lg">
                                        <FaIdCard className="text-gray-500" />
                                        <span className="font-semibold text-gray-600">ID:</span>
                                        <span className="font-mono bg-base-200 px-2 py-1 rounded">{account.accountId}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-lg">
                                        <FaVenusMars className="text-gray-500" />
                                        <span className="font-semibold text-gray-600">Gender:</span>
                                        <span>{account.gender || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-lg">
                                        <FaPiggyBank className="text-gray-500" />
                                        <span className="font-semibold text-gray-600">Type:</span>
                                        <span className={`badge ${account.accountType === 'Savings' || account.accountType === 'Saving' ? 'badge-primary' : 'badge-secondary'}`}>
                                            {account.accountType || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-lg">
                                        <FaShieldAlt className="text-gray-500" />
                                        <span className="font-semibold text-gray-600">Status:</span>
                                        <span className={`badge ${account.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                                            {account.status || 'Active'}
                                        </span>
                                    </div>
                                </div>

                                <div className="card-actions justify-end mt-4 gap-2">
                                    <Link to={`/history/${account._id}`} className="btn btn-sm btn-outline btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AccountsPage;
