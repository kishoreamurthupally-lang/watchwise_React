import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{
      background: "rgba(10, 10, 10, 0.95)",
      backdropFilter: "blur(10px)",
      color: "white",
      padding: "15px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #222",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>

      {/* ✅ Logo → goes to /home */}
      <Link to="/home" style={{ textDecoration: "none" }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: "3px",
          color: "white",
          margin: 0
        }}>
          WATCH<span style={{ color: "#e50914" }}>WISE</span>
        </h2>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

        {/* ✅ Home link → /home */}
        <Link to="/home" style={linkStyle}>Home</Link>

        {role === "ADMIN" && (
          <Link to="/add" style={{
            color: "#e50914",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "14px",
            border: "1px solid #e50914",
            padding: "5px 12px",
            borderRadius: "4px"
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
    </nav>
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
  letterSpacing: "1px"
};

const logoutButtonStyle = {
  background: "transparent",
  color: "#888",
  border: "1px solid #444",
  padding: "8px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  transition: "all 0.3s"
};

export default Navbar;