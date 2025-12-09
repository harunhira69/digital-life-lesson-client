import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hook/useAuth";
import { toast } from "react-hot-toast";
import useAxiosSecue from "../hook/useAxiosSecure";


const Login = () => {
   const {  signIn, handleGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const axiosSecure = useAxiosSecue();

  const saveUserToDB = async (user) => {
    try {
      await axiosSecure.post("/users", user);
    } catch (err) {
      console.log("DB save error:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await  signIn(email, password);
      toast.success("Login successful 🎉");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await handleGoogle();
      const user = result.user;

      await saveUserToDB({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      toast.success("Logged in with Google ✅");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          Continue with Google
        </button>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
