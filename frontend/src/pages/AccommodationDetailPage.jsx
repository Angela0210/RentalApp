import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAccommodationById } from "../repository/accommodationRepository";

function AccommodationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [acc, setAcc] = useState(null);

  useEffect(() => {
    getAccommodationById(id).then((res) => setAcc(res.data));
  }, [id]);

  if (!acc) return <div style={styles.page}>Loading...</div>;

  return (
    <div style={styles.page}>
      <button style={styles.back} onClick={() => navigate(-1)}>← Back</button>
      <div style={styles.card}>
        <div style={styles.badge(acc.is_available)}>
          {acc.is_available ? "Available" : "Rented"}
        </div>
        <h1 style={styles.title}>{acc.name}</h1>
        <div style={styles.grid}>
          <div style={styles.field}>
            <span style={styles.label}>Category</span>
            <span style={styles.value}>{acc.category}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Rooms</span>
            <span style={styles.value}>{acc.numRooms}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Host</span>
            <span style={styles.value}>{acc.host.name} {acc.host.surname}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Country</span>
            <span style={styles.value}>{acc.host.country.name}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Continent</span>
            <span style={styles.value}>{acc.host.country.continent}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "32px" },
  back: {
    background: "none", border: "none", color: "#ff5a5f",
    fontSize: 15, cursor: "pointer", fontWeight: 600, marginBottom: 20, padding: 0,
  },
  card: {
    background: "#fff", borderRadius: 16,
    padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    maxWidth: 600, position: "relative",
  },
  badge: (available) => ({
    position: "absolute", top: 24, right: 24,
    background: available ? "#e6f4ea" : "#fce8e6",
    color: available ? "#2e7d32" : "#c62828",
    borderRadius: 20, padding: "4px 14px",
    fontSize: 13, fontWeight: 600,
  }),
  title: { margin: "0 0 24px", fontSize: 28, fontWeight: 800, color: "#222" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 4 },
  label: { fontSize: 12, color: "#888", textTransform: "uppercase", fontWeight: 600 },
  value: { fontSize: 16, color: "#222", fontWeight: 500 },
};

export default AccommodationDetailPage;
