# Razorpay Integration Setup

## How to Get Your Razorpay API Keys

1. **Sign up for Razorpay**:
   - Go to https://razorpay.com/
   - Click "Sign Up" and create your account
   - Complete the verification process

2. **Get Your API Keys**:
   - Log in to your Razorpay Dashboard
   - Go to Settings → API Keys
   - Click "Generate Test Key" (for testing) or "Generate Live Key" (for production)
   - You'll get two keys:
     - **Key ID** (starts with `rzp_test_` for test mode or `rzp_live_` for live mode)
     - **Key Secret** (keep this private, never share it)

3. **Update Your Code**:
   - Open `src/App.tsx`
   - Find line 14: `key: 'YOUR_RAZORPAY_KEY_ID'`
   - Replace `YOUR_RAZORPAY_KEY_ID` with your actual Key ID
   - Example: `key: 'rzp_test_1234567890abcd'`

4. **Test the Payment**:
   - **IMPORTANT**: Do NOT scan the QR code with your real phone/UPI app (GPay, PhonePe). It will fail because this is "Test Mode".
   - **Recommended Method**: Select **Card** option and use these test details:
     - Card Number: `4111 1111 1111 1111`
     - CVV: `123`
     - Expiry: Any future date (e.g., `12/30`)
   - **To Test UPI**:
     - Do not use "Show QR Code".
     - Instead, click **UPI** -> Enter VPA: `success@razorpay` -> Click "Pay Now".
   - When payment succeeds, the ebook will automatically download

5. **Go Live**:
   - Once testing is complete, replace the test key with your live key
   - Make sure your Razorpay account is fully activated
   - Test with a small real payment first

## Current Configuration

- **Product**: Two Quiet Minutes - The 3-Page Blueprint
- **Price**: ₹49 (4900 paise)
- **Currency**: INR
- **Payment Methods**: All Razorpay supported methods (Cards, UPI, Net Banking, Wallets)

## Important Notes

- Never commit your Razorpay Key Secret to version control
- The Key ID is safe to use in frontend code
- For production, consider adding backend verification of payments
- You can customize the payment amount in `src/App.tsx` (line 15)

## Support

For Razorpay integration issues, visit: https://razorpay.com/docs/
