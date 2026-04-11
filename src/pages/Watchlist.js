import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const styles = `
  .watchlist-page {
    background: #0a0a0a;
    min-height: 100vh;
    padding: 20px 16px 60px;
    font-family: 'DM Sans', sans-serif;
  }

  @media (min-width: 768px) {
    .watchlist-page {
      padding: 24px 32px 60px;
    }
  }

  .watchlist-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .watchlist-header h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    letter-spacing: 4px;
    color: white;
  }

  .watchlist-header h1 span {
    color: #e50914;
  }

  .watchlist-header p {
    color: #888;
    font-size: 14px;
    margin-top: 10px;
  }

  .watchlist-stats {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-card {
    background: #111;
    padding: 15px 25px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid #1e1e1e;
  }

  .stat-number {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    color: #e50914;
  }

  .stat-label {
    font-size: 12px;
    color: #666;
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

  .watchlist-card {
    background: #111;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #1c1c1c;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    position: relative;
  }

  .watchlist-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.7);
    border-color: #e50914;
  }

  .poster-wrap {
    position: relative;
    width: 100%;
    height: 270px;
    overflow: hidden;
  }

  @media (max-width: 640px) {
    .poster-wrap {
      height: 200px;
    }
  }

  .poster-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* HEART BUTTON STYLES - Instagram Style */
  .heart-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.7);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 10;
    backdrop-filter: blur(4px);
  }

  .heart-btn:hover {
    transform: scale(1.1);
  }

  .heart-icon {
    font-size: 20px;
    transition: all 0.2s;
  }

  .heart-btn:hover .heart-icon {
    transform: scale(1.15);
  }

  @media (max-width: 640px) {
    .heart-btn {
      width: 30px;
      height: 30px;
    }
    .heart-icon {
      font-size: 16px;
    }
  }

  .card-body {
    padding: 12px;
  }

  .card-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 17px;
    letter-spacing: 1.5px;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #888;
    margin: 5px 0;
  }

  .rating {
    color: #f5c518;
    font-size: 11px;
  }

  .view-btn {
    display: block;
    text-align: center;
    padding: 8px;
    background: #e50914;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    margin-top: 10px;
    transition: opacity 0.2s;
  }

  .view-btn:hover {
    opacity: 0.8;
  }

  .empty-watchlist {
    text-align: center;
    padding: 80px 20px;
    color: #666;
  }

  .empty-icon {
    font-size: 64px;
    margin-bottom: 20px;
  }

  .empty-watchlist h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    color: white;
    margin-bottom: 10px;
  }

  .browse-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 30px;
    background: #e50914;
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 2px;
  }
`;

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    loadWatchlist();
  }, [token, navigate]);

  const loadWatchlist = () => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  };

  const removeFromWatchlist = (movieId) => {
    const updated = watchlist.filter(m => m.id !== movieId);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <>
      <style>{styles}</style>
      <Navbar />
      
      <div className="watchlist-page">
        <div className="watchlist-header">
          <h1>MY <span>WATCHLIST</span></h1>
          <p>Movies you want to watch later</p>
        </div>

        <div className="watchlist-stats">
          <div className="stat-card">
            <div className="stat-number">{watchlist.length}</div>
            <div className="stat-label">Movies Saved</div>
          </div>
        </div>

        {watchlist.length > 0 ? (
          <div className="grid">
            {watchlist.map(movie => (
              <div key={movie.id} className="watchlist-card">
                <div className="poster-wrap">
                  <img 
                    className="poster-img" 
                    src={movie.posterUrl || "https://via.placeholder.com/200x300?text=No+Poster"}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/200x300?text=No+Poster";
                    }}
                  />
                  {/* HEART BUTTON - Instagram Style */}
                  <button 
                    className="heart-btn"
                    onClick={() => removeFromWatchlist(movie.id)}
                    title="Remove from watchlist"
                  >
                    <span className="heart-icon">❤️</span>
                  </button>
                </div>
                <div className="card-body">
                  <div className="card-title">{movie.title}</div>
                  <div className="card-meta">
                    <span>{movie.releaseYear}</span>
                    <span>•</span>
                    <span className="rating">⭐ {movie.imdbRating}</span>
                  </div>
                  <a href={`/movie/${movie.id}`} className="view-btn">
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-watchlist">
            <div className="empty-icon">💔</div>
            <h3>Your watchlist is empty</h3>
            <p>Save movies by clicking the ❤️ button on any movie</p>
            <a href="/home" className="browse-btn">Browse Movies</a>
          </div>
        )}
      </div>
    </>
  );
}

export default Watchlist;