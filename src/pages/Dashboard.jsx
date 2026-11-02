import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import StatCard from "../components/StatCard";
import NewsCard from "../components/NewsCard";
import { initialNews, initialTasks, initialUsers } from "../data/mockData";

export default function Dashboard({ adminName }) {
  return (
    <>
      <PageHeading eyebrow="RINGKASAN" title={`Halo, ${adminName}!`} description="Pantau ringkasan konten dan data akademik sekolah." />
      <section className="stats-grid">
        <StatCard label="Berita sekolah" value={initialNews.length} note="Data contoh" />
        <StatCard label="Pengguna" value={initialUsers.length} note="Guru dan murid" />
        <StatCard label="Tugas aktif" value={initialTasks.length} note="Data contoh" />
      </section>
      <section className="section-block">
        <div className="section-title"><h2>Berita terbaru</h2><Link to="/news">Kelola berita →</Link></div>
        <div className="news-grid">
          {initialNews.slice(0, 2).map((item) => <NewsCard key={item.id} item={item} />)}
        </div>
      </section>
      <section className="quick-links">
        <h2>Akses cepat</h2>
        <Link to="/users">Kelola pengguna <span>→</span></Link>
        <Link to="/tasks">Kelola tugas <span>→</span></Link>
        <Link to="/news">Kelola berita <span>→</span></Link>
      </section>
    </>
  );
}