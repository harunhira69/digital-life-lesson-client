import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hook/useAuth";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../hook/useAxiosSecure";

const Login = () => {
  const { signIn, handleGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await handleGoogle();
      const user = result.user;
      await saveUserToDB({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#07060F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .auth-card { animation: fadeUp 0.7s cubic-bezier(0.4,0,0.2,1) forwards; }
        .auth-input:focus { outline: none; border-color: #C9A84C !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.12) !important; }
        .auth-input::placeholder { color: rgba(255,255,255,0.22); }
        .google-btn:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.2) !important; }
        .submit-btn:hover:not(:disabled) { background: #D4B04E !important; transform: translateY(-1px); box-shadow: 0 8px 30px rgba(201,168,76,0.35) !important; }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .eye-btn:hover { color: rgba(255,255,255,0.7) !important; }
        .divider-line { flex:1; height:1px; background:rgba(255,255,255,0.08); }
        .link-hover:hover { color: #C9A84C !important; }
      `}</style>

      {/* Background glows */}
      <div style={{
        position: "absolute", top: "15%", left: "10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "#C9A84C", opacity: 0.04, filter: "blur(100px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "8%",
        width: "350px", height: "350px", borderRadius: "50%",
        background: "#A07BD4", opacity: 0.05, filter: "blur(90px)", pointerEvents: "none",
      }} />

      {/* Floating decorative symbol */}
      <div style={{
        position: "absolute", top: "12%", right: "15%",
        fontSize: "80px", color: "rgba(201,168,76,0.04)",
        fontFamily: "Georgia, serif", pointerEvents: "none",
        animation: "float 6s ease-in-out infinite",
        userSelect: "none",
      }}>◈</div>

      <div className="auth-card" style={{ width: "100%", maxWidth: "440px", position: "relative" }}>

        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "28px",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, #C9A84C, #A07BD4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", color: "#07060F", fontWeight: "900",
              }}>◈</div>
              <span style={{
                fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.02em",
              }}>Digital Life Lessons</span>
            </div>
          </Link>

          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ width: "24px", height: "1px", background: "#C9A84C" }} />
            <span style={{
              fontSize: "10px", fontWeight: "700", letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#C9A84C",
              fontFamily: "'DM Mono', monospace",
            }}>Welcome back</span>
            <span style={{ width: "24px", height: "1px", background: "#C9A84C" }} />
          </div>
          <h1 style={{
            fontSize: "2rem", fontWeight: "800", color: "#FFFFFF",
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "8px",
          }}>Sign in to your account</h1>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "13px", lineHeight: 1.6 }}>
            Continue your journey of wisdom and growth
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "32px",
          backdropFilter: "blur(10px)",
        }}>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="google-btn"
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
              gap: "10px", padding: "13px 20px", borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#FFFFFF", fontSize: "13px", fontWeight: "600",
              cursor: "pointer", transition: "all 0.2s", marginBottom: "24px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {googleLoading ? (
              <span style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div className="divider-line" />
            <span style={{
              fontSize: "11px", color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap",
            }}>or with email</span>
            <div className="divider-line" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Email */}
            <div>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: "600",
                color: "rgba(255,255,255,0.45)", marginBottom: "7px",
                letterSpacing: "0.08em", textTransform: "uppercase",
                fontFamily: "'DM Mono', monospace",
              }}>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="auth-input"
                style={{
                  width: "100%", padding: "13px 16px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#FFFFFF", fontSize: "14px",
                  transition: "all 0.2s", boxSizing: "border-box",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: "600",
                color: "rgba(255,255,255,0.45)", marginBottom: "7px",
                letterSpacing: "0.08em", textTransform: "uppercase",
                fontFamily: "'DM Mono', monospace",
              }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="auth-input"
                  style={{
                    width: "100%", padding: "13px 48px 13px 16px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#FFFFFF", fontSize: "14px",
                    transition: "all 0.2s", boxSizing: "border-box",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-btn"
                  style={{
                    position: "absolute", right: "14px", top: "50%",
                    transform: "translateY(-50%)", background: "none",
                    border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,0.3)", padding: "0",
                    transition: "color 0.2s", fontSize: "16px",
                    display: "flex", alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
              style={{
                width: "100%", padding: "14px", borderRadius: "12px",
                background: "#C9A84C", color: "#07060F",
                fontWeight: "800", fontSize: "13px",
                letterSpacing: "0.06em", textTransform: "uppercase",
                border: "none", cursor: "pointer",
                transition: "all 0.25s",
                boxShadow: "0 4px 20px rgba(201,168,76,0.25)",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                marginTop: "4px",
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: "16px", height: "16px",
                    border: "2px solid rgba(7,6,15,0.3)",
                    borderTopColor: "#07060F",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Signing in...
                </>
              ) : "Sign in →"}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p style={{
          textAlign: "center", marginTop: "24px",
          fontSize: "13px", color: "rgba(255,255,255,0.35)",
        }}>
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="link-hover"
            style={{
              color: "rgba(255,255,255,0.6)", fontWeight: "600",
              textDecoration: "none", transition: "color 0.2s",
            }}
          >
            Create one for free
          </Link>
        </p>

        {/* Back to home */}
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <Link
            to="/"
            style={{
              fontSize: "12px", color: "rgba(255,255,255,0.22)",
              textDecoration: "none", transition: "color 0.2s",
              display: "inline-flex", alignItems: "center", gap: "4px",
            }}
            onMouseOver={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.22)"}
          >
            ← Back to home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Login;