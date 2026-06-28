function AccommodationCard({ accommodation, onDetails, onEdit, onDelete, onRent }) {
  return (
    <div style={styles.card}>
      <div style={styles.badge(accommodation.is_available)}>
        {accommodation.is_available ? "Available" : "Rented"}
      </div>
      <h3 style={styles.name}>{accommodation.name}</h3>
      <p style={styles.meta}>{accommodation.category} · {accommodation.numRooms} rooms</p>
      <p style={styles.host}>
        Host: {accommodation.host.name} {accommodation.host.surname}
      </p>
      <div style={styles.actions}>
        {onDetails && (
          <button style={styles.btn("blue")} onClick={() => onDetails(accommodation)}>Details</button>
        )}
        {onEdit && (
          <button style={styles.btn("gray")} onClick={() => onEdit(accommodation)}>Edit</button>
        )}
        {onRent && accommodation.is_available && (
          <button style={styles.btn("green")} onClick={() => onRent(accommodation.id)}>Mark Rented</button>
        )}
        {onDelete && (
          <button style={styles.btn("red")} onClick={() => onDelete(accommodation.id)}>Delete</button>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: "20px 24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  badge: (available) => ({
    position: "absolute",
    top: 16,
    right: 16,
    background: available ? "#e6f4ea" : "#fce8e6",
    color: available ? "#2e7d32" : "#c62828",
    borderRadius: 20,
    padding: "2px 10px",
    fontSize: 12,
    fontWeight: 600,
  }),
  name: { margin: 0, fontSize: 18, fontWeight: 700, color: "#222", paddingRight: 80 },
  meta: { margin: 0, color: "#666", fontSize: 14 },
  host: { margin: 0, color: "#888", fontSize: 13 },
  actions: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" },
  btn: (color) => {
    const map = {
      blue: { bg: "#e3f2fd", text: "#1565c0" },
      gray: { bg: "#f5f5f5", text: "#424242" },
      green: { bg: "#e8f5e9", text: "#2e7d32" },
      red: { bg: "#fce8e6", text: "#c62828" },
    };
    return {
      background: map[color].bg,
      color: map[color].text,
      border: "none",
      borderRadius: 8,
      padding: "6px 14px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
    };
  },
};

export default AccommodationCard;
