import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AddMovie() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    rating: 0,
    directorName: "",
    releaseYear: 0,
    language: "",
    durationMinutes: 0,
    imdbRating: 0,
    leadActor: "",
    leadActress: "",
    description: "",
    awards: "",
    posterUrl: "", // This will be set automatically
    trailerUrl: ""
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  //  NEW: Automatic Image Path Handler
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      // Automatically sets the path to your public/images folder
      setMovie({ ...movie, posterUrl: `/images/${fileName}` });
    }
  };


  const saveMovie = async () => {
    setLoading(true);
    try {
      // Ensure the token is present for authorization
      const token = localStorage.getItem("token");
      await API.post("/movies", movie, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Movie Added Successfully ");
      navigate("/"); 
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie. Check if you are logged in as Admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", color: "white" }}>
      <Navbar />

      <div style={containerStyle}>
        <h2 style={headerStyle}>🎬 ADD NEW CINEMA</h2>
        
        <div style={formGrid}>
          {/* Movie Details */}
          <input style={inputStyle} name="title" placeholder="Movie Title" onChange={handleChange} />
          
          <select name="genre" onChange={handleChange} style={inputStyle}>
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
           <option value="Thriller">Thriller</option>

            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
          </select>



          <input style={inputStyle} name="directorName" placeholder="Director Name" onChange={handleChange} />
          <input style={inputStyle} type="number" name="releaseYear" placeholder="Release Year" onChange={handleChange} />
          
          {/* Ratings & Technicals */}
          <input style={inputStyle} type="number" name="imdbRating" placeholder="IMDb Rating (e.g. 8.5)" onChange={handleChange} />
          <input style={inputStyle} type="number" name="durationMinutes" placeholder="Duration (Minutes)" onChange={handleChange} />
          <input style={inputStyle} name="language" placeholder="Language" onChange={handleChange} />
          <input style={inputStyle} name="awards" placeholder="Awards Won" onChange={handleChange} />

          {/* Cast */}
          <input style={inputStyle} name="leadActor" placeholder="Lead Actor" onChange={handleChange} />
          <input style={inputStyle} name="leadActress" placeholder="Lead Actress" onChange={handleChange} />

          {/* Media Links */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Select Poster Image from your computer:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} style={fileInputStyle} />
            <p style={{ color: "#e50914", fontSize: "10px", marginTop: "5px" }}>
              *Remember to copy this image file into your public/images folder!
            </p>
          </div>

          <input style={{ ...inputStyle, gridColumn: "1 / -1" }} name="trailerUrl" placeholder="Trailer URL (YouTube Link)" onChange={handleChange} />
          
          <textarea style={textAreaStyle} name="description" placeholder="Short Movie Description..." onChange={handleChange} />
        </div>

        <button onClick={saveMovie} disabled={loading} style={buttonStyle}>
          {loading ? "SAVING..." : "💾 SAVE TO LIBRARY"}
        </button>

        <center>
          <a href="/" style={{ color: "#888", textDecoration: "none", fontSize: "14px" }}>⬅ Back to Gallery</a>
        </center>
      </div>
    </div>
  );
}




// --- STYLES ---
const containerStyle = { padding: "40px 20px", maxWidth: "800px", margin: "auto" };
const headerStyle = { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "4px", textAlign: "center", marginBottom: "30px", fontSize: "32px" };
const formGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" };
const labelStyle = { display: "block", fontSize: "11px", color: "#666", marginBottom: "5px", textTransform: "uppercase" };
const inputStyle = { background: "#1a1a1a", border: "1px solid #333", color: "white", padding: "12px", borderRadius: "5px", outline: "none" };
const fileInputStyle = { background: "#1a1a1a", color: "#888", padding: "10px", width: "100%", borderRadius: "5px", border: "1px dashed #444" };
const textAreaStyle = { gridColumn: "1 / -1", background: "#1a1a1a", border: "1px solid #333", color: "white", padding: "12px", borderRadius: "5px", minHeight: "80px", outline: "none" };
const buttonStyle = { width: "100%", background: "#e50914", color: "white", border: "none", padding: "15px", borderRadius: "5px", fontWeight: "bold", fontSize: "16px", cursor: "pointer", margin: "30px 0 15px 0", letterSpacing: "2px" };

export default AddMovie;

