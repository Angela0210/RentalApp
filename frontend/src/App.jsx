import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AccommodationsPage from "./pages/AccommodationsPage";
import AccommodationDetailPage from "./pages/AccommodationDetailPage";
import HostsPage from "./pages/HostsPage";
import CountriesPage from "./pages/CountriesPage";
import ReservationsPage from "./pages/ReservationsPage";

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#f7f7f7", fontFamily: "system-ui, sans-serif" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accommodations" element={<AccommodationsPage />} />
          <Route path="/accommodations/:id" element={<AccommodationDetailPage />} />
          <Route path="/hosts" element={<HostsPage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
