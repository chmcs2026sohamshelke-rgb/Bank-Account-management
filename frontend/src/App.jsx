import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/TransactionPage';
import AccountDetail from './pages/AccountDetail';
import AccountsPage from './pages/AccountsPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary drop-shadow-md">Bank Account Management</h1>

        <nav className="bg-gradient-to-r from-primary to-secondary p-4 rounded-xl mb-10 flex flex-wrap gap-4 justify-center shadow-lg text-primary-content">
          <Link to="/" className="btn btn-ghost normal-case text-xl hover:bg-white/20">Dashboard</Link>
          <Link to="/accounts" className="btn btn-ghost normal-case text-xl hover:bg-white/20">Accounts</Link>
          <Link to="/create" className="btn btn-ghost normal-case text-xl hover:bg-white/20">Create Account</Link>
          <Link to="/deposit" className="btn btn-ghost normal-case text-xl hover:bg-white/20">Transactions</Link>
        </nav>

        <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-200">
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/deposit" element={<TransactionPage />} />
            <Route path="/history/:accountId" element={<AccountDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
