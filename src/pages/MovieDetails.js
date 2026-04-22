import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "./Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Barlow:wght@300;400;500&family=Barlow+Condensed:wght@600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    overflow-x: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  :root {
    --red: #e50914;
    --red-dim: rgba(229,9,20,0.12);
    --bg: #060608;
    --card: #0e0e12;
    --border: rgba(255,255,255,0.07);
    --text: #f0ece4;
    --muted: #6b6870;
    --gold: #c9a84c;
    --gold2: #f0d080;
  }

  .page {
    background: var(--bg);
    min-height: 100vh;
    font-family: 'Barlow', sans-serif;
    color: var(--text);
    overflow-x: hidden;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 500px;
    max-height: 800px;
    overflow: hidden;
  }

  /* YouTube iframe stretched to cover — Netflix style */
  .hero-video-wrap {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .hero-video-wrap iframe {
    position: absolute;
    /* oversized to hide black bars — covers any aspect ratio */
    top: 50%;
    left: 50%;
    width: 177.78vh;   /* 16/9 * 100vh */
    height: 100vh;
    min-width: 100%;
    min-height: 56.25vw; /* 9/16 * 100vw */
    transform: translate(-50%, -50%);
    border: none;
    pointer-events: none;
    opacity: 0;
    transition: opacity 1.2s ease;
  }

  .hero-video-wrap iframe.loaded {
    opacity: 1;
  }

  /* Fallback poster shown before/if video loads */
  .hero-poster-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    filter: blur(2px) brightness(0.4) saturate(0.6);
    transform: scale(1.05);
    transition: opacity 1s ease;
  }

  .hero-poster-bg.hidden {
    opacity: 0;
  }

  /* Dark gradient overlays — cinematic */
  .hero-overlay-sides {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(6,6,8,0.92) 0%,
      rgba(6,6,8,0.3) 40%,
      rgba(6,6,8,0.3) 60%,
      rgba(6,6,8,0.92) 100%
    );
    pointer-events: none;
  }

  .hero-overlay-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 160px;
    background: linear-gradient(to bottom, rgba(6,6,8,0.8), transparent);
    pointer-events: none;
  }

  .hero-overlay-bottom {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 60%;
    background: linear-gradient(to top, rgba(6,6,8,1) 0%, rgba(6,6,8,0.7) 40%, transparent 100%);
    pointer-events: none;
  }

  /* Video noise grain overlay */
  .hero-grain {
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px 180px;
    pointer-events: none;
    animation: grainAnim 0.3s steps(1) infinite;
  }
  @keyframes grainAnim {
    0%  { background-position: 0 0; }
    25% { background-position: -20px 15px; }
    50% { background-position: 10px -20px; }
    75% { background-position: -15px 10px; }
  }

  /* Hero content — left aligned, cinematic */
  .hero-content {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 0 40px 60px;
    z-index: 2;
    display: flex;
    align-items: flex-end;
    gap: 32px;
  }

  @media (max-width: 768px) {
    .hero-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0 20px 40px;
      gap: 16px;
    }
    .hero { max-height: 680px; }
  }

  /* Poster — floats over the hero */
  .poster {
    width: 150px;
    height: 225px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 30px 60px rgba(0,0,0,0.9);
    animation: posterReveal 0.8s 0.3s both;
  }

  @media (min-width: 768px) {
    .poster { width: 180px; height: 270px; }
  }

  @keyframes posterReveal {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-info {
    flex: 1;
    animation: infoReveal 0.8s 0.5s both;
  }

  @keyframes infoReveal {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Eyebrow */
  .hero-eyebrow {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 768px) {
    .hero-eyebrow { justify-content: center; }
  }

  .eyebrow-line { width: 30px; height: 1px; background: var(--gold); opacity: 0.5; }

  .movie-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 72px);
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -1px;
    margin-bottom: 16px;
    color: #fff;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .badges { justify-content: center; }
  }

  .badge {
    padding: 4px 12px;
    border-radius: 2px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .badge-red   { background: var(--red-dim); color: var(--red); border: 1px solid rgba(229,9,20,0.3); }
  .badge-gold  { background: rgba(201,168,76,0.1); color: var(--gold); border: 1px solid rgba(201,168,76,0.3); }
  .badge-muted { background: rgba(255,255,255,0.05); color: #aaa; border: 1px solid rgba(255,255,255,0.1); }

  /* Hero action buttons */
  .hero-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .hero-actions { justify-content: center; }
  }

  .btn-mute {
    padding: 9px 20px;
    background: rgba(255,255,255,0.08);
    color: #ccc;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 2px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-mute:hover { background: rgba(255,255,255,0.15); color: #fff; }

  .btn-scroll {
    padding: 9px 20px;
    background: transparent;
    color: #888;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-scroll:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

  /* Playing indicator */
  .playing-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 12px;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .playing-badge.visible { opacity: 1; }

  .playing-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--red);
    animation: blink 1.5s infinite;
  }

  @keyframes blink {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.3; }
  }

  /* ── BODY ── */
  .body {
    max-width: 1100px;
    margin: 0 auto;
    padding: 60px 40px 100px;
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  @media (max-width: 768px) {
    .body { padding: 40px 20px 80px; gap: 40px; }
  }

  /* Back button */
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: transparent;
    color: var(--muted);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.2s;
    width: fit-content;
  }

  .back-btn:hover { color: var(--text); border-color: rgba(255,255,255,0.3); }

  /* Section eyebrow */
  .section-eyebrow {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  .eyebrow-dash { width: 24px; height: 1px; background: var(--gold); opacity: 0.4; }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -1px;
    color: #fff;
    margin-bottom: 20px;
  }

  .section-title em { font-style: italic; color: var(--gold); }

  /* Description */
  .description {
    font-size: 15px;
    color: #8a8690;
    line-height: 1.85;
    font-weight: 300;
    max-width: 720px;
    border-left: 2px solid var(--red);
    padding-left: 20px;
  }

  /* Stats grid */
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }

  @media (max-width: 600px) {
    .stats { grid-template-columns: repeat(2, 1fr); }
  }

  .stat-card {
    background: var(--card);
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    transition: background 0.2s;
  }

  .stat-card:hover { background: #121216; }

  .stat-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 2.5px;
  }

  .stat-value {
    font-size: 15px;
    font-weight: 500;
    color: var(--text);
    line-height: 1.3;
  }

  /* Trailer section — EMBEDDED watchable version below */
  .trailer-section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .trailer-wrap {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 20px 60px rgba(0,0,0,0.7);
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
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 60px 40px;
    text-align: center;
    color: var(--muted);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* Admin button */
  .admin-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    background: var(--red);
    color: #fff;
    border: none;
    border-radius: 2px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .admin-btn:hover { box-shadow: 0 0 30px rgba(229,9,20,0.4); }
`;

const getVideoId = (url) => {
  if (!url) return "";
  try {
    if (url.includes("youtu.be/"))
      return url.split("youtu.be/")[1].split("?")[0];
    if (url.includes("youtube.com/watch"))
      return new URL(url).searchParams.get("v");
    if (url.includes("youtube.com/embed/"))
      return url.split("youtube.com/embed/")[1].split("?")[0];
  } catch (e) {}
  return "";
};

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie]       = useState({});
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted]   = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);
  const role  = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get(`/movies/${id}`).then(res => setMovie(res.data));
  }, [id]);

  const videoId = getVideoId(movie.trailerUrl);

  // Background autoplay URL — muted, no controls, loop, autoplay
  const bgUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1`
    : "";

  // Full watchable URL for the bottom section
  const watchUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    : "";

  // Detect when iframe loads → fade in
  const handleIframeLoad = () => {
    // Small delay to allow YouTube to actually start playing
    setTimeout(() => {
      setVideoLoaded(true);
      setIsPlaying(true);
    }, 1500);
  };

  // Toggle mute via YouTube postMessage API
  const toggleMute = () => {
    if (!iframeRef.current) return;
    const win = iframeRef.current.contentWindow;
    if (isMuted) {
      win.postMessage('{"event":"command","func":"unMute","args":""}', "*");
    } else {
      win.postMessage('{"event":"command","func":"mute","args":""}', "*");
    }
    setIsMuted(!isMuted);
  };

  const scrollToTrailer = () => {
    document.getElementById("trailer-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      <div className="page">

        {/* ── HERO ── */}
        <div className="hero">

          {/* Background YouTube iframe */}
          {bgUrl && (
            <div className="hero-video-wrap">
              <iframe
                ref={iframeRef}
                src={bgUrl}
                title="background"
                allow="autoplay; encrypted-media"
                className={videoLoaded ? "loaded" : ""}
                onLoad={handleIframeLoad}
              />
            </div>
          )}

          {/* Fallback poster — hides when video plays */}
          <img
            className={`hero-poster-bg${videoLoaded && bgUrl ? " hidden" : ""}`}
            src={movie.posterUrl || "https://via.placeholder.com/1200x600"}
            alt=""
            onError={e => { e.target.src = "https://via.placeholder.com/1200x600"; }}
          />

          {/* Overlays */}
          <div className="hero-grain" />
          <div className="hero-overlay-top" />
          <div className="hero-overlay-sides" />
          <div className="hero-overlay-bottom" />

          {/* Content */}
          <div className="hero-content">
            <img
              className="poster"
              src={movie.posterUrl || "https://via.placeholder.com/180x270"}
              alt={movie.title}
              onError={e => { e.target.src = "https://via.placeholder.com/180x270"; }}
            />

            <div className="hero-info">
              {/* Playing indicator */}
              <div className={`playing-badge${isPlaying && bgUrl ? " visible" : ""}`}>
                <span className="playing-dot" />
                Trailer playing
              </div>

              <div className="hero-eyebrow">
                <span className="eyebrow-line" />
                WatchWise
              </div>

              <h1 className="movie-title">{movie.title || "Movie Title"}</h1>

              <div className="badges">
                {movie.genre     && <span className="badge badge-red">{movie.genre}</span>}
                {movie.imdbRating && <span className="badge badge-gold">IMDb {movie.imdbRating}</span>}
                {movie.releaseYear && <span className="badge badge-muted">{movie.releaseYear}</span>}
                {movie.language  && <span className="badge badge-muted">{movie.language}</span>}
                {movie.durationMinutes && <span className="badge badge-muted">{movie.durationMinutes} min</span>}
              </div>

              <div className="hero-actions">
                {bgUrl && (
                  <button className="btn-mute" onClick={toggleMute}>
                    <span style={{ fontSize: 14 }}>{isMuted ? "🔇" : "🔊"}</span>
                    {isMuted ? "Unmute" : "Mute"}
                  </button>
                )}
                <button className="btn-scroll" onClick={scrollToTrailer}>
                  Watch Trailer ↓
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="body">

          {/* Back */}
          <a href="/" className="back-btn">← Back to Movies</a>

          {/* About */}
          {movie.description && (
            <div>
              <div className="section-eyebrow">
                <span className="eyebrow-dash" />
                Synopsis
              </div>
              <h2 className="section-title">About the <em>film.</em></h2>
              <p className="description">{movie.description}</p>
            </div>
          )}

          {/* Stats */}
          <div>
            <div className="section-eyebrow">
              <span className="eyebrow-dash" />
              Details
            </div>
            <h2 className="section-title">Film <em>info.</em></h2>
            <div className="stats">
              {[
                { label: "Director",     value: movie.directorName },
                { label: "Release Year", value: movie.releaseYear },
                { label: "Genre",        value: movie.genre },
                { label: "Language",     value: movie.language },
                { label: "Duration",     value: movie.durationMinutes ? `${movie.durationMinutes} mins` : null },
                { label: "IMDb Rating",  value: movie.imdbRating ? `⭐ ${movie.imdbRating}` : null, gold: true },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-value" style={s.gold ? { color: "var(--gold)" } : {}}>
                    {s.value || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Full watchable trailer */}
          <div id="trailer-section">
            <div className="trailer-section-title">
              <div>
                <div className="section-eyebrow">
                  <span className="eyebrow-dash" />
                  Official Trailer
                </div>
                <h2 className="section-title">Watch the <em>trailer.</em></h2>
              </div>
            </div>

            {watchUrl ? (
              <div className="trailer-wrap">
                <iframe
                  src={watchUrl}
                  title="Trailer"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            ) : (
              <div className="no-trailer">No trailer available</div>
            )}
          </div>

          {/* Admin */}
          {role === "ADMIN" && token && (
            <div>
              <a href="/add" className="admin-btn">+ Add New Movie</a>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default MovieDetails;
