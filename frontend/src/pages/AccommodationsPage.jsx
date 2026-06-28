import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccommodationCard from "../components/AccommodationCard";
import Modal from "../components/Modal";
import {
  getAllAccommodations,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  markAsRented,
} from "../repository/accommodationRepository";
import { getAllHosts } from "../repository/hostRepository";

const CATEGORIES = ["ROOM", "HOUSE", "FLAT", "APARTMENT", "HOTEL", "MOTEL"];
const EMPTY_FORM = { name: "", category: "ROOM", host_id: "", numRooms: 1, is_available: true };

function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const navigate = useNavigate();

  const fetch = () => {
    getAllAccommodations().then((r) => setAccommodations(r.data));
    getAllHosts().then((r) => setHosts(r.data));
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setForm(EMPTY_FORM); setEditTarget(null); setShowModal(true); };
  const openEdit = (acc) => {
    setForm({ name: acc.name, category: acc.category, host_id: acc.host.id, numRooms: acc.numRooms, is_available: acc.is_available });
    setEditTarget(acc);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    const payload = { ...form, host_id: Number(form.host_id), numRooms: Number(form.numRooms) };
    if (editTarget) {
      await updateAccommodation(editTarget.id, payload);
    } else {
      await createAccommodation(payload);
    }
    setShowModal(false);
    fetch();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this accommodation?")) {
      await deleteAccommodation(id);
      fetch();
    }
  };

  const handleRent = async (id) => {
    await markAsRented(id);
    fetch();
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Accommodations</h1>
        <button style={styles.addBtn} onClick={openAdd}>+ Add New</button>
      </div>

      <div style={styles.grid}>
        {accommodations.map((acc) => (
          <AccommodationCard
            key={acc.id}
            accommodation={acc}
            onDetails={() => navigate(`/accommodations/${acc.id}`)}
            onEdit={openEdit}
            onDelete={handleDelete}
            onRent={handleRent}
          />
        ))}
        {accommodations.length === 0 && <p style={styles.empty}>No accommodations yet.</p>}
      </div>

      {showModal && (
        <Modal title={editTarget ? "Edit Accommodation" : "Add Accommodation"} onClose={() => setShowModal(false)}>
          <div style={styles.form}>
            <label style={styles.label}>Name</label>
            <input style={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <label style={styles.label}>Category</label>
            <select style={styles.input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>

            <label style={styles.label}>Host</label>
            <select style={styles.input} value={form.host_id} onChange={(e) => setForm({ ...form, host_id: e.target.value })}>
              <option value="">Select host</option>
              {hosts.map((h) => <option key={h.id} value={h.id}>{h.name} {h.surname}</option>)}
            </select>

            <label style={styles.label}>Number of Rooms</label>
            <input style={styles.input} type="number" min={1} value={form.numRooms} onChange={(e) => setForm({ ...form, numRooms: e.target.value })} />

            <label style={styles.checkRow}>
              <input type="checkbox" checked={form.is_available} onChange={(e) => setForm({ ...form, is_available: e.target.checked })} />
              Available
            </label>

            <button style={styles.submitBtn} onClick={handleSubmit}>
              {editTarget ? "Save Changes" : "Add Accommodation"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "32px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 },
  title: { margin: 0, fontSize: 28, fontWeight: 800, color: "#222" },
  addBtn: {
    background: "#ff5a5f", color: "#fff", border: "none",
    borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 15, cursor: "pointer",
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 },
  empty: { color: "#aaa", textAlign: "center", gridColumn: "1/-1", marginTop: 40 },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  label: { fontSize: 13, fontWeight: 600, color: "#555" },
  input: {
    border: "1px solid #e0e0e0", borderRadius: 8, padding: "9px 12px",
    fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box",
  },
  checkRow: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" },
  submitBtn: {
    background: "#ff5a5f", color: "#fff", border: "none",
    borderRadius: 10, padding: "11px 0", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4,
  },
};

export default AccommodationsPage;
