import { useState } from "react";
import API from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import emailjs from '@emailjs/browser';

emailjs.init("WepDjn1WVOee56W43");

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    overflow-x: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
  }

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
  }

  .login-page {
    background: var(--bg);
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    width: 100%;
    padding: 16px;
  }

  .bg-blob { position:absolute; border-radius:50%; filter:blur(120px); opacity:0.06; pointer-events:none; }
  .blob-1 { width:400px; height:400px; background:var(--red); top:-150px; left:-150px; animation:drift 10s ease-in-out infinite; }
  .blob-2 { width:350px; height:350px; background:#ff4500; bottom:-100px; right:-100px; animation:drift 12s ease-in-out infinite reverse; }

  @keyframes drift {
    0%,100% { transform:translate(0,0) scale(1); }
    50% { transform:translate(15px,-15px) scale(1.03); }
  }

  /* ✅ Card — fully responsive */
  .login-card {
    background: rgba(17,17,17,0.97);
    border: 1px solid #1c1c1c;
    border-radius: 20px;
    padding: 28px 20px;
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
    animation: fadeUp 0.5s ease forwards;
    backdrop-filter: blur(20px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  }

  @media (min-width: 400px) { .login-card { padding: 32px 24px; } }
  @media (min-width: 480px) { .login-card { padding: 38px 32px; border-radius: 22px; } }
  @media (min-width: 768px) { .login-card { padding: 44px 48px; border-radius: 24px; } }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Logo */
  .login-logo { text-align:center; margin-bottom:24px; }
  .logo-icon { font-size:36px; display:block; margin-bottom:6px; animation:popIn 0.5s 0.2s ease both; }
  @media (min-width: 480px) { .logo-icon { font-size:42px; } }
  @media (min-width: 768px) { .logo-icon { font-size:48px; margin-bottom:10px; } }

  @keyframes popIn {
    from { transform:scale(0.3) rotate(-10deg); opacity:0; }
    to   { transform:scale(1) rotate(0); opacity:1; }
  }

  .login-title {
    font-family:'Bebas Neue',sans-serif;
    font-size:28px; letter-spacing:4px; color:var(--text); line-height:1;
  }
  @media (min-width: 400px) { .login-title { font-size:32px; } }
  @media (min-width: 480px) { .login-title { font-size:36px; letter-spacing:5px; } }
  @media (min-width: 768px) { .login-title { font-size:40px; letter-spacing:6px; } }

  .login-title span { color:var(--red); }
  .login-sub { color:var(--muted); font-size:10px; letter-spacing:2px; text-transform:uppercase; margin-top:4px; }
  @media (min-width: 768px) { .login-sub { font-size:11px; letter-spacing:3px; } }

  /* Tabs */
  .tabs {
    display:flex; background:var(--surface2);
    border-radius:10px; padding:4px; margin-bottom:20px;
    gap:4px; border:1px solid var(--border);
  }
  @media (min-width: 768px) { .tabs { border-radius:12px; margin-bottom:28px; } }

  .tab {
    flex:1; padding:9px 6px; border:none; border-radius:7px;
    background:transparent; color:var(--muted);
    font-family:'DM Sans',sans-serif; font-size:11px;
    font-weight:600; cursor:pointer; transition:all 0.25s;
    letter-spacing:0.3px; white-space:nowrap;
  }
  @media (min-width: 400px) { .tab { font-size:12px; padding:10px 8px; } }
  @media (min-width: 480px) { .tab { font-size:13px; padding:11px; } }

  .tab.active { background:var(--red); color:#fff; box-shadow:0 4px 15px rgba(229,9,20,0.4); }

  /* Fields */
  .field { margin-bottom:14px; }
  @media (min-width: 768px) { .field { margin-bottom:18px; } }

  .field label {
    display:block; font-size:10px; font-weight:600;
    color:var(--label); text-transform:uppercase;
    letter-spacing:1.5px; margin-bottom:6px;
  }

  .input-wrap { position:relative; display:flex; align-items:center; }
  .input-icon { position:absolute; left:13px; font-size:14px; pointer-events:none; z-index:1; }
  @media (min-width: 480px) { .input-icon { left:15px; font-size:15px; } }

  .field input {
    width:100%; min-width:0;
    background:var(--surface2);
    border:1.5px solid var(--border); border-radius:10px;
    padding:11px 12px 11px 40px;
    color:var(--text); font-size:13px;
    font-family:'DM Sans',sans-serif;
    outline:none; transition:border-color 0.2s, box-shadow 0.2s;
  }
  @media (min-width: 480px) { .field input { padding:12px 15px 12px 44px; font-size:14px; border-radius:12px; } }

  .field input:focus { border-color:var(--red); box-shadow:0 0 0 3px var(--red-dim); background:#1a1a1a; }
  .field input::placeholder { color:#2a2a2a; }

  .toggle-pw { position:absolute; right:12px; background:none; border:none; color:var(--muted); cursor:pointer; font-size:15px; padding:0; }
  @media (min-width: 480px) { .toggle-pw { right:15px; font-size:16px; } }

  /* Messages */
  .error-msg {
    background:rgba(229,9,20,0.08);
    border:1px solid rgba(229,9,20,0.25);
    border-left:3px solid var(--red);
    border-radius:8px; color:#ff6b6b;
    font-size:11px; padding:9px 12px;
    margin-bottom:14px; animation:shake 0.3s ease;
  }
  @media (min-width: 480px) { .error-msg { font-size:12px; padding:10px 14px; } }
  @media (min-width: 768px) { .error-msg { font-size:13px; padding:12px 16px; margin-bottom:18px; } }

  .success-msg {
    background:rgba(76,175,80,0.08);
    border:1px solid rgba(76,175,80,0.25);
    border-left:3px solid var(--green);
    border-radius:8px; color:#81c784;
    font-size:11px; padding:9px 12px; margin-bottom:14px;
  }

  @keyframes shake {
    0%,100%{transform:translateX(0);}
    25%{transform:translateX(-6px);}
    75%{transform:translateX(6px);}
  }

  /* Steps */
  .steps { display:flex; align-items:center; justify-content:center; gap:6px; margin-bottom:18px; }
  .step { display:flex; align-items:center; gap:4px; font-size:10px; color:var(--muted); font-weight:500; }
  @media (min-width: 400px) { .step { font-size:11px; gap:5px; } }

  .step-num {
    width:22px; height:22px; border-radius:50%;
    background:var(--surface2); border:1.5px solid var(--border);
    display:flex; align-items:center; justify-content:center;
    font-size:10px; font-weight:700; transition:all 0.3s;
  }
  @media (min-width: 400px) { .step-num { width:24px; height:24px; } }

  .step.active .step-num { background:var(--red); border-color:var(--red); color:#fff; }
  .step.done .step-num { background:var(--green); border-color:var(--green); color:#fff; }
  .step.active { color:#fff; }
  .step.done { color:var(--green); }
  .step-line { width:20px; height:1.5px; background:var(--border); border-radius:2px; }
  @media (min-width: 400px) { .step-line { width:24px; } }

  /* Main Button */
  .btn-main {
    width:100%; padding:12px;
    background:linear-gradient(135deg, #e50914, #ff2020);
    color:#fff; border:none; border-radius:10px;
    font-family:'Bebas Neue',sans-serif;
    font-size:15px; letter-spacing:2.5px;
    cursor:pointer; transition:all 0.25s; margin-top:4px;
    display:flex; align-items:center; justify-content:center; gap:8px;
    box-shadow:0 4px 20px rgba(229,9,20,0.3);
  }
  @media (min-width: 480px) { .btn-main { padding:13px; font-size:16px; border-radius:11px; } }
  @media (min-width: 768px) { .btn-main { padding:15px; font-size:18px; border-radius:12px; } }

  .btn-main:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 28px rgba(229,9,20,0.5); }
  .btn-main:disabled { opacity:0.5; cursor:not-allowed; box-shadow:none; }

  /* Divider */
  .or-divider {
    display:flex; align-items:center; gap:10px;
    margin:16px 0; color:#2a2a2a;
    font-size:10px; letter-spacing:2px; text-transform:uppercase;
  }
  @media (min-width: 768px) { .or-divider { margin:20px 0; font-size:11px; } }
  .or-divider::before, .or-divider::after {
    content:''; flex:1; height:1px;
    background:linear-gradient(to right, transparent, var(--border), transparent);
  }

  /* ✅ GOOGLE BUTTON — SIMPLE CUSTOM BUTTON */
  .google-btn-custom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 11px 16px;
    background: #fff;
    color: #333;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 4px;
    letter-spacing: 0.3px;
  }

  @media (min-width: 480px) {
    .google-btn-custom { padding: 12px 16px; font-size: 14px; border-radius: 11px; }
  }

  @media (min-width: 768px) {
    .google-btn-custom { padding: 13px 16px; border-radius: 12px; }
  }

  .google-btn-custom:hover {
    background: #f5f5f5;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    transform: translateY(-1px);
  }

  .google-btn-custom:active { transform: translateY(0); }

  .google-logo {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  /* Hidden original Google button */
  .google-hidden {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  /* OTP */
  .otp-field input {
    text-align:center !important; font-size:20px !important;
    font-family:'Bebas Neue',sans-serif !important;
    letter-spacing:6px !important; padding:11px !important;
  }
  @media (min-width: 480px) { .otp-field input { font-size:26px !important; letter-spacing:10px !important; } }

  .info-box {
    background:var(--surface2); border:1px solid var(--border);
    border-radius:10px; padding:11px 13px;
    font-size:11px; color:var(--muted);
    margin-bottom:14px; text-align:center; line-height:1.6;
  }
  @media (min-width: 768px) { .info-box { padding:14px 16px; font-size:12px; margin-bottom:18px; } }
  .info-box strong { color:#fff; }

  .spinner {
    width:15px; height:15px;
    border:2px solid rgba(255,255,255,0.25);
    border-top-color:#fff; border-radius:50%;
    animation:spin 0.7s linear infinite;
  }
  @keyframes spin { to{transform:rotate(360deg);} }

  .switch-text { text-align:center; margin-top:14px; font-size:12px; color:var(--muted); }
  @media (min-width: 768px) { .switch-text { margin-top:18px; font-size:13px; } }
  .switch-text span { color:var(--red); cursor:pointer; font-weight:600; }

  .login-footer { text-align:center; margin-top:16px; color:#2a2a2a; font-size:10px; letter-spacing:1px; }
  @media (min-width: 768px) { .login-footer { margin-top:24px; font-size:11px; } }
  .login-footer span { color:#444; }

  .strength-wrap { margin-top:5px; }
  .strength-bar-bg { height:3px; background:var(--border); border-radius:3px; overflow:hidden; }
  .strength-bar-fill { height:100%; border-radius:3px; transition:all 0.3s; }
  .strength-label { font-size:10px; margin-top:4px; font-weight:500; }
`;

const getStrength = pw => {
  if (!pw) return { w:"0%", c:"transparent", l:"" };
  if (pw.length < 5) return { w:"25%", c:"#e50914", l:"Weak" };
  if (pw.length < 8) return { w:"50%", c:"#ff9800", l:"Fair" };
  if (pw.length < 12) return { w:"75%", c:"#2196f3", l:"Good" };
  return { w:"100%", c:"#4caf50", l:"Strong 💪" };
};

// ✅ Google SVG Logo
const GoogleLogo = () => (
  <svg className="google-logo" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

function Login() {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email:"", password:"", username:"", otp:"" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [regStep, setRegStep] = useState(1);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const reset = () => { setError(""); setSuccess(""); };
  const strength = getStrength(form.password);

  const switchTab = t => {
    setTab(t); setRegStep(1);
    setForm({ email:"", password:"", username:"", otp:"" });
    reset();
  };

  const sendEmailJS = (name, email) => {
    emailjs.send('service_obxkw64', 'template_tn8mxri', {
      user_name: name || "WatchWise User",
      user_email: email,
    }).catch(err => console.log("EmailJS:", err));
  };

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
      localStorage.setItem("email", form.email.toLowerCase().trim());
      localStorage.setItem("username", form.email.split("@")[0]);
      sendEmailJS("User", form.email);
      window.location = "/home";
    } catch (err) {
      setError(err.response?.data || "Invalid email or password.");
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!form.email) { setError("Please enter your email."); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) { setError("Enter valid email address ❌"); return; }
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

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const res = await API.post("/auth/google-login", {
        email: decoded.email,
        username: decoded.name
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", decoded.email);
      localStorage.setItem("username", decoded.name);
      sendEmailJS(decoded.name, decoded.email);
      window.location = "/home";
    } catch {
      setError("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  // ✅ Custom Google Button — triggers hidden GoogleLogin
  const GoogleSection = () => (
    <>
      <div className="or-divider">or continue with</div>

      {/* Custom styled button */}
      <button
        className="google-btn-custom"
        onClick={() => {
          // Click the hidden GoogleLogin button
          const btn = document.querySelector('.google-hidden iframe');
          if (btn) btn.click();
          // Fallback — find any Google button
          const googleBtn = document.querySelector('[data-testid="google-login-button"]');
          if (googleBtn) googleBtn.click();
        }}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <><div className="spinner" style={{borderTopColor:"#333"}} /> Signing in...</>
        ) : (
          <><GoogleLogo /> Continue with Google</>
        )}
      </button>

      {/* Hidden real GoogleLogin — handles auth */}
      <div className="google-hidden">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google login failed.")}
          theme="filled_black"
          shape="rectangular"
          size="large"
        />
      </div>
    </>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />

        <div className="login-card">
          {/* Logo */}
          <div className="login-logo">
            <span className="logo-icon">🎬</span>
            <div className="login-title">WATCH<span>WISE</span></div>
            <div className="login-sub">Your Movie Universe</div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button className={`tab ${tab==="login"?"active":""}`}
              onClick={() => switchTab("login")}>🔓 Sign In</button>
            <button className={`tab ${tab==="register"?"active":""}`}
              onClick={() => switchTab("register")}>📝 Register</button>
          </div>

          {error && <div className="error-msg">❌ {error}</div>}
          {success && <div className="success-msg">✓ {success}</div>}

          {/* LOGIN */}
          {tab === "login" && (
            <>
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <span className="input-icon">📧</span>
                  <input name="email" type="email" placeholder="your@email.com"
                    value={form.email} onChange={handleChange}
                    onKeyDown={e => e.key==="Enter" && handleLogin()} />
                </div>
              </div>
              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input name="password" type={showPw?"text":"password"}
                    placeholder="Enter your password"
                    value={form.password} onChange={handleChange}
                    onKeyDown={e => e.key==="Enter" && handleLogin()} />
                  <button className="toggle-pw" onClick={() => setShowPw(!showPw)}>
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <button className="btn-main" onClick={handleLogin} disabled={loading}>
                {loading ? <><div className="spinner"/> Signing in...</> : "🔓 SIGN IN"}
              </button>
              <GoogleSection />
              <div className="switch-text">
                New here? <span onClick={() => switchTab("register")}>Create an account</span>
              </div>
            </>
          )}

          {/* REGISTER */}
          {tab === "register" && (
            <>
              <div className="steps">
                <div className={`step ${regStep>=1?"active":""} ${regStep>1?"done":""}`}>
                  <div className="step-num">{regStep>1?"✓":"1"}</div>
                  <span>Email</span>
                </div>
                <div className="step-line"/>
                <div className={`step ${regStep>=2?"active":""} ${regStep>2?"done":""}`}>
                  <div className="step-num">{regStep>2?"✓":"2"}</div>
                  <span>Verify</span>
                </div>
                <div className="step-line"/>
                <div className={`step ${regStep===3?"active":""}`}>
                  <div className="step-num">3</div>
                  <span>Setup</span>
                </div>
              </div>

              {regStep === 1 && (
                <>
                  <div className="field">
                    <label>Email Address</label>
                    <div className="input-wrap">
                      <span className="input-icon">📧</span>
                      <input name="email" type="email" placeholder="your@email.com"
                        value={form.email} onChange={handleChange}
                        onKeyDown={e => e.key==="Enter" && handleSendOtp()} />
                    </div>
                  </div>
                  <button className="btn-main" onClick={handleSendOtp} disabled={loading}>
                    {loading ? <><div className="spinner"/> Sending...</> : "📨 SEND OTP"}
                  </button>
                </>
              )}

              {regStep === 2 && (
                <>
                  <div className="info-box">
                    We sent a 6-digit OTP to<br/>
                    <strong>{form.email}</strong><br/>
                    Check your inbox and spam folder
                  </div>
                  <div className="field otp-field">
                    <label>Enter OTP Code</label>
                    <div className="input-wrap">
                      <span className="input-icon">🔢</span>
                      <input name="otp" type="text" placeholder="• • • • • •"
                        maxLength={6} value={form.otp} onChange={handleChange}
                        onKeyDown={e => e.key==="Enter" && handleVerifyOtp()} />
                    </div>
                  </div>
                  <button className="btn-main" onClick={handleVerifyOtp} disabled={loading}>
                    {loading ? <><div className="spinner"/> Verifying...</> : "✓ VERIFY OTP"}
                  </button>
                  <div className="switch-text">
                    Wrong email? <span onClick={() => { setRegStep(1); reset(); }}>Change it</span>
                  </div>
                </>
              )}

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
                      <input name="password" type={showPw?"text":"password"}
                        placeholder="Create a strong password"
                        value={form.password} onChange={handleChange}
                        onKeyDown={e => e.key==="Enter" && handleRegister()} />
                      <button className="toggle-pw" onClick={() => setShowPw(!showPw)}>
                        {showPw ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {form.password && (
                      <div className="strength-wrap">
                        <div className="strength-bar-bg">
                          <div className="strength-bar-fill"
                            style={{ width:strength.w, background:strength.c }}/>
                        </div>
                        <div className="strength-label" style={{ color:strength.c }}>
                          {strength.l}
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="btn-main" onClick={handleRegister} disabled={loading}>
                    {loading ? <><div className="spinner"/> Creating...</> : "🎬 CREATE ACCOUNT"}
                  </button>
                </>
              )}

              <GoogleSection />
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
