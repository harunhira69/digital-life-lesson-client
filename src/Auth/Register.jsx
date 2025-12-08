import { Link, useNavigate } from "react-router";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";



const Register = () => {
  const {  createUserEmail,   updateUserProfile,   handleGoogle } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password rules
    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain an uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return toast.error("Password must contain a lowercase letter");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      await createUserEmail(email, password);
      await updateUserProfile(name, photo);
      toast.success("Account created successfully 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await handleGoogle();
      toast.success("Account created with Google ✅");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            required
          />
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
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogleRegister} className="btn btn-outline w-full">
          Sign up with Google
        </button>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
