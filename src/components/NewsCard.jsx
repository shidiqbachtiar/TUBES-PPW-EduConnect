export default function NewsCard({ item, onDelete }) {
  return (
    <article className="news-card">
      <div className="news-visual" aria-hidden="true">{item.category.slice(0, 1)}</div>
      <div className="news-body">
        <span className="category-label">{item.category}</span>
        <p className="muted small-text">{item.date}</p>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        {onDelete && <button className="danger-button" onClick={() => onDelete(item.id)}>Hapus berita</button>}
      </div>
    </article>
  );
}