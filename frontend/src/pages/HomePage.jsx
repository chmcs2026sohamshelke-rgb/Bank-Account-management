import { Link } from 'react-router-dom';
import { FaShieldAlt, FaBolt, FaMobileAlt, FaBuilding, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaStar, FaBriefcase, FaPiggyBank } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="bg-base-100 min-h-screen pt-4">
            {/* Main Header / Hero Section */}
            <div className="hero bg-gradient-to-br from-primary/10 to-secondary/10 py-16 rounded-3xl mb-12 shadow-inner border border-primary/5">
                <div className="hero-content text-center">
                    <div className="max-w-3xl">
                        <div className="flex justify-center mb-6 text-primary">
                            <FaBuilding className="w-24 h-24 drop-shadow-md" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-4 drop-shadow-sm tracking-tight">
                            CHM Bank
                        </h1>
                        <p className="py-2 text-2xl md:text-3xl font-semibold text-base-content/80">
                            Secure. Simple. Smart Banking.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 space-y-16 pb-16">

                {/* Welcome Section */}
                <section className="text-center max-w-4xl mx-auto">
                    <div className="flex justify-center mb-4">
                        <span className="badge badge-warning badge-outline p-4 gap-2 text-lg font-bold">
                            <FaStar className="text-warning" /> Welcome to CHM Bank
                        </span>
                    </div>
                    <p className="text-xl text-base-content/80 leading-relaxed mt-6 font-medium">
                        Welcome to <strong className="text-primary">CHM Bank</strong> — your trusted partner in financial growth and security.
                        We provide fast, reliable, and secure banking services designed to meet your everyday needs.
                        Open your bank account online in just a few simple steps and enjoy seamless digital banking services from anywhere, anytime.
                    </p>
                    <div className="divider w-2/3 mx-auto mt-10"></div>
                </section>

                {/* Our Services Section */}
                <section>
                    <h2 className="text-4xl font-extrabold text-center mb-12 text-secondary flex items-center justify-center gap-4">
                        💳 Our Services
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="card bg-base-100 shadow-xl border border-base-300 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="card-body items-center text-center p-10">
                                <div className="w-20 h-20 rounded-full bg-info/20 flex items-center justify-center text-info mb-6 shadow-sm">
                                    <FaPiggyBank className="w-10 h-10" />
                                </div>
                                <h3 className="card-title text-3xl mb-4 font-bold">Savings Account</h3>
                                <p className="text-base-content/70 text-lg">Open a savings account with zero hassle and start earning interest on your deposits.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl border border-base-300 hover:border-secondary/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="card-body items-center text-center p-10">
                                <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center text-success mb-6 shadow-sm">
                                    <FaBriefcase className="w-10 h-10" />
                                </div>
                                <h3 className="card-title text-3xl mb-4 font-bold">Current Account</h3>
                                <p className="text-base-content/70 text-lg">Perfect for businesses and professionals who need frequent transactions.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Open Your Account Today */}
                <section>
                    <div className="divider max-w-4xl mx-auto mb-12"></div>
                    <div className="bg-gradient-to-r from-primary/10 to-base-100 rounded-3xl p-8 md:p-14 shadow-lg border border-primary/20">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex-1">
                                <h2 className="text-4xl font-extrabold mb-6 flex items-center gap-3 text-primary">
                                    🚀 Open Your Account Today
                                </h2>
                                <p className="text-xl text-base-content/80 mb-8 font-medium">Register your bank account in just 5 minutes.</p>
                                <ul className="space-y-4 mb-8 text-xl font-semibold text-base-content/90">
                                    <li className="flex items-center gap-4"><FaCheckCircle className="text-success w-6 h-6" /> Easy Registration</li>
                                    <li className="flex items-center gap-4"><FaCheckCircle className="text-success w-6 h-6" /> Instant Account Creation</li>
                                    <li className="flex items-center gap-4"><FaCheckCircle className="text-success w-6 h-6" /> Safe & Encrypted System</li>
                                </ul>
                            </div>
                            <div className="flex-1 flex justify-center md:justify-end">
                                <Link to="/create" className="btn btn-primary btn-lg shadow-xl hover:shadow-primary/50 hover:scale-105 transition-all w-full md:w-auto text-xl h-auto py-4 px-8 border-none bg-gradient-to-r from-primary to-primary-focus">
                                    👉 Open Account Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us? */}
                <section>
                    <div className="divider max-w-4xl mx-auto my-16"></div>
                    <h2 className="text-4xl font-extrabold text-center mb-14 text-secondary">🔐 Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 bg-base-100 border border-base-200 shadow-md rounded-2xl hover:bg-base-200/50 hover:shadow-xl transition-all">
                            <FaShieldAlt className="w-14 h-14 mx-auto text-success mb-6 drop-shadow-sm" />
                            <h3 className="font-bold text-2xl mb-3">100% Secure Banking</h3>
                            <p className="text-md text-base-content/70">Your data and money are protected with enterprise-grade security.</p>
                        </div>
                        <div className="p-8 bg-base-100 border border-base-200 shadow-md rounded-2xl hover:bg-base-200/50 hover:shadow-xl transition-all">
                            <FaBolt className="w-14 h-14 mx-auto text-warning mb-6 drop-shadow-sm" />
                            <h3 className="font-bold text-2xl mb-3">Fast Account Registration</h3>
                            <p className="text-md text-base-content/70">Skip the lines. Get onboarded digitally in a matter of minutes.</p>
                        </div>
                        <div className="p-8 bg-base-100 border border-base-200 shadow-md rounded-2xl hover:bg-base-200/50 hover:shadow-xl transition-all">
                            <FaMobileAlt className="w-14 h-14 mx-auto text-info mb-6 drop-shadow-sm" />
                            <h3 className="font-bold text-2xl mb-3">User-Friendly Interface</h3>
                            <p className="text-md text-base-content/70">Manage your finances seamlessly across all your devices.</p>
                        </div>
                    </div>
                </section>

                {/* Contact Us */}
                <section className="bg-neutral text-neutral-content rounded-3xl p-10 md:p-14 shadow-2xl mt-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl font-extrabold mb-12 text-center flex items-center gap-4 justify-center">
                            📞 Contact Us
                        </h2>
                        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20 text-lg">
                            <div className="flex items-center gap-6 bg-base-100/10 p-6 rounded-2xl backdrop-blur-sm border border-neutral-content/10 shadow-lg">
                                <div className="bg-primary p-4 rounded-xl text-primary-content shadow-inner">
                                    <FaMapMarkerAlt className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-content/70 uppercase tracking-widest font-bold mb-1">Address</p>
                                    <p className="font-semibold text-xl">Ulhasnagar, Mumbai, Maharashtra</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 bg-base-100/10 p-6 rounded-2xl backdrop-blur-sm border border-neutral-content/10 shadow-lg">
                                <div className="bg-secondary p-4 rounded-xl text-secondary-content shadow-inner">
                                    <FaEnvelope className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-content/70 uppercase tracking-widest font-bold mb-1">Email</p>
                                    <a href="mailto:support@chmcsbank.com" className="font-semibold text-xl hover:text-white hover:underline transition-colors">support@chmcsbank.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default HomePage;
