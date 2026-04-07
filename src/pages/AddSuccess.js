import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #e50914;
    --red-dim: rgba(229,9,20,0.12);
    --bg: #0a0a0a;
    --surface: #111;
    --border: #1e1e1e;
    --green: #4caf50;
    --green-dim: rgba(76,175,80,0.12);
    --text: #fff;
    --muted: #555;
  }

  .success-page {
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    position: relative;
  }

  /* Animated background circles */
  .bg-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.08;
    animation: pulse 4s ease-in-out infinite;
  }

  .bg-circle-1 {
    width: 500px; height: 500px;
    background: var(--green);
    top: -100px; left: -100px;
    animation-delay: 0s;
  }

  .bg-circle-2 {
    width: 400px; height: 400px;
    background: var(--red);
    bottom: -80px; right: -80px;
    animation-delay: 2s;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.08; }
    50% { transform: scale(1.1); opacity: 0.14; }
  }

  /* Card */
  .success-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 56px 64px;
    text-align: center;
    max-width: 480px;
    width: 90%;
    position: relative;
    z-index: 1;
    animation: slideUp 0.5s ease forwards;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Checkmark circle */
  .check-wrap {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: var(--green-dim);
    border: 2px solid var(--green);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 28px;
    font-size: 40px;
    animation: popIn 0.5s 0.2s ease both;
  }

  @keyframes popIn {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  .success-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    letter-spacing: 4px;
    color: var(--text);
    margin-bottom: 10px;
  }

  .success-title span { color: var(--green); }

  .success-sub {
    color: var(--muted);
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 40px;
  }

  /* Divider */
  .divider {
    height: 1px;
    background: var(--border);
    margin: 0 0 32px;
  }

  /* Countdown */
  .countdown-text {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 20px;
    letter-spacing: 0.5px;
  }

  .countdown-text span {
    color: var(--green);
    font-weight: 600;
  }

  /* Progress bar */
  .progress-bar-wrap {
    background: #1a1a1a;
    border-radius: 50px;
    height: 4px;
    margin-bottom: 28px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: var(--green);
    border-radius: 50px;
    transition: width 1s linear;
  }

  /* Buttons */
  .btn-home {
    width: 100%;
    padding: 14px;
    background: var(--red);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 17px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    margin-bottom: 10px;
  }

  .btn-home:hover {
    background: #ff1a25;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(229,9,20,0.3);
  }

  .btn-add {
    width: 100%;
    padding: 12px;
    background: transparent;
    color: var(--muted);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-add:hover {
    border-color: #333;
    color: #fff;
  }
`;

function AddSuccess() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) { clearInterval(timer);navigate("/home"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const progress = ((5 - count) / 5) * 100;

  return (
    <>
      <style>{styles}</style>
      <div className="success-page">

        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />

        <div className="success-card">

          <div className="check-wrap"></div>

          <h1 className="success-title">MOVIE <span>ADDED!</span></h1>
          <p className="success-sub">Successfully saved to the database</p>

          <div className="divider" />

          <p className="countdown-text">
            Redirecting to home in <span>{count}s</span>
          </p>

          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <button className="btn-home" onClick={() => navigate("/")}>
            🏠 GO TO HOME
          </button>

          <button className="btn-add" onClick={() => navigate("/add")}>
            ➕ Add Another Movie
          </button>

        </div>
      </div>
    </>
  );
}

export default AddSuccess;