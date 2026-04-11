import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [watchlistCount, setWatchlistCount] = useState(0);

  // Get watchlist count
  useEffect(() => {
    const updateCount = () => {
      const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setWatchlistCount(watchlist.length);
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <style>{`
        /* Force hide horizontal scroll */
        html, body {
          overflow-x: hidden !important;
          width: 100% !important;
        }
        
        /* Mobile Menu Styles */
        @media (max-width: 768px) {
          .desktop-nav-links {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            background: rgba(229, 9, 20, 0.1);
            border: 1px solid rgba(229, 9, 20, 0.3);
            border-radius: 8px;
            padding: 8px 12px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .mobile-menu-btn:hover {
            background: rgba(229, 9, 20, 0.3);
          }
          
          .hamburger-line {
            width: 22px;
            height: 2px;
            background: #e50914;
            margin: 2px 0;
            border-radius: 2px;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-overlay {
            display: none !important;
          }
        }
        
        .mobile-menu-btn {
          display: none;
        }
        
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #0a0a0a;
          z-index: 9999;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          overflow-y: auto;
        }
        
        .mobile-overlay.open {
          transform: translateX(0);
        }
        
        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          padding: 80px 20px 40px;
          min-height: 100vh;
        }
        
        .close-menu-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(229, 9, 20, 0.2);
          border: 1px solid #e50914;
          color: #e50914;
          font-size: 24px;
          cursor: pointer;
          padding: 8px 15px;
          border-radius: 8px;
          z-index: 10000;
        }
        
        .close-menu-btn:hover {
          background: #e50914;
          color: white;
        }
        
        .mobile-nav-item {
          margin: 10px 0;
          border-bottom: 1px solid #222;
        }
        
        .mobile-nav-link {
          color: white;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
          padding: 15px;
          display: block;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .mobile-nav-link:hover {
          background: rgba(229, 9, 20, 0.2);
          color: #e50914;
          padding-left: 25px;
        }
        
        .mobile-logout-btn {
          width: 100%;
          background: #e50914;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          margin-top: 20px;
          transition: all 0.3s ease;
        }
        
        .mobile-login-btn {
          width: 100%;
          background: #e50914;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          margin-top: 20px;
        }
        
        .mobile-user-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 30px;
          text-align: center;
          border: 1px solid #e50914;
        }
        
        .user-avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: #e50914;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          font-size: 30px;
          font-weight: bold;
          color: white;
        }
        
        .user-name {
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 16px;
          color: white;
        }
        
        .user-role-badge {
          font-size: 12px;
          color: #e50914;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
      `}</style>

      <nav style={{
        background: "#0a0a0a",
        color: "white",
        padding: "12px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #e50914",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%"
      }}>

        {/* Logo */}
        <Link to="/home" style={{ textDecoration: "none" }} onClick={closeMobileMenu}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "3px",
            color: "white",
            margin: 0,
            fontSize: windowWidth <= 480 ? "20px" : "24px"
          }}>
            WATCH<span style={{ color: "#e50914" }}>WISE</span>
          </h2>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="desktop-nav-links" style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "20px" 
        }}>
          <Link to="/home" style={linkStyle}>Home</Link>

          {/* WATCHLIST LINK - ADDED */}
          {token && (
            <Link to="/watchlist" style={{
              color: "#aaa",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}>
              📚 Watchlist
              {watchlistCount > 0 && (
                <span style={{
                  background: "#e50914",
                  color: "white",
                  fontSize: "10px",
                  padding: "2px 6px",
                  borderRadius: "10px",
                  marginLeft: "4px"
                }}>
                  {watchlistCount}
                </span>
              )}
            </Link>
          )}

          {role === "ADMIN" && (
            <Link to="/add" style={{
              color: "#e50914",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
              border: "1px solid #e50914",
              padding: "6px 15px",
              borderRadius: "4px",
              whiteSpace: "nowrap"
            }}>
              + ADD MOVIE
            </Link>
          )}

          {!token ? (
            <button onClick={() => navigate("/login")} style={loginButtonStyle}>
              LOGIN
            </button>
          ) : (
            <button onClick={handleLogout} style={logoutButtonStyle}>
              LOGOUT
            </button>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}>
          <button className="close-menu-btn" onClick={closeMobileMenu}>✕</button>
          
          <div className="mobile-menu-content">
            {/* User Info Section */}
            {token && (
              <div className="mobile-user-card">
                <div className="user-avatar">
                  {role === "ADMIN" ? "👑" : "🎬"}
                </div>
                <div className="user-name">
                  {role === "ADMIN" ? "Administrator" : "Movie Fan"}
                </div>
                <div className="user-role-badge">{role || "USER"}</div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="mobile-nav-item">
              <Link to="/home" className="mobile-nav-link" onClick={closeMobileMenu}>
                🏠 Home
              </Link>
            </div>

            {/* WATCHLIST LINK - ADDED FOR MOBILE */}
            {token && (
              <div className="mobile-nav-item">
                <Link to="/watchlist" className="mobile-nav-link" onClick={closeMobileMenu}>
                  📚 My Watchlist
                  {watchlistCount > 0 && (
                    <span style={{
                      background: "#e50914",
                      color: "white",
                      fontSize: "12px",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      marginLeft: "10px"
                    }}>
                      {watchlistCount}
                    </span>
                  )}
                </Link>
              </div>
            )}

            {/* Add Movie for Admin only */}
            {role === "ADMIN" && (
              <div className="mobile-nav-item">
                <Link to="/add" className="mobile-nav-link" onClick={closeMobileMenu}>
                  ➕ Add Movie
                </Link>
              </div>
            )}

            {/* Auth Buttons */}
            {!token ? (
              <button 
                onClick={() => {
                  navigate("/login");
                  closeMobileMenu();
                }} 
                className="mobile-login-btn"
              >
                🔐 LOGIN
              </button>
            ) : (
              <button onClick={handleLogout} className="mobile-logout-btn">
                🚪 LOGOUT
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

const linkStyle = {
  color: "#aaa",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  transition: "color 0.3s"
};

const loginButtonStyle = {
  background: "#e50914",
  color: "white",
  border: "none",
  padding: "8px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  fontFamily: "'Bebas Neue', sans-serif",
  letterSpacing: "1px",
  fontSize: "14px",
  whiteSpace: "nowrap"
};

const logoutButtonStyle = {
  background: "transparent",
  color: "#888",
  border: "1px solid #444",
  padding: "8px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  transition: "all 0.3s",
  whiteSpace: "nowrap"
};

export default Navbar;