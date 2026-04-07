import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import MovieDetails from "./pages/MovieDetails";
import DeleteSuccess from "./pages/DeleteSuccess";
import Recommend from "./pages/Recommend";
import RecommendSuccess from "./pages/RecommendSuccess";
import AddSuccess from "./pages/AddSuccess";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/*  Intro — landing page */}
        <Route path="/" element={<IntroPage />} />

        {/*  Home — movies grid */}
        <Route path="/home" element={<Home />} />  {/* ← THIS WAS MISSING */}

        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/edit/:id" element={<EditMovie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/delete-success" element={<DeleteSuccess />} />
        <Route path="/recommend/:id" element={<Recommend />} />
        <Route path="/recommend-success" element={<RecommendSuccess />} />
        <Route path="/add-success" element={<AddSuccess />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;