import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "./Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

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
  }

  /* HERO BANNER */
  .hero {
    position: relative;
    width: 100%;
    height: 420px;
    overflow: hidden;
  }

  .hero-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
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
    align-items: flex-end;
    gap: 32px;
    padding: 0 48px 40px;
  }

  .poster {
    width: 160px;
    height: 240px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.8);
    flex-shrink: 0;
    border: 2px solid #222;
  }

  .hero-info { flex: 1; }

  .movie-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    letter-spacing: 3px;
    line-height: 1;
    margin-bottom: 12px;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 14px;
  }

  .badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  .badge-red { background: var(--red-dim); color: var(--red); border: 1px solid rgba(229,9,20,0.3); }
  .badge-gold { background: rgba(245,197,24,0.1); color: var(--gold); border: 1px solid rgba(245,197,24,0.3); }
  .badge-muted { background: rgba(255,255,255,0.06); color: #ccc; border: 1px solid #2a2a2a; }

  /* BODY */
  .body {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 24px 80px;
    display: flex;
    flex-direction: column;
    gap: 36px;
  }

  /* DESCRIPTION */
  .description {
    color: #bbb;
    font-size: 15px;
    line-height: 1.8;
    border-left: 3px solid var(--red);
    padding-left: 16px;
  }

  /* STATS GRID */
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }

  .stat-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stat-label {
    font-size: 10px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .stat-value {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }

  /* TRAILER SECTION */
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 3px;
    color: #fff;
    margin-bottom: 16px;
  }

  .section-title span { color: var(--red); }

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
    padding: 60px;
    text-align: center;
    color: var(--muted);
    font-size: 14px;
  }

  /* BACK BUTTON */
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    background: var(--card);
    border: 1px solid #2a2a2a;
    color: #fff;
    border-radius: 50px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .back-btn:hover {
    border-color: var(--red);
    background: var(--red-dim);
  }
`;

// ✅ Robust YouTube embed URL extractor
const getEmbedUrl = (url) => {
  if (!url) return "";
  try {
    // Handle youtu.be short links
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Handle youtube.com/watch?v=
    if (url.includes("youtube.com/watch")) {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Already an embed URL
    if (url.includes("youtube.com/embed/")) return url;
  } catch (e) {}
  return url;
};

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

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
          <img className="hero-bg" src={movie.posterUrl || "https://via.placeholder.com/1200x400"} alt="" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <img className="poster" src={movie.posterUrl || "https://via.placeholder.com/160x240"} alt={movie.title} />
            <div className="hero-info">
              <h1 className="movie-title">{movie.title}</h1>
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

          {/* BACK */}
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

        </div>
      </div>
    </>
  );
}

export default MovieDetails;