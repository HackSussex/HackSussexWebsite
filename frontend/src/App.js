import "./App.css";
import Footer from "./components/Footer.js";
import Navbar from "./components/NewNavbar.js";
import React, { Suspense, lazy, useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop.js";
import Signup from "./views/Signup.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = lazy(() => import('./views/Home.js'));
const About = lazy(() => import('./views/About.js'));
const Hackathon = lazy(() => import('./views/events/Hackathon.js'));
const CodersCup = lazy(() => import('./views/events/CodersCup.js'));
const CodeSocials = lazy(() => import('./views/events/CodeSocials.js'));
const MineSoc = lazy(() => import('./views/events/MineSoc.js'));
const PwnSussex = lazy(() => import('./views/events/PwnSussex.js'));
const GameJam = lazy(() => import('./views/events/GameJam.js'));
const Leetcoding = lazy(() => import('./views/events/Leetcoding.js'));
const AllEvents = lazy(() => import('./views/events/AllEvents.js'));
const EventPage = lazy(() => import('./views/events/EventPage.js'));
const Gallery = lazy(() => import('./views/Gallery.js'));
const FAQ = lazy(() => import('./views/FAQ.js'));
const Robotics = lazy(() => import('./views/events/Robotics.js'));
const CompetitiveProgramming = lazy(() =>
  import('./views/events/CompetitiveProgramming.js')
);
const Sponsorship = lazy(() => import('./views/Sponsorship.js'));

function NoMatch() {
  return (
    <div className="container-fluid gradient opacity-75">
      <div className="row align-items-center me-auto ms-auto vh-100">
        <div className="col-12 text-center">
          <h1 className="display-1 text-dark">404 Error</h1>
          <h2 className="display-6 text-dark row align-items-center text-center justify-content-center">
            <div className="col-auto p-0 m-0 text-end">
              <i className="fas fa-coffee text-dark"> </i>
            </div>
            <div className="col-8 col-md-4 p-0 m-0">
              This page is taking a coffee break.
            </div>
            <div className="col-auto p-0 m-0">
              <i className="fas fa-coffee text-dark"> </i>
            </div>
          </h2>
          <h4 className="text-dark">
            In the meantime, grab your favourite mug and explore our other pages
            while this one takes a break.
          </h4>
          <Link
            to="/"
            type="button"
            className="btn text-dark fs-3 mt-5"
          >
            <i className="fas fa-arrow-left"></i> Go back
          </Link>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center me-auto"
          style={{ height: '100vh' }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <BrowserRouter>
        <RouterReload />
      </BrowserRouter>
    </Suspense>
  );
};

function RouterReload() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/Events/coderscup");
    }
  }, []); {/* Update for specific events */ }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/sponsorship"
          element={<Sponsorship />}
        />
        <Route
          path="/events"
          element={<AllEvents />}
        />
        <Route
          path="/Events/:date/:title"
          element={<EventPage />}
        />
        <Route
          path="/Events/hackathon"
          element={<Hackathon />}
        />
        <Route
          path="/Events/coderscup"
          element={<CodersCup />}
        />
        {/* <Route path="/Events/codesocials" element={<CodeSocials />} /> */}
        <Route
          path="/Events/MineSoc"
          element={<MineSoc />}
        />
        <Route
          path="/Events/pwnsussex"
          element={<PwnSussex />}
        />
        <Route
          path="/Events/gamejam"
          element={<GameJam />}
        />
        <Route
          path="/Events/leetcoding"
          element={<Leetcoding />}
        />
        <Route
          path="/Events/robotics"
          element={<Robotics />}
        />
        <Route
          path="/Events/competitiveProgramming"
          element={<CompetitiveProgramming />}
        />
        <Route
          path="/gallery"
          element={<Gallery />}
        />
        <Route
          path="/faq"
          element={<FAQ />}
        />
        <Route
          path="*"
          element={<NoMatch />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
