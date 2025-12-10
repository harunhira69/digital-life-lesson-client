import { useNavigate, Navigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../hook/useAuth";
import useAxiosSecue from "../../hook/useAxiosSecure";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PricingPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecue();
  const navigate = useNavigate();

  // Redirect Premium users
  if (user?.role === "Premium") {
    return <Navigate to="/" replace />;
  }

const handleUpgrade = async () => {
  if (!user) return console.error("User not authenticated");

  try {
    const response = await axiosSecure.post("/checkout-session", { email: user.email });

    const sessionUrl = response.data?.url; // <-- now backend sends url
    if (!sessionUrl) {
      console.error("No checkout URL received from backend");
      return;
    }

    // Redirect to Stripe Checkout
    window.location.href = sessionUrl;
  } catch (err) {
    console.error("Checkout session error:", err.response?.data || err.message);
  }
};



  return (
    <div className="min-h-screen bg-gray-50 px-6 lg:px-32 py-16">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Upgrade to Premium ⭐</h1>
          <p className="text-gray-600">
            Unlock powerful features to create, explore, and grow faster
          </p>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border">Features</th>
                <th className="p-4 border text-center">Free</th>
                <th className="p-4 border text-center text-indigo-600 font-semibold">
                  Premium ⭐
                </th>
              </tr>
            </thead>

            <tbody className="text-sm">
              <tr>
                <td className="p-4 border">Access Public Lessons</td>
                <td className="p-4 border text-center">✅</td>
                <td className="p-4 border text-center">✅</td>
              </tr>

              <tr className="bg-gray-50">
                <td className="p-4 border">View Premium Lessons</td>
                <td className="p-4 border text-center">❌</td>
                <td className="p-4 border text-center">✅</td>
              </tr>

              <tr>
                <td className="p-4 border">Create Lessons</td>
                <td className="p-4 border text-center">Up to 5</td>
                <td className="p-4 border text-center">Unlimited</td>
              </tr>

              <tr className="bg-gray-50">
                <td className="p-4 border">Create Premium Lessons</td>
                <td className="p-4 border text-center">❌</td>
                <td className="p-4 border text-center">✅</td>
              </tr>

              <tr>
                <td className="p-4 border">Ad-Free Experience</td>
                <td className="p-4 border text-center">❌</td>
                <td className="p-4 border text-center">✅</td>
              </tr>

              <tr className="bg-gray-50">
                <td className="p-4 border">Priority Listing on Home</td>
                <td className="p-4 border text-center">❌</td>
                <td className="p-4 border text-center">✅</td>
              </tr>

              <tr>
                <td className="p-4 border">Advanced Analytics</td>
                <td className="p-4 border text-center">Basic</td>
                <td className="p-4 border text-center">Full</td>
              </tr>

              <tr className="bg-gray-50">
                <td className="p-4 border">Premium Support</td>
                <td className="p-4 border text-center">❌</td>
                <td className="p-4 border text-center">✅</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Upgrade Button */}
        <div className="text-center mt-10">
          <p className="text-xl font-semibold mb-4">
            Get Premium for only ৳1500 (One-time payment)
          </p>
          <button
            onClick={handleUpgrade}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
