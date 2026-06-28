import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccommodationCard from "../components/AccommodationCard";
import { getAllAccommodations } from "../repository/accommodationRepository";

function HomePage() {
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllAccommodations().then((res) => setAccommodations(res.data));
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find your perfect stay</h1>
        <p style={styles.heroSub}>Browse rooms, flats, houses and more across the world</p>
      </div>
      <div style={styles.grid}>
        {accommodations.map((acc) => (
          <AccommodationCard
            key={acc.id}
            accommodation={acc}
            onDetails={() => navigate(`/accommodations/${acc.id}`)}
          />
        ))}
        {accommodations.length === 0 && (
          <p style={styles.empty}>No accommodations yet. Add some from the Accommodations page.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "0 32px 48px" },
  hero: {
    padding: "48px 0 32px",
    borderBottom: "1px solid #f0f0f0",
    marginBottom: 32,
  },
  heroTitle: { margin: 0, fontSize: 36, fontWeight: 800, color: "#222" },
  heroSub: { margin: "8px 0 0", color: "#666", fontSize: 18 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 20,
  },
  empty: { color: "#aaa", gridColumn: "1/-1", textAlign: "center", marginTop: 40 },
};

export default HomePage;
