import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import useAxiosSecue from '../../hook/useAxiosSecure';


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecue();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session ID. Cannot verify payment.");
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axiosSecure.patch(`/verify-success-payment?session_id=${sessionId}`);
        if (res.data.success) {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        } else {
          setError("Payment verification failed. Please contact support.");
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setError(err.response?.data?.error || "Something went wrong during verification.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [axiosSecure, sessionId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Verifying your payment...</div>;

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h3 className="text-3xl font-bold text-red-600 mb-4">Payment Verification Failed</h3>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          onClick={() => navigate('/pricing')}
        >
          Try Again / Upgrade Plan
        </button>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-green-50">
      <h3 className="text-4xl font-bold mb-4 text-green-800">Payment Successful!</h3>
      <p className="text-gray-700 mb-2">
        Your Payment Transaction ID: <span className="font-mono">{paymentInfo.transactionId}</span>
      </p>
      <p className="text-gray-700 mb-6">
        Your Tracking ID: <span className="font-mono">{paymentInfo.trackingId}</span>
      </p>
      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        onClick={() => navigate('/dashboard')}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
