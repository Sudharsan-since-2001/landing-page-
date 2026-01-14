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
    const [activeModal, setActiveModal] = useState<null | 'success' | 'privacy' | 'terms' | 'contact'>(null);

    const handlePayment = async () => {
        try {
            // 1. Create Order on our backend
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error('Failed to create order');
            const order = await response.json();

            // 2. Open Razorpay with the Order ID
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'Two Quiet Minutes',
                description: 'The 3-Page Blueprint to Mastering Your Craft',
                image: '/book-cover.png',
                order_id: order.id, // <--- IMPORTANT: Link the payment to the Order
                handler: function (response: any) {
                    // Payment successful
                    setActiveModal('success');

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
                    color: '#6B8E6B'
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment error:', error);
            alert('Something went wrong with the payment process. Please try again.');
        }
    };

    const downloadEbook = () => {
        const link = document.createElement('a');
        link.href = '/ebook.pdf';
        link.download = 'Two_Quiet_Minutes.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const LegalContent = ({ type }: { type: string }) => {
        switch (type) {
            case 'privacy':
                return (
                    <div className="text-left space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Privacy Policy</h3>
                        <p><strong>Effective Date:</strong> January 1, 2026</p>
                        <p>We respect your privacy. This policy explains how we handle your information.</p>
                        <h4 className="font-bold">1. Information We Collect</h4>
                        <p>We only collect the information necessary to process your order, such as your name and email address provided during checkout.</p>
                        <h4 className="font-bold">2. How We Use Information</h4>
                        <p>We use your email solely to deliver the ebook and send important updates regarding your purchase. We do not sell or share your data with third parties.</p>
                    </div>
                );
            case 'terms':
                return (
                    <div className="text-left space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Terms & Refund Policy</h3>
                        <p><strong>Last Updated:</strong> January 1, 2026</p>
                        <h4 className="font-bold">1. Digital Products</h4>
                        <p>By purchasing "Two Quiet Minutes", you acknowledge that this is a digital product delivered via instant download.</p>
                        <h4 className="font-bold">2. Refund Policy</h4>
                        <p className="p-3 bg-red-50 text-red-800 rounded border border-red-100 text-sm">
                            Due to the nature of digital goods, <strong>all sales are final.</strong> Once the ebook is downloaded or accessed, we cannot offer refunds.
                        </p>
                        <p>If you experience technical issues with the download, please contact support, and we will ensure you receive your file.</p>
                    </div>
                );
            case 'contact':
                return (
                    <div className="text-left space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-primary mb-4">Contact Support</h3>
                        <p>Have questions or need help with your download?</p>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="font-bold text-primary">Email Us:</p>
                            <a href="mailto:sudharsanmilburn@gmail.com" className="text-accent hover:underline">sudharsanmilburn@gmail.com</a>
                        </div>
                        <p className="text-sm text-secondary">We typically respond within 24 hours.</p>
                    </div>
                );
            default:
                return null;
        }
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
            <nav className="px-6 py-4 md:p-8 flex justify-between items-center max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-2 font-serif text-lg md:text-2xl font-bold text-primary">
                    <BookOpen className="text-accent" size={24} />
                    <span>Two Quiet Minutes</span>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    <button className="text-primary hover:text-accent transition-colors">
                        <Moon size={20} />
                    </button>
                    <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="btn-nav hover:opacity-90 transition-opacity hidden md:block">
                        Get the Guide
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="max-w-7xl mx-auto px-6 py-8 md:py-24 relative z-10">
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

                        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 md:mb-6">
                            The 3-Page Blueprint to <br className="hidden lg:block" />
                            <em className="text-secondary">Mastering Craft.</em>
                        </h1>

                        <p className="text-secondary text-base md:text-xl mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            No fluff. No filler. Get the exact system used by industry leaders to achieve
                            extraordinary results through mindful focus and quiet preparation.
                        </p>

                        <div className="flex flex-col items-center gap-4 md:gap-6 lg:flex-row lg:justify-start">
                            <button onClick={handlePayment} className="btn btn-primary text-lg px-10 py-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 w-full sm:w-auto max-w-sm flex items-center justify-center gap-2">
                                Buy Now ₹10 <ArrowRight size={20} />
                            </button>

                            <div className="flex items-center gap-3 bg-white px-4 py-2 md:px-5 md:py-3 rounded-full border border-gray-100 shadow-sm">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="reader" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs font-semibold text-secondary whitespace-nowrap">
                                    <span className="text-primary font-bold">1,200+</span> readers
                                </p>
                            </div>
                        </div>
                        <p className="text-sm font-serif italic text-secondary mt-8 tracking-wide opacity-60 text-center lg:text-left">A Story by Sudharsan</p>
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
                        <button onClick={() => setActiveModal('privacy')} className="hover:text-primary transition-colors">Privacy Policy</button>
                        <button onClick={() => setActiveModal('terms')} className="hover:text-primary transition-colors">Terms & Refunds</button>
                        <button onClick={() => setActiveModal('contact')} className="hover:text-primary transition-colors">Contact Support</button>
                    </div>
                    <p className="text-xs text-secondary opacity-40">© 2026 Two Quiet Minutes. All rights reserved.</p>
                </div>
            </footer>

            {/* Global Modal (Handles Success & Legal) */}
            <AnimatePresence>
                {activeModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 modal-overlay overflow-y-auto py-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setActiveModal(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white p-8 md:p-12 max-w-lg w-full rounded-3xl shadow-2xl relative text-center z-10 m-auto"
                        >
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {activeModal === 'success' ? (
                                <>
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
                                </>
                            ) : (
                                <LegalContent type={activeModal} />
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
