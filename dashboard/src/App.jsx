import "./styles/global.css";
import "./styles/queries.css";
import Account from "./pages/dashboard-pages/account/account.jsx";
import Callback from "./components/callback.jsx";
import CommitteeMemberPage from "./pages/dashboard-pages/committee/committee-details/committeeDetails.jsx";
import CommitteePage from "./pages/dashboard-pages/committee/committee.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import DashboardLayout from "./components/ui/dashboardLayout/dashboardLayout.jsx";
import EventDetailsPage from "./pages/dashboard-pages/events/event-details/eventDetails.jsx";
import EventsPage from "./pages/dashboard-pages/events/events.jsx";
import Feedback from "./pages/dashboard-pages/feedback/feedback.jsx";
import Footer from "./components/ui/footer/footer.jsx";
import Gallery from "./pages/dashboard-pages/gallery/gallery.jsx";
import LoginPage from "./pages/login/login.jsx";
import Navbar from "./components/ui/navbar/navbar.jsx";
import NotFound from "./pages/notFound.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import React from "react";
import SiteMetadataPage from "./pages/dashboard-pages/siteData/siteData.jsx";
import SponsorDetailsPage from "./pages/dashboard-pages/sponsors/sponsors-details/sponsorDetails.jsx";
import SponsorsPage from "./pages/dashboard-pages/sponsors/sponsors.jsx";
import StagingPage from "./pages/dashboard-pages/staging.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { GalleryProvider } from "./hooks/useGallery.jsx";
import { OverlayProvider } from "./hooks/useOverlay.jsx";
import { StagingProvider } from "./hooks/useStaging.jsx";

// src/App.jsx








const App = () => (
  
  <AuthProvider>
    <div className="page-container">
      <Navbar />
      <div className="content-wrap">
        <OverlayProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/callback" element={<Callback />} />
            
            {/* Protected dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <StagingProvider>
                      <GalleryProvider>
                          <DashboardLayout />
                      </GalleryProvider>
                  </StagingProvider>
                </ProtectedRoute>
              }
            >
              {/* Dashboard home */}
              <Route index element={<Dashboard />} />

              <Route path="account"><Route index element={<Account />} /></Route>
              <Route path="gallery"><Route index element={<Gallery />} /></Route>\
              <Route path="feedback"><Route index element={<Feedback />} /></Route>\

              {/* Events */}
              <Route path="events">
                <Route index element={<EventsPage />} />
                <Route path=":id" element={<EventDetailsPage />} />
              </Route>

              {/* Committee */}
              <Route path="committee">
                <Route index element={<CommitteePage />} />
                <Route path=":id" element={<CommitteeMemberPage />} />
              </Route>

              {/* Sponsors */}
              <Route path="sponsors">
                <Route index element={<SponsorsPage />} />
                <Route path=":id" element={<SponsorDetailsPage />} />
              </Route>

              {/* Site Metadata */}
              <Route path="sitedata" element={<SiteMetadataPage />} />

              {/* Staging */}
              <Route path="staging" element={<StagingPage />} />
            </Route>

            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </OverlayProvider>
      </div>
      <Footer />
    </div>
  </AuthProvider>
);

export default App;
