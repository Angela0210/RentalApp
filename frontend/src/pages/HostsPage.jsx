import { useState, useEffect } from "react";
import { getAllHosts, createHost, deleteHost } from "../repository/hostRepository";
import { getAllCountries } from "../repository/countryRepository";
import Modal from "../components/Modal";

function HostsPage() {
  const [hosts, setHosts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", surname: "", country_id: "" });

  const fetch = () => {
    getAllHosts().then((r) => setHosts(r.data));
    getAllCountries().then((r) => setCountries(r.data));
  };

  useEffect(() => { fetch(); }, []);

  const handleSubmit = async () => {
    await createHost({ ...form, country_id: Number(form.country_id) });
    setShowModal(false);
    setForm({ name: "", surname: "", country_id: "" });
    fetch();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this host?")) {
      await deleteHost(id);
      fetch();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Hosts</h1>
        <button style={styles.addBtn} onClick={() => setShowModal(true)}>+ Add Host</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            {["ID", "Name", "Surname", "Country", "Actions"].map((h) => (
              <th key={h} style={styles.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hosts.map((h) => (
            <tr key={h.id} style={styles.tr}>
              <td style={styles.td}>{h.id}</td>
              <td style={styles.td}>{h.name}</td>
              <td style={styles.td}>{h.surname}</td>
              <td style={styles.td}>{h.country?.name}</td>
              <td style={styles.td}>
                <button style={styles.delBtn} onClick={() => handleDelete(h.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {hosts.length === 0 && (
            <tr><td colSpan={5} style={{ textAlign: "center", color: "#aaa", padding: 24 }}>No hosts yet.</td></tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <Modal title="Add Host" onClose={() => setShowModal(false)}>
          <div style={styles.form}>
            <label style={styles.label}>Name</label>
            <input style={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label style={styles.label}>Surname</label>
            <input style={styles.input} value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
            <label style={styles.label}>Country</label>
            <select style={styles.input} value={form.country_id} onChange={(e) => setForm({ ...form, country_id: e.target.value })}>
              <option value="">Select country</option>
              {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button style={styles.submitBtn} onClick={handleSubmit}>Add Host</button>
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
  addBtn: { background: "#ff5a5f", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 15, cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" },
  th: { background: "#f9f9f9", padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 700, color: "#555", borderBottom: "1px solid #eee" },
  tr: { borderBottom: "1px solid #f0f0f0" },
  td: { padding: "12px 16px", fontSize: 14, color: "#333" },
  delBtn: { background: "#fce8e6", color: "#c62828", border: "none", borderRadius: 7, padding: "5px 12px", fontWeight: 600, cursor: "pointer", fontSize: 13 },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  label: { fontSize: 13, fontWeight: 600, color: "#555" },
  input: { border: "1px solid #e0e0e0", borderRadius: 8, padding: "9px 12px", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" },
  submitBtn: { background: "#ff5a5f", color: "#fff", border: "none", borderRadius: 10, padding: "11px 0", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4 },
};

export default HostsPage;
