function Modal({ title, onClose, children }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button style={styles.close} onClick={onClose}>✕</button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff", borderRadius: 14,
    width: "100%", maxWidth: 480,
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "20px 24px 0",
  },
  title: { margin: 0, fontSize: 20, fontWeight: 700 },
  close: {
    background: "none", border: "none", fontSize: 20,
    cursor: "pointer", color: "#888",
  },
  body: { padding: 24 },
};

export default Modal;
