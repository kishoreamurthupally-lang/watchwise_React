import { useState } from "react";
import API from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import emailjs from '@emailjs/browser';

emailjs.init("WepDjn1WVOee56W43");

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #e50914;
    --red-dim: rgba(229,9,20,0.12);
    --red-glow: rgba(229,9,20,0.3);
    --bg: #0a0a0a;
    --surface: #111;
    --surface2: #181818;
    --border: #1e1e1e;
    --text: #fff;
    --muted: #555;
    --label: #888;
    --green: #4caf50;
    --green-dim: rgba(76,175,80,0.12);
  }

  .login-page {
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .bg-blob { position:absolute; border-radius:50%; filter:blur(120px); opacity:0.08; pointer-events:none; }
  .blob-1 { width:700px; height:700px; background:var(--red); top:-250px; left:-250px; animation:drift 10s ease-in-out infinite; }
  .blob-2 { width:500px; height:500px; background:#ff4500; bottom:-200px; right:-150px; animation:drift 12s ease-in-out infinite reverse; }
  .blob-3 { width:300px; height:300px; background:#e50914; top:50%; left:50%; transform:translate(-50%,-50%); animation:drift 8s ease-in-out infinite 2s; }

  @keyframes drift {
    0%,100% { transform:translate(0,0) scale(1); }
    33% { transform:translate(20px,-20px) scale(1.05); }
    66% { transform:translate(-15px,15px) scale(0.95); }
  }

  .login-card {
    background: rgba(17,17,17,0.95);
    border: 1px solid #1c1c1c;
    border-radius: 24px;
    padding: 44px 48px;
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 1;
    animation: fadeUp 0.5s ease forwards;
    backdrop-filter: blur(20px);
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Logo */
  .login-logo { text-align:center; margin-bottom:32px; }
  .logo-icon { font-size:48px; display:block; margin-bottom:10px; animation:popIn 0.6s 0.2s ease both; }

  @keyframes popIn {
    from { transform:scale(0.3) rotate(-10deg); opacity:0; }
    to   { transform:scale(1) rotate(0deg); opacity:1; }
  }

  .login-title {
    font-family:'Bebas Neue',sans-serif;
    font-size:40px;
    letter-spacing:6px;
    color:var(--text);
    line-height:1;
  }

  .login-title span { color:var(--red); }
  .login-sub { color:var(--muted); font-size:11px; letter-spacing:3px; text-transform:uppercase; margin-top:6px; }

  /* Tabs */
  .tabs {
    display:flex;
    background:var(--surface2);
    border-radius:12px;
    padding:4px;
    margin-bottom:28px;
    gap:4px;
    border: 1px solid var(--border);
  }

  .tab {
    flex:1; padding:11px;
    border:none; border-radius:9px;
    background:transparent;
    color:var(--muted);
    font-family:'DM Sans',sans-serif;
    font-size:13px; font-weight:600;
    cursor:pointer;
    transition:all 0.25s;
    letter-spacing:0.5px;
  }

  .tab.active {
    background: var(--red);
    color:#fff;
    box-shadow: 0 4px 15px rgba(229,9,20,0.4);
  }

  /* Fields */
  .field { margin-bottom:18px; }

  .field label {
    display:block;
    font-size:11px;
    font-weight:600;
    color:var(--label);
    text-transform:uppercase;
    letter-spacing:1.5px;
    margin-bottom:8px;
  }

  .input-wrap { position:relative; display:flex; align-items:center; }
  .input-icon { position:absolute; left:15px; font-size:16px; pointer-events:none; z-index:1; }

  .field input {
    width:100%;
    background:var(--surface2);
    border:1.5px solid var(--border);
    border-radius:12px;
    padding:13px 15px 13px 44px;
    color:var(--text);
    font-size:14px;
    font-family:'DM Sans',sans-serif;
    outline:none;
    transition:border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }

  .field input:focus {
    border-color:var(--red);
    box-shadow:0 0 0 3px var(--red-dim);
    background:#1a1a1a;
  }

  .field input::placeholder { color:#2a2a2a; }

  .toggle-pw {
    position:absolute; right:15px;
    background:none; border:none;
    color:var(--muted); cursor:pointer;
    font-size:17px; padding:0;
    transition:color 0.2s;
  }

  .toggle-pw:hover { color:#fff; }

  /* Messages */
  .error-msg {
    background:rgba(229,9,20,0.08);
    border:1px solid rgba(229,9,20,0.25);
    border-left: 3px solid var(--red);
    border-radius:10px; color:#ff6b6b;
    font-size:13px; padding:12px 16px;
    margin-bottom:18px;
    animation:shake 0.3s ease;
  }

  .success-msg {
    background:rgba(76,175,80,0.08);
    border:1px solid rgba(76,175,80,0.25);
    border-left: 3px solid var(--green);
    border-radius:10px; color:#81c784;
    font-size:13px; padding:12px 16px;
    margin-bottom:18px;
  }

  @keyframes shake {
    0%,100%{transform:translateX(0);}
    20%{transform:translateX(-8px);}
    40%{transform:translateX(8px);}
    60%{transform:translateX(-5px);}
    80%{transform:translateX(5px);}
  }

  /* Steps */
  .steps { display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:24px; }
  .step { display:flex; align-items:center; gap:6px; font-size:11px; color:var(--muted); font-weight:500; }

  .step-num {
    width:26px; height:26px;
    border-radius:50%;
    background:var(--surface2);
    border:1.5px solid var(--border);
    display:flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:700;
    transition:all 0.3s;
  }

  .step.active .step-num { background:var(--red); border-color:var(--red); color:#fff; box-shadow:0 0 12px rgba(229,9,20,0.5); }
  .step.done .step-num { background:var(--green); border-color:var(--green); color:#fff; }
  .step.active { color:#fff; }
  .step.done { color:var(--green); }
  .step-line { width:28px; height:1.5px; background:var(--border); border-radius:2px; }
  .step.done + .step-line { background: var(--green); }

  /* Main button */
  .btn-main {
    width:100%; padding:15px;
    background: linear-gradient(135deg, #e50914, #ff2020);
    color:#fff; border:none; border-radius:12px;
    font-family:'Bebas Neue',sans-serif;
    font-size:18px; letter-spacing:3px;
    cursor:pointer;
    transition:all 0.25s;
    margin-top:6px;
    display:flex; align-items:center; justify-content:center; gap:8px;
    box-shadow: 0 4px 20px rgba(229,9,20,0.3);
  }

  .btn-main:hover:not(:disabled) {
    background: linear-gradient(135deg, #ff1a25, #ff3333);
    transform:translateY(-2px);
    box-shadow:0 8px 32px rgba(229,9,20,0.5);
  }

  .btn-main:active:not(:disabled) { transform:translateY(0); }
  .btn-main:disabled { opacity:0.5; cursor:not-allowed; box-shadow:none; }

  /* Divider */
  .or-divider {
    display:flex; align-items:center; gap:12px;
    margin:22px 0; color:#2a2a2a;
    font-size:11px; letter-spacing:2px; text-transform:uppercase;
  }

  .or-divider::before, .or-divider::after {
    content:''; flex:1; height:1px;
    background:linear-gradient(to right, transparent, var(--border), transparent);
  }

  /* Google */
  .google-wrap { display:flex; justify-content:center; margin-bottom:4px; }

  /* OTP input */
  .otp-field input {
    text-align:center !important;
    font-size:28px !important;
    font-family:'Bebas Neue', sans-serif !important;
    letter-spacing:10px !important;
    padding: 14px !important;
  }

  /* Info box */
  .info-box {
    background:var(--surface2);
    border:1px solid var(--border);
    border-radius:10px;
    padding:14px 16px;
    font-size:12px;
    color:var(--muted);
    margin-bottom:18px;
    text-align:center;
    line-height:1.7;
  }

  .info-box strong { color:#fff; }

  /* Spinner */
  .spinner {
    width:17px; height:17px;
    border:2px solid rgba(255,255,255,0.25);
    border-top-color:#fff;
    border-radius:50%;
    animation:spin 0.7s linear infinite;
  }

  @keyframes spin { to{transform:rotate(360deg);} }

  /* Switch text */
  .switch-text { text-align:center; margin-top:18px; font-size:13px; color:var(--muted); }
  .switch-text span { color:var(--red); cursor:pointer; font-weight:600; transition:opacity 0.2s; }
  .switch-text span:hover { opacity:0.8; }

  /* Footer */
  .login-footer {
    text-align:center; margin-top:24px;
    color:#2a2a2a; font-size:11px; letter-spacing:1px;
  }

  .login-footer span { color:#444; }

  /* Password strength */
  .strength-wrap { margin-top:6px; }
  .strength-bar-bg { height:3px; background:var(--border); border-radius:3px; overflow:hidden; }
  .strength-bar-fill { height:100%; border-radius:3px; transition:all 0.3s; }
  .strength-label { font-size:11px; margin-top:4px; font-weight:500; }
`;

const getStrength = pw => {
  if (!pw) return { w: "0%", c: "transparent", l: "" };
  if (pw.length < 5) return { w: "25%", c: "#e50914", l: "Weak" };
  if (pw.length < 8) return { w: "50%", c: "#ff9800", l: "Fair" };
  if (pw.length < 12) return { w: "75%", c: "#2196f3", l: "Good" };
  return { w: "100%", c: "#4caf50", l: "Strong 💪" };
};

function Login() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", username: "", otp: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [regStep, setRegStep] = useState(1);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const reset = () => { setError(""); setSuccess(""); };
  const strength = getStrength(form.password);

  const switchTab = t => {
    setTab(t); setRegStep(1);
    setForm({ email: "", password: "", username: "", otp: "" });
    reset();
  };

  const sendEmailJS = (name, email) => {
    emailjs.send('service_obxkw64', 'template_tn8mxri', {
      user_name: name || "WatchWise User",
      user_email: email,
    }).catch(err => console.log("EmailJS:", err));
  };

// ✅ LOGIN — change window.location = "/" to "/home"
const handleLogin = async () => {
  if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
  setLoading(true); reset();
  try {
    const res = await API.post("/auth/login", {
      email: form.email.toLowerCase().trim(),
      password: form.password.trim()
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", form.email.toLowerCase().trim()); // ✅ ADD THIS
            localStorage.setItem("username", form.email.split("@")[0]);     // ✅ username stored


    sendEmailJS("User", form.email);
    window.location = "/home"; // ✅ changed from "/"
  } catch (err) {
    setError(err.response?.data || "Invalid email or password.");
    setLoading(false);
  }
};

  // ✅ SEND OTP
  const handleSendOtp = async () => {
    if (!form.email) { setError("Please enter your email."); return; }
    setLoading(true); reset();
    try {
      await API.post("/auth/send-otp", { email: form.email.toLowerCase().trim() });
      setSuccess("OTP sent! Check your inbox 📧");
      setRegStep(2);
    } catch (err) {
      setError(err.response?.data || "Failed to send OTP.");
    }
    setLoading(false);
  };

  // ✅ VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!form.otp) { setError("Please enter the OTP."); return; }
    setLoading(true); reset();
    try {
      await API.post("/auth/verify-otp", {
        email: form.email.toLowerCase().trim(),
        otp: form.otp
      });
      setSuccess("Email verified! Set your details below.");
      setRegStep(3);
    } catch (err) {
      setError(err.response?.data || "Invalid OTP. Try again.");
    }
    setLoading(false);
  };

  // ✅ COMPLETE REGISTER
  const handleRegister = async () => {
    if (!form.username || !form.password) { setError("Please fill in all fields."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); reset();
    try {
      await API.post("/auth/register", {
        email: form.email,
        username: form.username.trim(),
        password: form.password.trim(),
        otp: form.otp
      });
      setSuccess("Account created! Please login 🎉");
      switchTab("login");
    } catch (err) {
      setError(err.response?.data || "Registration failed.");
    }
    setLoading(false);
  };
// ✅ GOOGLE LOGIN — change redirect to "/home"
const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);
    const res = await API.post("/auth/google-login", {
      email: decoded.email,
      username: decoded.name
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
       localStorage.setItem("email", decoded.email);  // ✅ ADD THIS
    localStorage.setItem("username", decoded.name); // ✅ ADD THIS
    sendEmailJS(decoded.name, decoded.email);
    window.location = "/home"; // ✅ changed from "/"
  } catch {
    setError("Google login failed. Please try again.");
  }
};

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
        <div className="bg-blob blob-3" />

        <div className="login-card">

          {/* Logo */}
          <div className="login-logo">
            <span className="logo-icon">🎬</span>
            <div className="login-title">WATCH<span>WISE</span></div>
            <div className="login-sub">Your Movie Universe</div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button className={`tab ${tab === "login" ? "active" : ""}`}
              onClick={() => switchTab("login")}>🔓 Sign In</button>
            <button className={`tab ${tab === "register" ? "active" : ""}`}
              onClick={() => switchTab("register")}>📝 Register</button>
          </div>

          {error && <div className="error-msg">❌ {error}</div>}
          {success && <div className="success-msg">✅ {success}</div>}

          {/* ═══ LOGIN ═══ */}
          {tab === "login" && (
            <>
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <span className="input-icon">📧</span>
                  <input name="email" type="email" placeholder="your@email.com"
                    value={form.email} onChange={handleChange}
                    onKeyDown={e => e.key === "Enter" && handleLogin()} />
                </div>
              </div>

              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input name="password" type={showPw ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password} onChange={handleChange}
                    onKeyDown={e => e.key === "Enter" && handleLogin()} />
                  <button className="toggle-pw" onClick={() => setShowPw(!showPw)}>
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button className="btn-main" onClick={handleLogin} disabled={loading}>
                {loading ? <><div className="spinner" /> Signing in...</> : "🔓 SIGN IN"}
              </button>

              <div className="or-divider">or continue with</div>
              <div className="google-wrap">
                <GoogleLogin onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google login failed.")}
                  theme="filled_black" shape="rectangular" size="large" width="348" />
              </div>

              <div className="switch-text">
                New here? <span onClick={() => switchTab("register")}>Create an account</span>
              </div>
            </>
          )}

          {/* ═══ REGISTER ═══ */}
          {tab === "register" && (
            <>
              {/* Steps */}
              <div className="steps">
                <div className={`step ${regStep >= 1 ? "active" : ""} ${regStep > 1 ? "done" : ""}`}>
                  <div className="step-num">{regStep > 1 ? "✓" : "1"}</div>
                  <span>Email</span>
                </div>
                <div className="step-line" />
                <div className={`step ${regStep >= 2 ? "active" : ""} ${regStep > 2 ? "done" : ""}`}>
                  <div className="step-num">{regStep > 2 ? "✓" : "2"}</div>
                  <span>Verify</span>
                </div>
                <div className="step-line" />
                <div className={`step ${regStep === 3 ? "active" : ""}`}>
                  <div className="step-num">3</div>
                  <span>Setup</span>
                </div>
              </div>

              {/* Step 1 */}
              {regStep === 1 && (
                <>
                  <div className="field">
                    <label>Email Address</label>
                    <div className="input-wrap">
                      <span className="input-icon">📧</span>
                      <input name="email" type="email" placeholder="your@email.com"
                        value={form.email} onChange={handleChange}
                        onKeyDown={e => e.key === "Enter" && handleSendOtp()} />
                    </div>
                  </div>
                  <button className="btn-main" onClick={handleSendOtp} disabled={loading}>
                    {loading ? <><div className="spinner" /> Sending OTP...</> : "📨 SEND OTP"}
                  </button>
                </>
              )}

              {/* Step 2 */}
              {regStep === 2 && (
                <>
                  <div className="info-box">
                    We sent a 6-digit OTP to<br />
                    <strong>{form.email}</strong><br />
                    Check your inbox and spam folder
                  </div>
                  <div className={`field otp-field`}>
                    <label>Enter OTP Code</label>
                    <div className="input-wrap">
                      <span className="input-icon">🔢</span>
                      <input name="otp" type="text" placeholder="• • • • • •"
                        maxLength={6} value={form.otp} onChange={handleChange}
                        onKeyDown={e => e.key === "Enter" && handleVerifyOtp()} />
                    </div>
                  </div>
                  <button className="btn-main" onClick={handleVerifyOtp} disabled={loading}>
                    {loading ? <><div className="spinner" /> Verifying...</> : "✅ VERIFY OTP"}
                  </button>
                  <div className="switch-text">
                    Wrong email? <span onClick={() => { setRegStep(1); reset(); }}>Change it</span>
                  </div>
                </>
              )}

              {/* Step 3 */}
              {regStep === 3 && (
                <>
                  <div className="field">
                    <label>Username</label>
                    <div className="input-wrap">
                      <span className="input-icon">👤</span>
                      <input name="username" type="text" placeholder="Choose a username"
                        value={form.username} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <div className="input-wrap">
                      <span className="input-icon">🔒</span>
                      <input name="password" type={showPw ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={form.password} onChange={handleChange}
                        onKeyDown={e => e.key === "Enter" && handleRegister()} />
                      <button className="toggle-pw" onClick={() => setShowPw(!showPw)}>
                        {showPw ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {form.password && (
                      <div className="strength-wrap">
                        <div className="strength-bar-bg">
                          <div className="strength-bar-fill"
                            style={{ width: strength.w, background: strength.c }} />
                        </div>
                        <div className="strength-label" style={{ color: strength.c }}>
                          {strength.l}
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="btn-main" onClick={handleRegister} disabled={loading}>
                    {loading ? <><div className="spinner" /> Creating...</> : "🎬 CREATE ACCOUNT"}
                  </button>
                </>
              )}

              <div className="or-divider">or continue with</div>
              <div className="google-wrap">
                <GoogleLogin onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google login failed.")}
                  theme="filled_black" shape="rectangular" size="large" width="348" />
              </div>
              <div className="switch-text">
                Already have an account? <span onClick={() => switchTab("login")}>Sign in</span>
              </div>
            </>
          )}

          <div className="login-footer">
            Powered by <span>WatchWise</span> · All rights reserved
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;