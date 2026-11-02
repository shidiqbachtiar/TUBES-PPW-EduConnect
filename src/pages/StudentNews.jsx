import PageHeading from "../components/PageHeading";
import { useStore } from "../store";
export default function StudentNews() {
  const [data] = useStore();
  return (
    <>
      <PageHeading
        eyebrow="RUANG MURID"
        title="Berita Sekolah"
        description="Informasi prestasi, kegiatan, lomba, dan pengumuman terbaru dari Admin."
      />
      <div className="news-grid">
        {data.news.map((n) => (
          <article className="news-card" key={n.id}>
            <div className="news-visual">📣</div>
            <div className="news-card-content">
              <span className="category-label">{n.category}</span>
              <h3>{n.title}</h3>
              <p className="muted">{n.date}</p>
              <p>{n.summary}</p>
            </div>
          </article>
        ))}
      </div>
      {!data.news.length && <p className="muted">Belum ada berita sekolah.</p>}
    </>
  );
}
