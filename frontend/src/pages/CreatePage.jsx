import { useState } from 'react';
import axios from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AccountForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        accountName: '',
        accountId: '',
        accountType: 'Savings',
        balance: '',
        gender: 'Male'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.balance < 1000) {
            toast.error('Initial balance must be at least 1000');
            return;
        }

        try {
            await axios.post('/accounts', formData);
            toast.success('Account created successfully!');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create account');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Account Name</span>
                    </label>
                    <input
                        type="text"
                        name="accountName"
                        placeholder="e.g. John Doe"
                        className="input input-bordered w-full"
                        value={formData.accountName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Account ID</span>
                    </label>
                    <input
                        type="text"
                        name="accountId"
                        placeholder="e.g. ACC1001"
                        className="input input-bordered w-full"
                        value={formData.accountId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Account Type</span>
                    </label>
                    <select
                        name="accountType"
                        className="select select-bordered w-full"
                        value={formData.accountType}
                        onChange={handleChange}
                    >
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Initial Balance (Min 1000)</span>
                    </label>
                    <input
                        type="number"
                        name="balance"
                        placeholder="1000"
                        className="input input-bordered w-full"
                        value={formData.balance}
                        onChange={handleChange}
                        min="1000"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Gender</span>
                    </label>
                    <div className="flex gap-4">
                        <label className="label cursor-pointer gap-2">
                            <span className="label-text">Male</span>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                className="radio radio-primary"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="label cursor-pointer gap-2">
                            <span className="label-text">Female</span>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                className="radio radio-primary"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-6">Create Account</button>
            </form>
        </div>
    );
};

export default AccountForm;
