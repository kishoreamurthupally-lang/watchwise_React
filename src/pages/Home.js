import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "./Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

  * { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }

  html, body {
    overflow-x: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
    position: relative;
  }

  :root {
    --red: #e50914;
    --red-dim: rgba(229,9,20,0.15);
    --bg: #0a0a0a;
    --card-bg: #111;
    --text: #fff;
    --muted: #888;
    --gold: #f5c518;
    --green: #4caf50;
    --blue: #1a73e8;
    --orange: #ff6b00;
    --purple: #7c3aed;
  }

  .page {
    background: var(--bg);
    min-height: 100vh;
    padding: 20px 16px 60px;
    font-family: 'DM Sans', sans-serif;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  @media (min-width: 768px) {
    .page {
      padding: 24px 32px 60px;
    }
  }

  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    letter-spacing: 4px;
    color: var(--text);
    text-align: center;
    margin-bottom: 8px;
  }

  @media (min-width: 768px) {
    .hero-title {
      font-size: 52px;
      letter-spacing: 6px;
    }
  }

  .hero-title span { color: var(--red); }

  .subtitle {
    text-align: center;
    color: var(--muted);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  @media (min-width: 768px) {
    .subtitle {
      font-size: 13px;
      margin-bottom: 32px;
    }
  }

  .search-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    width: 100%;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #181818;
    border: 1.5px solid #2a2a2a;
    border-radius: 50px;
    padding: 10px 20px;
    width: 100%;
    max-width: 500px;
    transition: border-color 0.2s;
  }

  .search-box:focus-within {
    border-color: var(--red);
    box-shadow: 0 0 0 3px var(--red-dim);
  }

  .search-box input {
    background: none;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    width: 100%;
    min-width: 0;
  }

  .search-box input::placeholder { color: #555; }
  
  .search-icon { 
    color: var(--red); 
    font-size: 16px; 
    flex-shrink: 0;
  }

  .industry-tabs {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    width: 100%;
  }

  .industry-tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 50px;
    border: 1.5px solid #2a2a2a;
    background: transparent;
    color: var(--muted);
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  @media (min-width: 768px) {
    .industry-tab {
      padding: 10px 24px;
      font-size: 13px;
    }
  }

  .industry-tab:hover {
    border-color: #444;
    color: #fff;
  }

  .industry-tab.active-all {
    background: var(--red);
    border-color: var(--red);
    color: #fff;
    box-shadow: 0 4px 20px rgba(229,9,20,0.3);
  }

  .industry-tab.active-hollywood {
    background: rgba(26,115,232,0.15);
    border-color: var(--blue);
    color: var(--blue);
  }

  .industry-tab.active-bollywood {
    background: rgba(255,107,0,0.15);
    border-color: var(--orange);
    color: var(--orange);
  }

  .industry-tab.active-tollywood {
    background: rgba(124,58,237,0.15);
    border-color: var(--purple);
    color: var(--purple);
  }

  .chips {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 32px;
    width: 100%;
  }

  .chip {
    padding: 6px 16px;
    border-radius: 50px;
    border: 1.5px solid #2a2a2a;
    background: transparent;
    color: var(--muted);
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.18s;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .chip:hover, .chip.active {
    border-color: var(--red);
    color: #fff;
    background: var(--red-dim);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    margin-top: 48px;
    flex-wrap: wrap;
    width: 100%;
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: #1a1a1a;
    min-width: 20px;
  }

  .section-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 20px;
    border-radius: 50px;
    border: 1.5px solid;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 3px;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    .section-badge {
      font-size: 14px;
      letter-spacing: 2px;
      padding: 6px 15px;
      gap: 6px;
    }
  }

  .badge-hollywood {
    border-color: var(--blue);
    color: var(--blue);
    background: rgba(26,115,232,0.06);
  }

  .badge-bollywood {
    border-color: var(--orange);
    color: var(--orange);
    background: rgba(255,107,0,0.06);
  }

  .badge-tollywood {
    border-color: var(--purple);
    color: var(--purple);
    background: rgba(124,58,237,0.06);
  }

  .section-count {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 1px;
    white-space: nowrap;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    width: 100%;
    margin: 0;
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
  }

  @media (min-width: 1025px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 24px;
    }
  }

  .card {
    background: var(--card-bg);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid #1c1c1c;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    position: relative;
    width: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px var(--card-accent);
      border-color: var(--card-accent);
    }
    .card:hover .poster-img { transform: scale(1.05); }
  }

  .poster-wrap {
    position: relative;
    width: 100%;
    height: 270px;
    overflow: hidden;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    .poster-wrap {
      height: 200px;
    }
  }

  @media (min-width: 641px) and (max-width: 768px) {
    .poster-wrap {
      height: 240px;
    }
  }

  .poster-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 14px;
    gap: 6px;
    transition: opacity 0.3s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .card-overlay {
      opacity: 0;
      visibility: hidden;
    }
    .card:hover .card-overlay {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .card-overlay {
      opacity: 1;
      visibility: visible;
      background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%);
    }
  }

  .industry-pill {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    z-index: 2;
    backdrop-filter: blur(4px);
    white-space: nowrap;
    background: rgba(0,0,0,0.8);
  }

  @media (min-width: 480px) {
    .industry-pill {
      top: 10px;
      left: 10px;
      padding: 4px 12px;
      font-size: 10px;
      letter-spacing: 1px;
    }
  }

  .pill-hollywood {
    background: rgba(26,115,232,0.9);
    border: 1px solid rgba(26,115,232,1);
    color: #ffffff;
  }

  .pill-bollywood {
    background: rgba(255,107,0,0.9);
    border: 1px solid rgba(255,107,0,1);
    color: #ffffff;
  }

  .pill-tollywood {
    background: rgba(124,58,237,0.9);
    border: 1px solid rgba(124,58,237,1);
    color: #ffffff;
  }

  .rating-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0,0,0,0.85);
    border: 1px solid var(--gold);
    color: var(--gold);
    font-size: 9px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 20px;
    backdrop-filter: blur(4px);
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  @media (min-width: 480px) {
    .rating-badge {
      top: 10px;
      right: 10px;
      font-size: 11px;
      padding: 3px 8px;
      gap: 3px;
    }
  }

  .overlay-btn {
    display: block;
    padding: 6px 8px;
    border-radius: 6px;
    font-size: 10px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    border: none;
    transition: opacity 0.15s;
  }

  @media (min-width: 769px) {
    .overlay-btn {
      padding: 7px 10px;
      font-size: 11px;
    }
  }

  .overlay-btn:active {
    opacity: 0.7;
  }

  .btn-primary   { background: var(--red); color: #fff; }
  .btn-secondary { background: rgba(255,255,255,0.15); color: #fff; }
  .btn-warn      { background: rgba(255,183,77,0.15); color: #ffb74d; border: 1px solid rgba(255,183,77,0.3) !important; }
  .btn-danger    { background: var(--red); color: #fff; }
  .btn-green     { background: rgba(129,199,132,0.15); color: #81c784; }

  /* INSTAGRAM-STYLE SAVE BUTTON */
  .save-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.7);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 10;
    backdrop-filter: blur(4px);
  }

  .save-btn:hover {
    transform: scale(1.1);
  }

  .save-icon {
    font-size: 18px;
  }

  .save-btn.saved {
    background: #e50914;
  }

  .save-btn.saved .save-icon {
    color: white;
  }

  @media (max-width: 640px) {
    .save-btn {
      width: 28px;
      height: 28px;
    }
    .save-icon {
      font-size: 14px;
    }
  }

  .card-body {
    padding: 12px 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  @media (max-width: 640px) {
    .card-body {
      padding: 8px 8px 10px;
    }
  }

  .card-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 17px;
    letter-spacing: 1.5px;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }

  @media (max-width: 640px) {
    .card-title {
      font-size: 14px;
      letter-spacing: 1px;
    }
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--muted);
    flex-wrap: wrap;
  }

  @media (max-width: 640px) {
    .card-meta {
      font-size: 9px;
      gap: 4px;
    }
  }

  .meta-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #444;
    flex-shrink: 0;
  }

  .genre-tag {
    display: inline-block;
    margin-top: 5px;
    padding: 2px 8px;
    background: var(--red-dim);
    color: var(--red);
    border-radius: 4px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    width: fit-content;
  }

  @media (max-width: 640px) {
    .genre-tag {
      font-size: 8px;
      padding: 2px 6px;
      margin-top: 3px;
    }
  }

  .results-count {
    text-align: center;
    color: #444;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .results-count span { color: var(--red); }

  .empty {
    grid-column: 1/-1;
    text-align: center;
    padding: 80px 20px;
    color: var(--muted);
    font-size: 15px;
  }

  .empty-icon { font-size: 48px; display: block; margin-bottom: 12px; }

  .welcome-toast {
    position: fixed;
    top: 70px;
    right: 16px;
    background: #111;
    border: 1px solid #222;
    border-left: 4px solid var(--green);
    border-radius: 12px;
    padding: 16px 20px;
    color: #fff;
    z-index: 9999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6);
    animation: slideIn 0.4s ease;
    min-width: 280px;
    max-width: 320px;
  }

  @media (max-width: 480px) {
    .welcome-toast {
      top: 60px;
      right: 12px;
      left: 12px;
      max-width: none;
      width: auto;
    }
  }

  .wt-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }

  .wt-icon { font-size: 24px; }

  .wt-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 1px;
    color: var(--green);
  }

  .wt-sub { font-size: 12px; color: #aaa; }

  .wt-close {
    position: absolute;
    top: 10px;
    right: 12px;
    background: none;
    border: none;
    color: #555;
    cursor: pointer;
    font-size: 16px;
  }

  .wt-close:hover { color: #fff; }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(60px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .no-section {
    text-align: center;
    padding: 40px 20px;
    color: var(--muted);
    font-size: 13px;
    border: 1px dashed #1a1a1a;
    border-radius: 10px;
    margin-bottom: 40px;
  }
`;

const GENRES = ["All", "Action", "Sci-Fi", "Romance", "Drama", "Thriller", "Comedy", "Horror"];

function getIndustry(movie) {
  const lang = (movie.language || "").toLowerCase().trim();
  if (lang === "telugu" || lang === "tollywood") return "tollywood";
  if (lang === "hindi" || lang === "bollywood") return "bollywood";
  if (
    lang === "english" || lang === "hollywood" || lang === "french" ||
    lang === "spanish" || lang === "korean" || lang === "japanese"
  ) return "hollywood";
  return "other";
}

function getIndustry(movie) {
  const lang = (movie.language || "").toLowerCase().trim();

  if (lang === "telugu" || lang === "tollywood") return "tollywood";
  if (lang === "hindi" || lang === "bollywood") return "bollywood";

  if (
    lang === "english" || lang === "hollywood" ||
    lang === "french" || lang === "spanish" ||
    lang === "korean" || lang === "japanese"
  ) return "hollywood";

  return "other";
}

function SectionHeader({ type, count }) {
  const cfg = INDUSTRY_CONFIG[type];
  return (
    <div className="section-header">
      <div className="section-line" />
      <div className={`section-badge ${cfg.badge}`}>
        {cfg.emoji} {type.toUpperCase()}
      </div>
      <span className="section-count">{count} movies</span>
      <div className="section-line" />
    </div>
  );
}

function MovieCard({ m, role, token, onDelete }) {
  const industry = getIndustry(m);
  const cfg = INDUSTRY_CONFIG[industry] || INDUSTRY_CONFIG.hollywood;
  const formattedRating = m.imdbRating ? parseFloat(m.imdbRating).toFixed(1) : "N/A";
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setIsInWatchlist(watchlist.some(movie => movie.id === m.id));
  }, [m.id]);

  const addToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    if (!watchlist.some(movie => movie.id === m.id)) {
      watchlist.push({
        id: m.id,
        title: m.title,
        posterUrl: m.posterUrl,
        releaseYear: m.releaseYear,
        imdbRating: m.imdbRating,
        directorName: m.directorName,
        genre: m.genre
      });
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      setIsInWatchlist(true);
    }
  };

  const removeFromWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const updated = watchlist.filter(movie => movie.id !== m.id);
    localStorage.setItem("watchlist", JSON.stringify(updated));
    setIsInWatchlist(false);
  };

  const getPillText = () => {
    switch(industry) {
      case "hollywood": return "HOLLYWOOD";
      case "bollywood": return "BOLLYWOOD";
      case "tollywood": return "TOLLYWOOD";
      default: return industry.toUpperCase();
    }
  };

  return (
    <div className={`card card-${industry}`}>
      <div className="poster-wrap">
        <img
          className="poster-img"
          src={m.posterUrl || "https://via.placeholder.com/200x300?text=No+Poster"}
          alt={m.title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200x300?text=No+Poster";
          }}
        />

        {industry !== "other" && (
          <div className={`industry-pill ${cfg.pill}`}>
            {getPillText()}
          </div>
        )}

        <div className="rating-badge">
          ⭐ {formattedRating}
        </div>

        {/* INSTAGRAM-STYLE SAVE BUTTON */}
        {token && (
          <button
            onClick={isInWatchlist ? removeFromWatchlist : addToWatchlist}
            className={`save-btn ${isInWatchlist ? 'saved' : ''}`}
            title={isInWatchlist ? "Remove from Watchlist" : "Save to Watchlist"}
          >
            <span className="save-icon">{isInWatchlist ? "❤️" : "🤍"}</span>
          </button>
        )}

        <div className="card-overlay">
          <a href={`/movie/${m.id}`} className="overlay-btn btn-primary">
            📄 View Details
          </a>
          <a href={m.trailerUrl} target="_blank" rel="noreferrer"
            className="overlay-btn btn-secondary">
            ▶ Watch Trailer
          </a>
          {token && role !== "ADMIN" && (
            <a href={`/recommend/${m.id}`} className="overlay-btn btn-green">
              ⭐ Recommend
            </a>
          )}
          {role === "ADMIN" && (
            <>
              <a href={`/edit/${m.id}`} className="overlay-btn btn-warn">
                ✏️ Edit
              </a>
              <button onClick={() => onDelete(m.id)}
                className="overlay-btn btn-danger">
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="card-title">{m.title}</div>
        <div className="card-meta">
          <span>{m.directorName}</span>
          <span className="meta-dot" />
          <span>{m.releaseYear}</span>
        </div>
        <span className="genre-tag">{m.genre}</span>
      </div>
    </div>
  );
}

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [welcome, setWelcome] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/movies").then(res => setMovies(res.data));
  }, []);

  useEffect(() => {
    if (token) {
      const shown = sessionStorage.getItem("welcomed");
      if (!shown) {
        setWelcome(true);
        sessionStorage.setItem("welcomed", "true");
        setTimeout(() => setWelcome(false), 4000);
      }
    }
  }, [token]);

  const deleteMovie = async (id) => {
    if (window.confirm("Delete this movie?")) {
      await API.delete(`/movies/${id}`);
      const res = await API.get("/movies");
      setMovies(res.data);
    }
  };

  const baseFiltered = movies.filter(m => {
    const titleMatch = m.title?.toLowerCase().includes(search.toLowerCase());
    const genreMatch = m.genre?.toLowerCase().includes(search.toLowerCase());
    const directorMatch = m.directorName?.toLowerCase().includes(search.toLowerCase());
    const matchSearch = !search || titleMatch || genreMatch || directorMatch;
    const matchGenre = activeGenre === "All" || m.genre?.trim() === activeGenre;
    return matchSearch && matchGenre;
  });

  const hollywood = baseFiltered.filter(m => getIndustry(m) === "hollywood");
  const bollywood = baseFiltered.filter(m => getIndustry(m) === "bollywood");
  const tollywood = baseFiltered.filter(m => getIndustry(m) === "tollywood");
  const other = baseFiltered.filter(m => getIndustry(m) === "other");

  const singleView = activeIndustry !== "all"
    ? baseFiltered.filter(m => getIndustry(m) === activeIndustry)
    : null;

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      {welcome && (
        <div className="welcome-toast">
          <button className="wt-close" onClick={() => setWelcome(false)}>✕</button>
          <div className="wt-top">
            <span className="wt-icon">{role === "ADMIN" ? "👑" : "🎬"}</span>
            <div className="wt-title">
              Welcome {role === "ADMIN" ? "Admin!" : "Back!"}
            </div>
          </div>
          <div className="wt-sub">
            {role === "ADMIN"
              ? "You are logged in as Administrator"
              : "Enjoy browsing and recommending movies"}
          </div>
        </div>
      )}

      <div className="page">
        <h1 className="hero-title">🎬 MOVIE<span>S</span></h1>
        <p className="subtitle">Hollywood · Bollywood · Tollywood</p>

        <div className="search-wrap">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search title, genre, director..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <span onClick={() => setSearch("")}
                style={{ color: "#555", cursor: "pointer", fontSize: "16px", padding: "0 4px" }}>✕</span>
            )}
          </div>
        </div>

        <div className="industry-tabs">
          {["all", "hollywood", "bollywood", "tollywood"].map(ind => (
            <button
              key={ind}
              className={`industry-tab ${activeIndustry === ind
                ? ind === "all" ? "active-all"
                : `active-${ind}` : ""}`}
              onClick={() => setActiveIndustry(ind)}
            >
              {INDUSTRY_CONFIG[ind].label}
              {ind !== "all" && (
                <span style={{ fontSize: 11, opacity: 0.7, marginLeft: 4 }}>
                  ({ind === "hollywood" ? hollywood.length
                    : ind === "bollywood" ? bollywood.length
                    : tollywood.length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="chips">
          {GENRES.map(g => (
            <button key={g}
              className={`chip ${activeGenre === g ? "active" : ""}`}
              onClick={() => setActiveGenre(g)}>
              {g}
            </button>
          ))}
        </div>

        <p className="results-count">
          Showing <span>{singleView ? singleView.length : baseFiltered.length}</span> of {movies.length} movies
        </p>

        {activeIndustry !== "all" && (
          <>
            {singleView.length > 0 ? (
              <div className="grid">
                {singleView.map(m => (
                  <MovieCard key={m.id} m={m}
                    role={role} token={token}
                    onDelete={deleteMovie} />
                ))}
              </div>
            ) : (
              <div className="no-section">
                😔 No {activeIndustry} movies found.
                {role === "ADMIN" && (
                  <> <a href="/add" style={{ color: "var(--red)", marginLeft: 6 }}>
                    + Add one!
                  </a></>
                )}
              </div>
            )}
          </>
        )}

        {activeIndustry === "all" && (
          <>
            {hollywood.length > 0 && (
              <>
                <SectionHeader type="hollywood" count={hollywood.length} />
                <div className="grid" style={{ marginBottom: 40 }}>
                  {hollywood.map(m => (
                    <MovieCard key={m.id} m={m}
                      role={role} token={token}
                      onDelete={deleteMovie} />
                  ))}
                </div>
              </>
            )}

            {bollywood.length > 0 && (
              <>
                <SectionHeader type="bollywood" count={bollywood.length} />
                <div className="grid" style={{ marginBottom: 40 }}>
                  {bollywood.map(m => (
                    <MovieCard key={m.id} m={m}
                      role={role} token={token}
                      onDelete={deleteMovie} />
                  ))}
                </div>
              </>
            )}

            {tollywood.length > 0 && (
              <>
                <SectionHeader type="tollywood" count={tollywood.length} />
                <div className="grid" style={{ marginBottom: 40 }}>
                  {tollywood.map(m => (
                    <MovieCard key={m.id} m={m}
                      role={role} token={token}
                      onDelete={deleteMovie} />
                  ))}
                </div>
              </>
            )}

            {other.length > 0 && (
              <>
                <div className="section-header">
                  <div className="section-line" />
                  <div className="section-badge" style={{
                    borderColor: "var(--red)", color: "var(--red)",
                    background: "var(--red-dim)"
                  }}>
                    🌐 OTHER
                  </div>
                  <span className="section-count">{other.length} movies</span>
                  <div className="section-line" />
                </div>
                <div className="grid" style={{ marginBottom: 40 }}>
                  {other.map(m => (
                    <MovieCard key={m.id} m={m}
                      role={role} token={token}
                      onDelete={deleteMovie} />
                  ))}
                </div>
              </>
            )}

            {baseFiltered.length === 0 && (
              <div className="empty">
                <span className="empty-icon">😔</span>
                No movies found for "<strong>{search}</strong>"
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
