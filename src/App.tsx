import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, BookOpen, Star, ArrowRight, CheckCircle2, Moon, Sprout, X } from 'lucide-react';

// Razorpay types
declare global {
    interface Window {
        Razorpay: any;
    }
}

function App() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handlePayment = () => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Key from .env file
            amount: 1000, // Amount in paise (₹10 = 1000 paise)
            currency: 'INR',
            name: 'Two Quiet Minutes',
            description: 'The 3-Page Blueprint to Mastering Your Craft',
            image: '/book-cover.png',
            handler: function (response: any) {
                // Payment successful
                setShowSuccessModal(true);

                // User has paid, try to auto-download
                const link = document.createElement('a');
                link.href = '/ebook.pdf';
                link.download = 'Two_Quiet_Minutes.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            prefill: {
                name: '',
                email: '',
                contact: ''
            },
            theme: {
                color: '#6B8E6B' // Sage Green to match theme
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const downloadEbook = () => {
        const link = document.createElement('a');
        link.href = '/ebook.pdf';
        link.download = 'Two_Quiet_Minutes.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Decoration */}
            <Sprout
                className="leaf-decoration text-accent absolute top-[10%] right-[-5%] w-[400px] h-[400px] rotate-12 opacity-5 hidden lg:block pointer-events-none"
                strokeWidth={0.5}
            />
            <Sprout
                className="leaf-decoration text-accent absolute bottom-[5%] left-[-5%] w-[300px] h-[300px] -rotate-12 opacity-5 hidden lg:block pointer-events-none"
                strokeWidth={0.5}
            />

            {/* Navigation */}
            <nav className="p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-2 font-serif text-xl md:text-2xl font-bold text-primary">
                    <BookOpen className="text-accent" size={24} />
                    <span>Two Quiet Minutes</span>
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-primary hover:text-accent transition-colors">
                        <Moon size={20} />
                    </button>
                    <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="btn-nav hover:opacity-90 transition-opacity">
                        Get the Guide
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="flex justify-center lg:justify-start mb-6">
                            <span className="badge mb-0">
                                <CheckCircle2 size={14} className="text-accent" />
                                Newly Released
                            </span>
                        </div>

                        <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
                            The 3-Page Blueprint to <br className="hidden lg:block" />
                            <em className="text-secondary">Mastering Craft.</em>
                        </h1>

                        <p className="text-secondary text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            No fluff. No filler. Get the exact system used by industry leaders to achieve
                            extraordinary results through mindful focus and quiet preparation.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <button onClick={handlePayment} className="btn btn-primary text-lg px-10 py-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 w-full sm:w-auto">
                                Buy Now ₹10 <ArrowRight size={20} />
                            </button>

                            <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-full border border-gray-100 shadow-sm">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="reader" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs font-semibold text-secondary">
                                    <span className="text-primary font-bold">1,200+</span> readers
                                </p>
                            </div>
                        </div>
                        <p className="text-sm font-serif italic text-secondary mt-8 tracking-wide opacity-60">A Story by Sudharsan</p>
                    </motion.div>

                    {/* Right Column: Book Cover */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 flex justify-center lg:justify-end order-1 lg:order-2"
                    >
                        <div className="book-container p-4 md:p-8 bg-[#F0F0EB] rounded-[3rem] shadow-inner">
                            <motion.div
                                whileHover={{ scale: 1.02, rotate: -2 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10"
                            >
                                <img
                                    src="/book-cover.png"
                                    alt="Two Quiet Minutes Book Cover"
                                    className="w-full max-w-[280px] md:max-w-[400px] rounded-lg shadow-2xl book-shadow transform rotate-2 hover:rotate-0 transition-transform duration-500"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Reader Reviews */}
            <section className="section-padding bg-white relative z-10" id="reviews">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif mb-4">Real Stories From Real Readers</h2>
                        <p className="text-secondary opacity-80">Join thousands of Indians who have transformed their lives with this guide.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Arjun Sharma", role: "Product Designer", text: "As someone working in a fast-paced startup, this book gave me the clarity I needed. The strategies are incredibly relevant. Truly a gem!" },
                            { name: "Priya Patel", role: "Marketing Lead", text: "I read this in 5 minutes and it was more valuable than 300-page books I've purchased. The insights into leadership are pure gold." },
                            { name: "Rohan Das", role: "Freelance Dev", text: "Best purchase I've made this year. The sections on advanced techniques helped me double my freelance rates within a month." }
                        ].map((review, idx) => (
                            <div key={idx} className="review-card">
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
                                    ))}
                                </div>
                                <p className="text-secondary italic mb-8 flex-grow text-lg leading-relaxed font-serif">"{review.text}"</p>
                                <div className="mt-auto pt-6 border-t border-gray-100">
                                    <h4 className="font-bold text-primary text-base mb-1">{review.name}</h4>
                                    <p className="text-secondary text-xs uppercase tracking-wider">{review.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-white/50 border-t border-[#E5E5E5] mt-auto relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6 text-center">
                    <Sprout className="text-accent opacity-50" size={32} />
                    <p className="text-primary font-serif italic text-lg opacity-80">Designed for peaceful productivity.</p>
                    <div className="flex gap-8 text-sm text-secondary opacity-60">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
                    </div>
                    <p className="text-xs text-secondary opacity-40">© 2026 Two Quiet Minutes. All rights reserved.</p>
                </div>
            </footer>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 modal-overlay">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white p-8 md:p-12 max-w-lg w-full rounded-3xl shadow-2xl relative text-center"
                        >
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="w-16 h-16 bg-[#E8EDE8] rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                                <CheckCircle2 size={32} />
                            </div>

                            <h3 className="text-2xl font-serif font-bold mb-3 text-primary">Payment Successful!</h3>
                            <p className="text-secondary mb-8 leading-relaxed">
                                Thank you for your purchase. Your journey to mastery begins now. The download should start automatically.
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={downloadEbook}
                                    className="btn btn-primary justify-center w-full py-4 text-sm"
                                >
                                    <Download size={18} />
                                    Download eBook Again
                                </button>
                                <p className="text-xs text-gray-400 mt-2">
                                    If the download didn't start, please click the button above.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
