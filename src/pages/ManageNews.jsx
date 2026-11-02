import { useState } from 'react';
import PageHeading from '../components/PageHeading';
import NewsCard from '../components/NewsCard';
import { useStore } from '../store';
export default function ManageNews() {
    const [data, mutate] = useStore();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Prestasi');
    const [summary, setSummary] = useState('');
    const [message, setMessage] = useState('');
    const [editingId, setEditingId] = useState(null);

    function add(e) {
        e.preventDefault();
        mutate(d => d.news.unshift({
            id: Date.now(),
            title: title.trim(),
            category,
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            summary: summary.trim()
        }));
        setTitle('');
        setSummary('');
        setMessage('Berita ditambahkan dan tersedia pada dashboard role lain.');
    } return

    function editNews(news) {
        setEditingId(news.id);
        setTitle(news.title);
        setCategory(news.category);
        setSummary(news.summary);
    }

    function updateNews(e) {
        e.preventDefault();

        if (!title.trim() || !summary.trim()) {
            setMessage('Judul dan isi berita wajib diisi.');
            return;
        }

        mutate(d => {
            const news = d.news.find(
                n => n.id === editingId
            );

            if (news) {
                news.title = title.trim();
                news.category = category;
                news.summary = summary.trim();
            }
        });

        cancelEdit();
        setMessage('Berita berhasil diperbarui.');
    }


    function cancelEdit() {
        setEditingId(null);
        setTitle('');
        setCategory('Prestasi');
        setSummary('');
    }
    <>
        <PageHeading eyebrow="KONTEN SEKOLAH" title="Manajemen Berita" description="Berita yang dibuat Admin tampil pada halaman berita Murid dan Guru." />
        <div className="two-columns">
            <section className="panel">
                <h2>Tambah berita</h2>
                <form onSubmit={editingId ? updateNews : add}>
                    <label htmlFor="title">Judul berita</label>
                    <input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
                    <label htmlFor="category">Kategori</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)}
                    ><option>Prestasi</option>
                        <option>Lomba</option>
                        <option>Event</option>
                        <option>Pengumuman</option>
                    </select>
                    <label htmlFor="summary">Isi berita</label>
                    <textarea id="summary" rows="5" value={summary} onChange={e => setSummary(e.target.value)} required />
                    <button className="primary-button">
                        {editingId ? 'Simpan Perubahan' : 'Publikasikan'}
                    </button>

                    {editingId && (
                        <button type="button" className="small-button" onClick={cancelEdit}>Batal</button>
                    )}
                    {message && <p className="success-message" role="status">{message}</p>}
                </form>
            </section>
            <section className="panel">
                <h2>Berita terpublikasi ({data.news.length})</h2>
                <div className="news-grid">
                    {data.news.map(n => <article className="news-card" key={n.id}>
                        <div className="news-card-content">
                            <span className="category-label">{n.category}</span>
                            <h3>{n.title}</h3>
                            <p className="muted">
                                {n.date}</p>
                            <p>{n.summary}</p>
                            <div className="action-buttons">
                                <button className="small-button" onClick={() => editNews(n)}>Edit</button>

                                <button className="small-button danger-button" onClick={() => {
                                        const confirmDelete = window.confirm(
                                            `Yakin ingin menghapus berita "${n.title}"?`
                                        );

                                        if (confirmDelete) {
                                            mutate(d => {
                                                d.news = d.news.filter(
                                                    x => x.id !== n.id
                                                );
                                            });
                                        }
                                    }}>Hapus Berita</button>
                            </div>
                        </div></article>)}
                </div>
            </section>
        </div></>
}
