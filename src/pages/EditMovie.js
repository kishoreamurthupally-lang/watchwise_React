import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "./Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #e50914;
    --red-dim: rgba(229,9,20,0.12);
    --red-glow: rgba(229,9,20,0.25);
    --bg: #0a0a0a;
    --surface: #111111;
    --surface2: #181818;
    --border: #222;
    --border-focus: #e50914;
    --text: #ffffff;
    --muted: #666;
    --label: #999;
    --gold: #f5c518;
    --green: #4caf50;
  }

  .edit-page {
    background: var(--bg);
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    padding-bottom: 80px;
  }

  .edit-hero {
    background: linear-gradient(180deg, #1a0000 0%, var(--bg) 100%);
    padding: 40px 32px 32px;
    text-align: center;
    border-bottom: 1px solid #1a1a1a;
    margin-bottom: 40px;
  }

  .edit-hero h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 44px;
    letter-spacing: 5px;
    color: var(--text);
  }

  .edit-hero h1 span { color: var(--red); }

  .edit-hero p {
    color: var(--muted);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 6px;
  }

  .edit-container {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 28px;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px;
    margin-bottom: 20px;
  }

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 3px;
    color: var(--red);
    text-transform: uppercase;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #1e1e1e;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .form-grid.full { grid-template-columns: 1fr; }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field.span2 { grid-column: span 2; }

  .field label {
    font-size: 11px;
    font-weight: 600;
    color: var(--label);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .field input,
  .field textarea,
  .field select {
    background: var(--surface2);
    border: 1.5px solid var(--border);
    border-radius: 8px;
    padding: 11px 14px;
    color: var(--text);
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .field input:focus,
  .field textarea:focus,
  .field select:focus {
    border-color: var(--red);
    box-shadow: 0 0 0 3px var(--red-dim);
  }

  .field input::placeholder,
  .field textarea::placeholder { color: #3a3a3a; }

  .field textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.6;
  }

  .sidebar { position: sticky; top: 24px; }

  .poster-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .poster-preview {
    width: 100%;
    height: 360px;
    object-fit: cover;
    display: block;
    background: var(--surface2);
  }

  .poster-empty {
    width: 100%;
    height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: var(--surface2);
    color: var(--muted);
    font-size: 13px;
  }

  .poster-empty span { font-size: 40px; }

  .poster-meta {
    padding: 14px 16px;
  }

  .poster-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 2px;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .poster-sub {
    font-size: 12px;
    color: var(--muted);
    margin-top: 4px;
  }

  .trailer-wrap {
    border-radius: 10px;
    overflow: hidden;
    background: #000;
    aspect-ratio: 16/9;
    margin-bottom: 20px;
  }

  .trailer-wrap iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  .trailer-empty {
    aspect-ratio: 16/9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--surface2);
    border-radius: 10px;
    color: var(--muted);
    font-size: 12px;
    gap: 8px;
    margin-bottom: 20px;
    border: 1px dashed #222;
  }

  .trailer-empty span { font-size: 30px; }

  .btn-save {
    width: 100%;
    padding: 14px;
    background: var(--red);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    margin-bottom: 10px;
  }

  .btn-save:hover {
    background: #ff1a25;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px var(--red-glow);
  }

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
    text-align: center;
    display: block;
    text-decoration: none;
  }

  .btn-back:hover {
    border-color: #444;
    color: #fff;
  }

  .toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(80px);
    background: var(--green);
    color: #fff;
    padding: 12px 28px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    transition: transform 0.3s ease;
    z-index: 9999;
    white-space: nowrap;
  }

  .toast.show { transform: translateX(-50%) translateY(0); }

  .stars {
    display: flex;
    gap: 3px;
    margin-top: 4px;
  }

  .star {
    font-size: 14px;
    color: #333;
    transition: color 0.15s;
    cursor: pointer;
  }

  .star.on { color: var(--gold); }

  @media (max-width: 768px) {
    .edit-container { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
    .field.span2 { grid-column: span 1; }
    .sidebar { position: static; }
  }
`;

const getEmbedUrl = (url) => {
  if (!url) return "";
  const match = url.match(/[?&]v=([^&]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  const short = url.match(/youtu\.be\/([^?]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  return url;
};

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const [movie, setMovie] = useState({
    title: "", genre: "", rating: 0, directorName: "",
    releaseYear: 0, language: "", durationMinutes: 0,
    imdbRating: 0, leadActor: "", leadActress: "",
    description: "", awards: "", posterUrl: "", trailerUrl: ""
  });

  useEffect(() => {
    API.get(`/movies/${id}`).then(res => setMovie(res.data));
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const updateMovie = async () => {
    try {
      await API.put(`/movies/${id}`, movie);
      setToast(true);

      setTimeout(() => {
        setToast(false);
        navigate("/home");        // ✅ Fixed: Now goes to real Home page
      }, 1800);
    } catch (error) {
      alert("Failed to update movie. Please try again.");
    }
  };

  const embedUrl = getEmbedUrl(movie.trailerUrl);

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      <div className="edit-page">
        <div className="edit-hero">
          <h1>EDIT <span>MOVIE</span></h1>
          <p>Update movie details below</p>
        </div>

        <div className="edit-container">

          {/* LEFT — Form */}
          <div>
            {/* Basic Info */}
            <div className="section">
              <div className="section-title">🎬 Basic Info</div>
              <div className="form-grid">
                <div className="field span2">
                  <label>Movie Title</label>
                  <input name="title" placeholder="e.g. Interstellar" value={movie.title || ""} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Genre</label>
                  <input name="genre" placeholder="e.g. Sci-Fi" value={movie.genre || ""} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Language</label>
                  <input name="language" placeholder="e.g. English" value={movie.language || ""} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Release Year</label>
                  <input name="releaseYear" type="number" placeholder="e.g. 2014" value={movie.releaseYear || ""} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Duration (mins)</label>
                  <input name="durationMinutes" type="number" placeholder="e.g. 169" value={movie.durationMinutes || ""} onChange={handleChange} />
                </div>
                <div className="field span2">
                  <label>Description</label>
                  <textarea name="description" placeholder="Write a short synopsis..." value={movie.description || ""} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Ratings & Awards */}
            <div className="section">
              <div className="section-title">⭐ Ratings & Awards</div>
              <div className="form-grid">
                <div className="field">
                  <label>IMDb Rating</label>
                  <input name="imdbRating" type="number" step="0.1" min="0" max="10" placeholder="e.g. 8.7" value={movie.imdbRating || ""} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Your Rating</label>
                  <input name="rating" type="number" step="0.1" min="0" max="10" placeholder="e.g. 9.0" value={movie.rating || ""} onChange={handleChange} />
                </div>
                <div className="field span2">
                  <label>Awards</label>
                  <input name="awards" placeholder="e.g. Academy Award for Best Visual Effects" value={movie.awards || ""} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Cast & Crew */}
            <div className="section">
              <div className="section-title">🎭 Cast & Crew</div>
              <div className="form-grid">
                <div className="field span2">
                  <label>Director</label>
                  <input name="directorName" placeholder="e.g. Christopher Nolan" value={movie.directorName || ""} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Lead Actor</label>
                  <input name="leadActor" placeholder="e.g. Matthew McConaughey" value={movie.leadActor || ""} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Lead Actress</label>
                  <input name="leadActress" placeholder="e.g. Anne Hathaway" value={movie.leadActress || ""} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="section">
              <div className="section-title">🖼️ Media</div>
              <div className="form-grid full">
                <div className="field">
                  <label>Poster URL</label>
                  <input name="posterUrl" placeholder="https://..." value={movie.posterUrl || ""} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Trailer URL (YouTube)</label>
                  <input name="trailerUrl" placeholder="https://youtube.com/watch?v=..." value={movie.trailerUrl || ""} onChange={handleChange} />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT — Sidebar Preview */}
          <div className="sidebar">
            <div className="poster-card">
              {movie.posterUrl ? (
                <img className="poster-preview" src={movie.posterUrl} alt="Poster" />
              ) : (
                <div className="poster-empty"><span>🎬</span>Poster preview</div>
              )}
              <div className="poster-meta">
                <div className="poster-title">{movie.title || "Movie Title"}</div>
                <div className="poster-sub">
                  {[movie.genre, movie.releaseYear, movie.language].filter(Boolean).join(" · ")}
                </div>
              </div>
            </div>

            {embedUrl ? (
              <div className="trailer-wrap">
                <iframe src={embedUrl} title="Trailer" allowFullScreen />
              </div>
            ) : (
              <div className="trailer-empty"><span>▶</span>Trailer preview</div>
            )}

            <button className="btn-save" onClick={updateMovie}>
              💾 SAVE CHANGES
            </button>
            
            {/* ✅ Fixed Back Button */}
            <a href="/home" className="btn-back">⬅ Back to Movies</a>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <div className={`toast ${toast ? "show" : ""}`}>
        ✅ Movie updated successfully!
      </div>
    </>
  );
}

export default EditMovie;