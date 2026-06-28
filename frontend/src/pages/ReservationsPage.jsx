import { useState, useEffect } from "react";
import {
  getReservationList,
  addToList,
  removeReservation,
  clearList,
  confirmAll,
} from "../repository/reservationRepository";
import { getAllAccommodations } from "../repository/accommodationRepository";

// Fixed user id = 1 for simplicity (as per lab - no login system)
const USER_ID = 1;

function ReservationsPage() {
  const [list, setList] = useState(null);
  const [accommodations, setAccommodations] = useState([]);
  const [form, setForm] = useState({ accommodation_id: "", date_from: "", date_to: "" });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const fetchList = () =>
    getReservationList(USER_ID)
      .then((r) => setList(r.data))
      .catch(() => setList(null));

  useEffect(() => {
    fetchList();
    getAllAccommodations().then((r) => setAccommodations(r.data));
  }, []);

  const handleAdd = async () => {
    setError("");
    try {
      await addToList(USER_ID, {
        accommodation_id: Number(form.accommodation_id),
        date_from: form.date_from,
        date_to: form.date_to,
      });
      setForm({ accommodation_id: "", date_from: "", date_to: "" });
      fetchList();
    } catch (e) {
      setError(e.response?.data?.detail || "Error adding reservation");
    }
  };

  const handleRemove = async (id) => {
    await removeReservation(id);
    fetchList();
  };

  const handleClear = async () => {
    if (window.confirm("Clear the entire list?")) {
      await clearList(USER_ID);
      fetchList();
    }
  };

  const handleConfirm = async () => {
    if (window.confirm("Confirm all reservations? All accommodations will be marked as rented.")) {
      await confirmAll(USER_ID);
      setMsg("All reservations confirmed!");
      fetchList();
    }
  };

  const getAccName = (id) => {
    const a = accommodations.find((a) => a.id === id);
    return a ? a.name : `#${id}`;
  };

  const reservations = list?.reservations || [];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>My Reservation List</h1>
      {msg && <div style={styles.success}>{msg}</div>}

      <div style={styles.addBox}>
        <h3 style={styles.subTitle}>Add Accommodation to List</h3>
        <div style={styles.row}>
          <select
            style={styles.input}
            value={form.accommodation_id}
            onChange={(e) => setForm({ ...form, accommodation_id: e.target.value })}
          >
            <option value="">Select accommodation</option>
            {accommodations.filter((a) => a.is_available).map((a) => (
              <option key={a.id} value={a.id}>{a.name} ({a.category})</option>
            ))}
          </select>
          <input
            style={styles.input}
            type="date"
            value={form.date_from}
            onChange={(e) => setForm({ ...form, date_from: e.target.value })}
          />
          <input
            style={styles.input}
            type="date"
            value={form.date_to}
            onChange={(e) => setForm({ ...form, date_to: e.target.value })}
          />
          <button style={styles.addBtn} onClick={handleAdd}>Add</button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
      </div>

      <div style={styles.listBox}>
        <div style={styles.listHeader}>
          <h3 style={styles.subTitle}>Pending Reservations ({reservations.length})</h3>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.clearBtn} onClick={handleClear} disabled={reservations.length === 0}>Clear List</button>
            <button style={styles.confirmBtn} onClick={handleConfirm} disabled={reservations.length === 0}>Confirm All</button>
          </div>
        </div>

        {reservations.length === 0 ? (
          <p style={styles.empty}>No pending reservations.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                {["Accommodation", "From", "To", "Action"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} style={styles.tr}>
                  <td style={styles.td}>{getAccName(r.accommodation_id)}</td>
                  <td style={styles.td}>{r.date_from}</td>
                  <td style={styles.td}>{r.date_to}</td>
                  <td style={styles.td}>
                    <button style={styles.delBtn} onClick={() => handleRemove(r.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "32px" },
  title: { margin: "0 0 24px", fontSize: 28, fontWeight: 800, color: "#222" },
  success: { background: "#e6f4ea", color: "#2e7d32", borderRadius: 8, padding: "10px 16px", marginBottom: 20, fontWeight: 600 },
  addBox: { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", marginBottom: 24 },
  subTitle: { margin: "0 0 14px", fontSize: 17, fontWeight: 700, color: "#333" },
  row: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },
  input: { border: "1px solid #e0e0e0", borderRadius: 8, padding: "9px 12px", fontSize: 14, outline: "none", flex: 1, minWidth: 140 },
  addBtn: { background: "#ff5a5f", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" },
  error: { color: "#c62828", fontSize: 14, marginTop: 8 },
  listBox: { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" },
  listHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  clearBtn: { background: "#f5f5f5", color: "#424242", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, cursor: "pointer", fontSize: 14 },
  confirmBtn: { background: "#e8f5e9", color: "#2e7d32", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontSize: 14 },
  empty: { color: "#aaa", textAlign: "center", padding: "20px 0" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#f9f9f9", padding: "10px 14px", textAlign: "left", fontSize: 13, fontWeight: 700, color: "#555", borderBottom: "1px solid #eee" },
  tr: { borderBottom: "1px solid #f0f0f0" },
  td: { padding: "10px 14px", fontSize: 14, color: "#333" },
  delBtn: { background: "#fce8e6", color: "#c62828", border: "none", borderRadius: 7, padding: "5px 12px", fontWeight: 600, cursor: "pointer", fontSize: 13 },
};

export default ReservationsPage;
