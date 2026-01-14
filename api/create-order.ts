import Razorpay from 'razorpay';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const razorpay = new Razorpay({
            key_id: process.env.VITE_RAZORPAY_KEY_ID || '',
            key_secret: process.env.RAZORPAY_KEY_SECRET || '',
        });

        const options = {
            amount: 10 * 100, // ₹10 in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1, // <--- This forces automatic capture
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ message: 'Failed to create order', error });
    }
}
