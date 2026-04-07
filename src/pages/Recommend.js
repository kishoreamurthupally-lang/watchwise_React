import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Added
import API from "../services/api";
import Navbar from "./Navbar";

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
    --muted: #666;
    --label: #888;
    --gold: #f5c518;
    --gold-dim: rgba(245,197,24,0.12);
    --green: #4caf50;
  }

  .rec-page { background: var(--bg); min-height: 100vh; font-family: 'DM Sans', sans-serif; padding-bottom: 80px; }

  .rec-hero {
    background: linear-gradient(180deg, #1a0000 0%, var(--bg) 100%);
    padding: 40px 24px 32px;
    text-align: center;
    border-bottom: 1px solid #1a1a1a;
    margin-bottom: 40px;
  }

  .rec-hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: 42px; letter-spacing: 5px; color: var(--text); }
  .rec-hero h1 span { color: var(--gold); }
  .rec-hero p { color: var(--muted); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 6px; }

  .rec-container {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 28px;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px;
    align-items: start;
  }

  .movie-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    position: sticky;
    top: 24px;
    animation: fadeUp 0.4s ease forwards;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .movie-poster { width: 100%; height: 340px; object-fit: cover; display: block; }
  .movie-info { padding: 16px; }

  .movie-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 2px;
    color: var(--text);
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .movie-meta { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--muted); margin-bottom: 14px; }

  .imdb-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--gold-dim);
    border: 1px solid rgba(245,197,24,0.25);
    color: var(--gold);
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
    width: fit-content;
    margin-bottom: 12px;
  }

  .trailer-link {
    display: block;
    text-align: center;
    padding: 9px;
    background: var(--red-dim);
    border: 1px solid rgba(229,9,20,0.25);
    border-radius: 8px;
    color: var(--red);
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.2s;
  }

  .trailer-link:hover { background: rgba(229,9,20,0.2); }

  .rec-form { animation: fadeUp 0.4s 0.1s ease both; }

  .section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
  }

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px;
    letter-spacing: 3px;
    color: var(--gold);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #1e1e1e;
  }

  .stars-wrap { display: flex; gap: 6px; margin-bottom: 8px; }

  .star-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 28px;
    color: #2a2a2a;
    transition: color 0.15s, transform 0.15s;
    line-height: 1;
    padding: 0;
  }

  .star-btn:hover { transform: scale(1.2); }
  .star-btn.on { color: var(--gold); }

  .star-label { font-size: 13px; color: var(--muted); margin-top: 4px; min-height: 18px; }
  .star-label span { color: var(--gold); font-weight: 600; }

  .field { display: flex; flex-direction: column; gap: 7px; }

  .field label {
    font-size: 11px;
    font-weight: 600;
    color: var(--label);
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }

  .field textarea {
    background: var(--surface2);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    color: var(--text);
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    resize: vertical;
    min-height: 120px;
    line-height: 1.6;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .field textarea:focus { border-color: var(--gold); box-shadow: 0 0 0 3px var(--gold-dim); }
  .field textarea::placeholder { color: #333; }
  .char-count { font-size: 11px; color: var(--muted); text-align: right; }

  .btn-submit {
    width: 100%;
    padding: 14px;
    background: var(--gold);
    color: #000;
    border: none;
    border-radius: 10px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-submit:hover:not(:disabled) {
    background: #ffd740;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(245,197,24,0.3);
  }

  .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-back {
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

  .btn-back:hover { border-color: #333; color: #fff; }

  .error-msg {
    background: rgba(229,9,20,0.1);
    border: 1px solid rgba(229,9,20,0.3);
    border-radius: 8px;
    color: #ff6b6b;
    font-size: 13px;
    padding: 10px 14px;
    margin-bottom: 16px;
    text-align: center;
    animation: shake 0.3s ease;
  }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  .login-prompt { text-align: center; padding: 80px 24px; }
  .login-prompt-icon { font-size: 56px; margin-bottom: 16px; }

  .login-prompt h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 3px;
    color: var(--text);
    margin-bottom: 8px;
  }

  .login-prompt p { color: var(--muted); font-size: 13px; margin-bottom: 28px; }

  .btn-go-login {
    padding: 13px 32px;
    background: var(--red);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }

  .btn-go-login:hover { background: #ff1a25; transform: translateY(-1px); }

  .spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(0,0,0,0.3);
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 700px) {
    .rec-container { grid-template-columns: 1fr; }
    .movie-card { position: static; }
  }
`;

const STAR_LABELS = [
  "", "Terrible", "Poor", "Below Average", "Average",
  "Okay", "Good", "Very Good", "Great", "Excellent", "Masterpiece"
];

function Recommend() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [data, setData] = useState({ rating: 0, comment: "" });
  const [hovered, setHovered] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // ✅ Get real email from JWT token
  let userEmail = "unknown@user.com";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userEmail = decoded.sub; // sub = email
      console.log("✅ User email:", userEmail);
    } catch (e) {
      userEmail = localStorage.getItem("email") || "unknown@user.com";
    }
  }

  useEffect(() => {
    API.get(`/movies/${id}`).then(res => setMovie(res.data));
  }, [id]);

  const submitRecommend = async () => {
    if (!data.rating) { setError("Please select a star rating."); return; }
    if (!data.comment.trim()) { setError("Please write a review."); return; }
    setError("");
    setLoading(true);

    try {
      await API.post("/recommendations", {
        movieId: movie.id,
        movieTitle: movie.title,
        userEmail: userEmail,   // ✅ Real email now!
        rating: data.rating,
        comment: data.comment
      });
      navigate("/recommend-success");
    } catch (err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const active = hovered || data.rating;

  if (!isLoggedIn) {
    return (
      <>
        <style>{styles}</style>
        <Navbar />
        <div className="rec-page">
          <div className="login-prompt">
            <div className="login-prompt-icon">🔒</div>
            <h2>LOGIN REQUIRED</h2>
            <p>You need to be logged in to recommend a movie.</p>
            <button className="btn-go-login"
              onClick={() => navigate("/login")}>
              🔓 GO TO LOGIN
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      <div className="rec-page">
        <div className="rec-hero">
          <h1>RECOMMEND <span>MOVIE</span></h1>
          <p>Share your thoughts with the community</p>
        </div>

        <div className="rec-container">

          {/* Movie Card */}
          <div className="movie-card">
            <img className="movie-poster"
              src={movie.posterUrl ||
                "https://via.placeholder.com/300x340?text=No+Poster"}
              alt={movie.title} />
            <div className="movie-info">
              <div className="movie-title">
                {movie.title || "Loading..."}
              </div>
              <div className="movie-meta">
                <span>🎬 {movie.directorName}</span>
                <span>📅 {movie.releaseYear} · 🎭 {movie.genre}</span>
              </div>
              <div className="imdb-badge">⭐ IMDb {movie.imdbRating}</div>
              {movie.trailerUrl && (
                <a href={movie.trailerUrl} target="_blank"
                  rel="noreferrer" className="trailer-link">
                  ▶ Watch Trailer
                </a>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="rec-form">
            {error && <div className="error-msg">❌ {error}</div>}

            {/* Rating */}
            <div className="section">
              <div className="section-title">⭐ YOUR RATING</div>
              <div className="stars-wrap">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <button key={n}
                    className={`star-btn ${n <= active ? "on" : ""}`}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setData({ ...data, rating: n })}>
                    ★
                  </button>
                ))}
              </div>
              <div className="star-label">
                {active
                  ? <><span>{active}/10</span> — {STAR_LABELS[active]}</>
                  : "Click a star to rate"}
              </div>
            </div>

            {/* Review */}
            <div className="section">
              <div className="section-title">✍️ YOUR REVIEW</div>
              <div className="field">
                <label>Write your thoughts</label>
                <textarea
                  placeholder="What did you love or hate about this movie?"
                  value={data.comment}
                  onChange={e =>
                    setData({ ...data, comment: e.target.value })}
                  maxLength={500} />
                <div className="char-count">
                  {data.comment.length}/500
                </div>
              </div>
            </div>

            {/* Submit */}
            <button className="btn-submit"
              onClick={submitRecommend}
              disabled={!data.rating || !data.comment.trim() || loading}>
              {loading
                ? <><div className="spinner" /> Submitting...</>
                : "⭐ SUBMIT RECOMMENDATION"}
            </button>

            {/* ✅ Fixed back button */}
            <button className="btn-back"
              onClick={() => navigate("/home")}>
              ⬅ Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recommend;