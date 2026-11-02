export default function StatCard({ label, value, note }) {
  return (
    <article className="stat-card">
      <p className="muted">{label}</p>
      <strong>{value}</strong>
      {note && <span className="stat-note">{note}</span>}
    </article>
  );
}
