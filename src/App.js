import "./index.css";
import {
  BrowserRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import Home from "./Components/home/HomeComponent";
import AboutUs from "./Components/about-us/AboutUsComponent";
import PageNotFound from "./Components/page-not-found/PageNotFoundComponent";
import Profile from "./Components/profile/ProfileComponent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
