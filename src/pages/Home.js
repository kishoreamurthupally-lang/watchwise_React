import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "./Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

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
    padding: 24px 32px 60px;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── HERO ── */
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    letter-spacing: 6px;
    color: var(--text);
    text-align: center;
    margin-bottom: 8px;
  }

  .hero-title span { color: var(--red); }

  .subtitle {
    text-align: center;
    color: var(--muted);
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  /* ── SEARCH ── */
  .search-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #181818;
    border: 1.5px solid #2a2a2a;
    border-radius: 50px;
    padding: 10px 20px;
    width: 480px;
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
  }

  .search-box input::placeholder { color: #555; }
  .search-icon { color: var(--red); font-size: 16px; flex-shrink: 0; }

  /* ── INDUSTRY TABS ── */
  .industry-tabs {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .industry-tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    border-radius: 50px;
    border: 1.5px solid #2a2a2a;
    background: transparent;
    color: var(--muted);
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
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

  /* ── GENRE CHIPS ── */
  .chips {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 36px;
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
  }

  .chip:hover, .chip.active {
    border-color: var(--red);
    color: #fff;
    background: var(--red-dim);
  }

  /* ── SECTION HEADER ── */
  .section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    margin-top: 48px;
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: #1a1a1a;
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
  }

  /* ── GRID ── */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ── CARDS ── */
  .card {
    background: var(--card-bg);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid #1c1c1c;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    position: relative;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px var(--card-accent);
    border-color: var(--card-accent);
  }

  .card:hover .card-overlay { opacity: 1; }
  .card:hover .poster-img { transform: scale(1.05); }

  /* Color accent per industry */
  .card-hollywood { --card-accent: var(--blue); }
  .card-bollywood { --card-accent: var(--orange); }
  .card-tollywood { --card-accent: var(--purple); }
  .card-other     { --card-accent: var(--red); }

  /* Industry indicator strip on card top */
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--card-accent);
    z-index: 3;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .card:hover::before { opacity: 1; }

  .poster-wrap {
    position: relative;
    width: 100%;
    height: 270px;
    overflow: hidden;
    flex-shrink: 0;
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
    background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 14px;
    gap: 6px;
  }

  /* Industry tag on poster */
  .industry-pill {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    z-index: 2;
    backdrop-filter: blur(4px);
  }

  .pill-hollywood {
    background: rgba(26,115,232,0.25);
    border: 1px solid rgba(26,115,232,0.5);
    color: #64b5f6;
  }

  .pill-bollywood {
    background: rgba(255,107,0,0.25);
    border: 1px solid rgba(255,107,0,0.5);
    color: #ffb74d;
  }

  .pill-tollywood {
    background: rgba(124,58,237,0.25);
    border: 1px solid rgba(124,58,237,0.5);
    color: #c084fc;
  }

  .rating-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.8);
    border: 1px solid var(--gold);
    color: var(--gold);
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 20px;
    backdrop-filter: blur(4px);
    z-index: 2;
  }

  .overlay-btn {
    display: block;
    padding: 7px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    border: none;
    transition: opacity 0.15s;
  }

  .overlay-btn:hover { opacity: 0.85; }
  .btn-primary   { background: var(--red); color: #fff; }
  .btn-secondary { background: rgba(255,255,255,0.12); color: #fff; }
  .btn-warn      { background: rgba(255,183,77,0.15); color: #ffb74d; border: 1px solid rgba(255,183,77,0.3) !important; }
  .btn-danger    { background: var(--red); color: #fff; }
  .btn-green     { background: rgba(129,199,132,0.12); color: #81c784; }

  .card-body {
    padding: 12px 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 3px;
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

  .card-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  /* ── RESULTS COUNT ── */
  .results-count {
    text-align: center;
    color: #444;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .results-count span { color: var(--red); }

  /* ── EMPTY ── */
  .empty {
    grid-column: 1/-1;
    text-align: center;
    padding: 80px 0;
    color: var(--muted);
    font-size: 15px;
  }

  .empty-icon { font-size: 48px; display: block; margin-bottom: 12px; }

  /* ── WELCOME TOAST ── */
  .welcome-toast {
    position: fixed;
    top: 24px;
    right: 24px;
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

  .wt-sub { font-size: 12px; color: #666; }

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

  /* ── NO SECTION MOVIES ── */
  .no-section {
    text-align: center;
    padding: 40px;
    color: var(--muted);
    font-size: 13px;
    border: 1px dashed #1a1a1a;
    border-radius: 10px;
    margin-bottom: 40px;
  }
`;

const GENRES = ["All", "Action", "Sci-Fi", "Romance", "Drama", "Thriller", "Comedy", "Horror"];

// ── Detect industry from language field ──
function getIndustry(movie) {
  const lang = (movie.language || "").toLowerCase().trim();
  const title = (movie.title || "").toLowerCase();

  if (lang === "telugu" || lang === "tollywood") return "tollywood";
  if (lang === "hindi" || lang === "bollywood") return "bollywood";
  if (
    lang === "english" ||
    lang === "hollywood" ||
    lang === "french" ||
    lang === "spanish" ||
    lang === "korean" ||
    lang === "japanese"
  ) return "hollywood";

  return "other";
}

const INDUSTRY_CONFIG = {
  all:        { label: "🌍 All",        tab: "active-all" },
  hollywood:  { label: "🎬 Hollywood",  tab: "active-hollywood", badge: "badge-hollywood", pill: "pill-hollywood", emoji: "🎬" },
  bollywood:  { label: "🎭 Bollywood",  tab: "active-bollywood", badge: "badge-bollywood", pill: "pill-bollywood", emoji: "🎭" },
  tollywood:  { label: "🌟 Tollywood",  tab: "active-tollywood", badge: "badge-tollywood", pill: "pill-tollywood", emoji: "🌟" },
};

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

  return (
    <div className={`card card-${industry}`} key={m.id}>
      <div className="poster-wrap">
        <img
          className="poster-img"
          src={m.posterUrl || "https://via.placeholder.com/200x300?text=No+Poster"}
          alt={m.title}
        />

        {/* Industry pill top left */}
        {industry !== "other" && (
          <div className={`industry-pill ${cfg.pill}`}>
            {industry}
          </div>
        )}

        {/* IMDb badge top right */}
        <div className="rating-badge">⭐ {m.imdbRating}</div>

        {/* Hover overlay */}
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
      window.location = "/delete-success";
    }
  };

  // Filter by search + genre
  const baseFiltered = movies.filter(m => {
    const titleMatch = m.title?.toLowerCase().includes(search.toLowerCase());
    const genreMatch = m.genre?.toLowerCase().includes(search.toLowerCase());
    const directorMatch = m.directorName?.toLowerCase().includes(search.toLowerCase());
    const matchSearch = titleMatch || genreMatch || directorMatch;
    const matchGenre = activeGenre === "All" || m.genre?.trim() === activeGenre;
    return matchSearch && matchGenre;
  });

  // Split by industry
  const hollywood = baseFiltered.filter(m => getIndustry(m) === "hollywood");
  const bollywood = baseFiltered.filter(m => getIndustry(m) === "bollywood");
  const tollywood = baseFiltered.filter(m => getIndustry(m) === "tollywood");
  const other     = baseFiltered.filter(m => getIndustry(m) === "other");

  // For single industry view
  const singleView = activeIndustry !== "all"
    ? baseFiltered.filter(m => getIndustry(m) === activeIndustry)
    : null;

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      {/* Welcome Toast */}
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
              ? "You are logged in as Administrator "
              : "Enjoy browsing and recommending movies "}
          </div>
        </div>
      )}

      <div className="page">
        <h1 className="hero-title">🎬 MOVIE<span>S</span></h1>
        <p className="subtitle">Hollywood · Bollywood · Tollywood</p>

        {/* Search */}
        <div className="search-wrap">
          <div className="search-box">
            <span className="search-icon"></span>
            <input
              type="text"
              placeholder="Search title, genre, director..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <span onClick={() => setSearch("")}
                style={{ color: "#555", cursor: "pointer", fontSize: "16px" }}>✕</span>
            )}
          </div>
        </div>

        {/* Industry Tabs */}
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
                <span style={{
                  fontSize: 11,
                  opacity: 0.7,
                  marginLeft: 4
                }}>
                  ({ind === "hollywood" ? hollywood.length
                    : ind === "bollywood" ? bollywood.length
                    : tollywood.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Genre chips */}
        <div className="chips">
          {GENRES.map(g => (
            <button key={g}
              className={`chip ${activeGenre === g ? "active" : ""}`}
              onClick={() => setActiveGenre(g)}>
              {g}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="results-count">
          Showing <span>{singleView ? singleView.length : baseFiltered.length}</span> of {movies.length} movies
        </p>

        {/* ── SINGLE INDUSTRY VIEW ── */}
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

        {/* ── ALL INDUSTRIES VIEW ── */}
        {activeIndustry === "all" && (
          <>
            {/* Hollywood */}
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

            {/* Bollywood */}
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

            {/* Tollywood */}
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

            {/* Other languages */}
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

            {/* Nothing at all */}
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