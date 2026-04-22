import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "./Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

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
    --red-dim: rgba(229,9,20,0.12);
    --bg: #0a0a0a;
    --card: #111;
    --border: #1e1e1e;
    --text: #fff;
    --muted: #888;
    --gold: #f5c518;
  }

  .page {
    background: var(--bg);
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  /* HERO BANNER - Responsive */
  .hero {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 300px;
    overflow: hidden;
  }

  @media (min-width: 480px) {
    .hero {
      min-height: 350px;
    }
  }

  @media (min-width: 768px) {
    .hero {
      height: 420px;
    }
  }

  .hero-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: blur(6px) brightness(0.35);
    transform: scale(1.05);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 30%, var(--bg) 100%);
  }

  .hero-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    padding: 20px;
  }

  @media (min-width: 480px) {
    .hero-content {
      flex-direction: row;
      align-items: flex-end;
      gap: 24px;
      padding: 0 24px 30px;
      text-align: left;
    }
  }

  @media (min-width: 768px) {
    .hero-content {
      gap: 32px;
      padding: 0 48px 40px;
    }
  }

  .poster {
    width: 120px;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.8);
    flex-shrink: 0;
    border: 2px solid #222;
  }

  @media (min-width: 480px) {
    .poster {
      width: 140px;
      height: 210px;
    }
  }

  @media (min-width: 768px) {
    .poster {
      width: 160px;
      height: 240px;
    }
  }

  .hero-info {
    flex: 1;
    width: 100%;
  }

  .movie-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 2px;
    line-height: 1.1;
    margin-bottom: 10px;
    word-break: break-word;
  }

  @media (min-width: 480px) {
    .movie-title {
      font-size: 36px;
      letter-spacing: 2.5px;
    }
  }

  @media (min-width: 768px) {
    .movie-title {
      font-size: 52px;
      letter-spacing: 3px;
      margin-bottom: 12px;
    }
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    margin-bottom: 10px;
  }

  @media (min-width: 480px) {
    .badges {
      justify-content: flex-start;
      gap: 8px;
      margin-bottom: 14px;
    }
  }

  .badge {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  @media (min-width: 480px) {
    .badge {
      padding: 4px 12px;
      font-size: 11px;
    }
  }

  @media (min-width: 768px) {
    .badge {
      font-size: 12px;
    }
  }

  .badge-red { background: var(--red-dim); color: var(--red); border: 1px solid rgba(229,9,20,0.3); }
  .badge-gold { background: rgba(245,197,24,0.1); color: var(--gold); border: 1px solid rgba(245,197,24,0.3); }
  .badge-muted { background: rgba(255,255,255,0.06); color: #ccc; border: 1px solid #2a2a2a; }

  /* BODY */
  .body {
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px 16px 60px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }

  @media (min-width: 480px) {
    .body {
      padding: 35px 20px 70px;
      gap: 32px;
    }
  }

  @media (min-width: 768px) {
    .body {
      padding: 40px 24px 80px;
      gap: 36px;
    }
  }

  /* DESCRIPTION */
  .description {
    color: #bbb;
    font-size: 13px;
    line-height: 1.7;
    border-left: 3px solid var(--red);
    padding-left: 14px;
  }

  @media (min-width: 480px) {
    .description {
      font-size: 14px;
      line-height: 1.75;
      padding-left: 16px;
    }
  }

  @media (min-width: 768px) {
    .description {
      font-size: 15px;
      line-height: 1.8;
    }
  }

  /* STATS GRID */
  .stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (min-width: 480px) {
    .stats {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
    }
  }

  @media (min-width: 768px) {
    .stats {
      gap: 14px;
    }
  }

  .stat-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  @media (min-width: 480px) {
    .stat-card {
      padding: 14px 16px;
    }
  }

  .stat-label {
    font-size: 9px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @media (min-width: 480px) {
    .stat-label {
      font-size: 10px;
      letter-spacing: 1.5px;
    }
  }

  .stat-value {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    word-break: break-word;
  }

  @media (min-width: 480px) {
    .stat-value {
      font-size: 15px;
    }
  }

  @media (min-width: 768px) {
    .stat-value {
      font-size: 16px;
    }
  }

  /* SECTION TITLE */
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 2px;
    color: #fff;
    margin-bottom: 12px;
  }

  @media (min-width: 480px) {
    .section-title {
      font-size: 24px;
      letter-spacing: 2.5px;
      margin-bottom: 14px;
    }
  }

  @media (min-width: 768px) {
    .section-title {
      font-size: 26px;
      letter-spacing: 3px;
      margin-bottom: 16px;
    }
  }

  .section-title span { color: var(--red); }

  /* TRAILER SECTION */
  .trailer-wrap {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 */
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 12px 40px rgba(0,0,0,0.6);
  }

  .trailer-wrap iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .no-trailer {
    background: var(--card);
    border: 1px dashed #2a2a2a;
    border-radius: 12px;
    padding: 40px 20px;
    text-align: center;
    color: var(--muted);
    font-size: 13px;
  }

  @media (min-width: 480px) {
    .no-trailer {
      padding: 50px 30px;
      font-size: 14px;
    }
  }

  @media (min-width: 768px) {
    .no-trailer {
      padding: 60px;
    }
  }

  /* BACK BUTTON */
  .back-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 16px;
    background: var(--card);
    border: 1px solid #2a2a2a;
    color: #fff;
    border-radius: 50px;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
    width: auto;
  }

  @media (min-width: 480px) {
    .back-btn {
      padding: 10px 22px;
      font-size: 13px;
      gap: 8px;
    }
  }

  .back-btn:hover {
    border-color: var(--red);
    background: var(--red-dim);
  }

  /* Add Movie Button for Mobile */
  .admin-add-mobile {
    margin-top: 20px;
    text-align: center;
  }

  .admin-add-link {
    display: inline-block;
    background: var(--red);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
  }
`;

// Robust YouTube embed URL extractor
const getEmbedUrl = (url) => {
  if (!url) return "";
  try {
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtube.com/watch")) {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtube.com/embed/")) return url;
  } catch (e) {}
  return url;
};

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get(`/movies/${id}`).then(res => setMovie(res.data));
  }, [id]);

  const embedUrl = getEmbedUrl(movie.trailerUrl);

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      <div className="page">
        {/* HERO BANNER */}
        <div className="hero">
          <img 
            className="hero-bg" 
            src={movie.posterUrl || "https://via.placeholder.com/1200x400"} 
            alt="" 
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/1200x400";
            }}
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <img 
              className="poster" 
              src={movie.posterUrl || "https://via.placeholder.com/160x240"} 
              alt={movie.title}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/160x240";
              }}
            />
            <div className="hero-info">
              <h1 className="movie-title">{movie.title || "Movie Title"}</h1>
              <div className="badges">
                {movie.genre && <span className="badge badge-red">🎭 {movie.genre}</span>}
                {movie.imdbRating && <span className="badge badge-gold">⭐ IMDb {movie.imdbRating}</span>}
                {movie.releaseYear && <span className="badge badge-muted">📅 {movie.releaseYear}</span>}
                {movie.language && <span className="badge badge-muted">🌐 {movie.language}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="body">
          {/* BACK BUTTON */}
          <div>
            <a href="/" className="back-btn">← Back to Movies</a>
          </div>

          {/* DESCRIPTION */}
          {movie.description && (
            <div>
              <p className="section-title">About <span>the Film</span></p>
              <p className="description">{movie.description}</p>
            </div>
          )}

          {/* STATS */}
          <div>
            <p className="section-title">Movie <span>Info</span></p>
            <div className="stats">
              <div className="stat-card">
                <span className="stat-label">Director</span>
                <span className="stat-value">{movie.directorName || "—"}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Release Year</span>
                <span className="stat-value">{movie.releaseYear || "—"}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Genre</span>
                <span className="stat-value">{movie.genre || "—"}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Language</span>
                <span className="stat-value">{movie.language || "—"}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Duration</span>
                <span className="stat-value">{movie.durationMinutes ? `${movie.durationMinutes} mins` : "—"}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">IMDb Rating</span>
                <span className="stat-value" style={{ color: "var(--gold)" }}>⭐ {movie.imdbRating || "—"}</span>
              </div>
            </div>
          </div>

          {/* TRAILER */}
          <div>
            <p className="section-title">🎬 Watch <span>Trailer</span></p>
            {embedUrl ? (
              <div className="trailer-wrap">
                <iframe
                  src={embedUrl}
                  title="Trailer"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            ) : (
              <div className="no-trailer">🎬 No trailer available for this movie</div>
            )}
          </div>

          {/* Admin Add Movie Button (Mobile Friendly) */}
          {role === "ADMIN" && token && (
            <div className="admin-add-mobile">
              <a href="/add" className="admin-add-link">
                ➕ Add New Movie
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
