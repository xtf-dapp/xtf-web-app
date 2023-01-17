import {
  BrowserRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

import AboutUs from "./components/about-us/AboutUsComponent";
import Blog from "./components/blog/BlogComponent";
import Home from "./components/home/HomeComponent";
import PageNotFound from "./components/page-not-found/PageNotFoundComponent";
import Profile from "./components/profile/ProfileComponent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
