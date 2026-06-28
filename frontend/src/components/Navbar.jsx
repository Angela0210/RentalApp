import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/accommodations", label: "Accommodations" },
  { to: "/hosts", label: "Hosts" },
  { to: "/countries", label: "Countries" },
  { to: "/reservations", label: "My Reservations" },
];

function Navbar() {
  const location = useLocation();
  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>🏠 RentalApp</span>
      <div style={styles.links}>
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            style={{
              ...styles.link,
              ...(location.pathname === l.to ? styles.active : {}),
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#fff",
    borderBottom: "1px solid #e8e8e8",
    padding: "0 32px",
    height: 60,
    display: "flex",
    alignItems: "center",
    gap: 32,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: { fontWeight: 800, fontSize: 20, color: "#ff5a5f" },
  links: { display: "flex", gap: 4 },
  link: {
    textDecoration: "none",
    color: "#555",
    fontWeight: 500,
    padding: "6px 14px",
    borderRadius: 8,
    fontSize: 14,
    transition: "background 0.15s",
  },
  active: { background: "#fff0f0", color: "#ff5a5f", fontWeight: 700 },
};

export default Navbar;
