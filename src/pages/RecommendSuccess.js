import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #e50914;
    --bg: #0a0a0a;
    --surface: #111;
    --border: #1e1e1e;
    --gold: #f5c518;
    --gold-dim: rgba(245,197,24,0.12);
    --gold-glow: rgba(245,197,24,0.25);
    --text: #fff;
    --muted: #555;
    --green: #4caf50;
  }

  .page {
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* ── Background particles ── */
  .bg-star {
    position: absolute;
    color: var(--gold);
    font-size: 20px;
    opacity: 0;
    pointer-events: none;
    animation: floatStar var(--dur) var(--delay) ease-in-out infinite;
  }

  @keyframes floatStar {
    0%   { opacity: 0; transform: translateY(0) rotate(0deg) scale(0.5); }
    20%  { opacity: 0.4; }
    80%  { opacity: 0.2; }
    100% { opacity: 0; transform: translateY(-120px) rotate(180deg) scale(1.2); }
  }

  /* Background glow */
  .bg-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
  }

  .glow-gold {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(245,197,24,0.06), transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    animation: glowPulse 4s ease-in-out infinite;
  }

  .glow-red {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(229,9,20,0.06), transparent 70%);
    bottom: 0; right: 0;
    animation: glowPulse 5s 1s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%,100% { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%,-50%) scale(1.1); }
  }

  /* ── Card ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 56px 60px;
    width: 90%;
    max-width: 500px;
    text-align: center;
    position: relative;
    z-index: 1;
    animation: slideUp 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
  }

  /* Gold top border */
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--gold), transparent);
    border-radius: 2px;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(60px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── Star burst icon ── */
  .icon-wrap {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto 32px;
  }

  .icon-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1.5px solid rgba(245,197,24,0.3);
    animation: ringPulse 2s ease-in-out infinite;
  }

  .icon-ring-2 {
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    border: 1px solid rgba(245,197,24,0.12);
    animation: ringPulse 2s 0.5s ease-in-out infinite;
  }

  @keyframes ringPulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.08); opacity: 0.5; }
  }

  .icon-circle {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--gold-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 44px;
    animation: iconPop 0.6s 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  @keyframes iconPop {
    from { transform: scale(0) rotate(-30deg); opacity: 0; }
    to   { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  /* ── Stars row ── */
  .stars-row {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-bottom: 24px;
  }

  .star-item {
    font-size: 20px;
    animation: starPop 0.4s ease both;
    color: var(--gold);
  }

  @keyframes starPop {
    from { transform: scale(0) rotate(-20deg); opacity: 0; }
    to   { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  /* ── Title ── */
  .title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 38px;
    letter-spacing: 4px;
    color: var(--text);
    margin-bottom: 10px;
    line-height: 1;
    animation: fadeUp 0.6s 0.4s ease both;
  }

  .title span { color: var(--gold); }

  .subtitle {
    font-size: 14px;
    font-weight: 300;
    color: var(--muted);
    margin-bottom: 36px;
    letter-spacing: 0.5px;
    animation: fadeUp 0.6s 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Divider ── */
  .divider {
    height: 1px;
    background: linear-gradient(to right, transparent, var(--border), transparent);
    margin-bottom: 28px;
  }

  /* ── Countdown ── */
  .countdown-wrap {
    margin-bottom: 24px;
    animation: fadeUp 0.6s 0.6s ease both;
  }

  .countdown-text {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .countdown-text span {
    color: var(--gold);
    font-weight: 700;
    font-size: 14px;
  }

  .progress-track {
    height: 3px;
    background: #1a1a1a;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, var(--gold), #ffdd57);
    border-radius: 3px;
    transition: width 1s linear;
    box-shadow: 0 0 8px rgba(245,197,24,0.5);
  }

  /* ── Buttons ── */
  .btn-home {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, var(--gold), #ffdd57);
    color: #000;
    border: none;
    border-radius: 12px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.25s;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    animation: fadeUp 0.6s 0.7s ease both;
    box-shadow: 0 4px 20px var(--gold-glow);
  }

  .btn-home:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px var(--gold-glow);
    background: linear-gradient(135deg, #ffdd57, var(--gold));
  }

  .btn-more {
    width: 100%;
    padding: 13px;
    background: transparent;
    color: var(--muted);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    animation: fadeUp 0.6s 0.8s ease both;
  }

  .btn-more:hover {
    border-color: #333;
    color: #fff;
  }

  /* ── Thank you message ── */
  .thank-you {
    margin-bottom: 28px;
    padding: 16px;
    background: var(--gold-dim);
    border: 1px solid rgba(245,197,24,0.15);
    border-radius: 12px;
    animation: fadeUp 0.6s 0.55s ease both;
  }

  .thank-you p {
    font-size: 13px;
    color: rgba(245,197,24,0.8);
    line-height: 1.6;
  }

  .thank-you strong { color: var(--gold); }

  /* ── Footer tag ── */
  .footer-tag {
    margin-top: 24px;
    font-size: 11px;
    color: #2a2a2a;
    letter-spacing: 1px;
    animation: fadeUp 0.6s 0.9s ease both;
  }

  .footer-tag span { color: #3a3a3a; }
`;

// Floating star positions
const STARS = [
  { left: "10%", top: "20%", dur: "3s", delay: "0s" },
  { left: "85%", top: "15%", dur: "4s", delay: "0.5s" },
  { left: "20%", top: "70%", dur: "3.5s", delay: "1s" },
  { left: "75%", top: "65%", dur: "4.5s", delay: "0.3s" },
  { left: "50%", top: "10%", dur: "3.2s", delay: "0.8s" },
  { left: "90%", top: "45%", dur: "4.2s", delay: "1.2s" },
  { left: "5%",  top: "50%", dur: "3.8s", delay: "0.2s" },
  { left: "60%", top: "80%", dur: "3.3s", delay: "1.5s" },
];

function RecommendSuccess() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/home");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const progress = ((5 - count) / 5) * 100;

  return (
    <>
      <style>{styles}</style>
      <div className="page">

        {/* Floating stars */}
        {STARS.map((s, i) => (
          <div key={i} className="bg-star"
            style={{
              left: s.left, top: s.top,
              "--dur": s.dur, "--delay": s.delay
            }}>
            ★
          </div>
        ))}

        {/* Background glows */}
        <div className="bg-glow glow-gold" />
        <div className="bg-glow glow-red" />

        <div className="card">

          {/* Star burst icon */}
          <div className="icon-wrap">
            <div className="icon-ring-2" />
            <div className="icon-ring" />
            <div className="icon-circle">⭐</div>
          </div>

          {/* 5 stars row */}
          <div className="stars-row">
            {[1,2,3,4,5].map((_, i) => (
              <span key={i} className="star-item"
                style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                ★
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="title">
            REVIEW <span>SUBMITTED!</span>
          </h1>
          <p className="subtitle">
            Your recommendation has been saved successfully
          </p>

          {/* Thank you box */}
          <div className="thank-you">
            <p>
              🎬 Thank you for sharing your thoughts!<br />
              <strong>Your review helps the community</strong> discover
              great movies and make better choices.
            </p>
          </div>

          <div className="divider" />

          {/* Countdown */}
          <div className="countdown-wrap">
            <p className="countdown-text">
              Redirecting to home in <span>{count}s</span>
            </p>
            <div className="progress-track">
              <div className="progress-fill"
                style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Buttons */}
          <button className="btn-home"
            onClick={() => navigate("/home")}>
            🏠 GO TO HOME
          </button>

          <button className="btn-more"
            onClick={() => navigate(-1)}>
            ⭐ Recommend Another Movie
          </button>

          {/* Footer */}
          <div className="footer-tag">
            Powered by <span>WatchWise</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendSuccess;