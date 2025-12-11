import React from 'react';
import { useNavigate } from 'react-router';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-red-50">
      <h3 className="text-4xl font-bold mb-4 text-red-600">Payment Cancelled</h3>
      <p className="text-gray-700 mb-6">
        Your payment was not completed. No charges were made.
      </p>
      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        onClick={() => navigate('/pricing')}
      >
        Retry / Upgrade Plan
      </button>
    </div>
  );
};

export default PaymentCancel;
