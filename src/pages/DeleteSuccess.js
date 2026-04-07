import { useNavigate } from "react-router-dom";

function DeleteSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .delete-success {
          background: #0a0a0a;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          color: white;
        }

        .success-box {
          text-align: center;
          background: #111;
          padding: 60px 40px;
          border-radius: 20px;
          border: 1px solid #222;
          max-width: 420px;
          width: 90%;
        }

        .success-box h2 {
          color: #4caf50;
          font-size: 32px;
          margin-bottom: 16px;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
        }

        .success-box p {
          color: #888;
          margin-bottom: 40px;
          font-size: 15px;
          line-height: 1.5;
        }

        .btn-home {
          padding: 14px 32px;
          background: #e50914;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }

        .btn-home:hover {
          background: #ff1a25;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="delete-success">
        <div className="success-box">
          <h2>✅ MOVIE DELETED SUCCESSFULLY</h2>
          <p>The movie has been permanently removed from the database.</p>
          
          <button 
            className="btn-home"
            onClick={() => navigate("/home")}   // ✅ Fixed: Now goes to real Home page
          >
            🏠 GO BACK TO HOME
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteSuccess;