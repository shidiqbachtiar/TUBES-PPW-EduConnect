import { useState } from 'react';
import PageHeading from '../components/PageHeading';
import { useStore } from '../store';

export default function ManageTasks() {
  const [data, mutate] = useStore();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [due, setDue] = useState('');
  const [cls, setCls] = useState('');
  const [message, setMessage] = useState('');

  function add(e) {
    e.preventDefault();
    const date = new Date(`${due}T00:00:00`).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    mutate(d =>
      d.tasks.unshift({
        id: Date.now(),
        title: title.trim(),
        subject: subject.trim(),
        dueDate: date,
        assignedClass: cls.trim(),
        status: 'Belum dikumpulkan',
        grade: '',
        teacher: 'Administrator'
      })
    );
    setTitle('');
    setSubject('');
    setDue('');
    setCls('');
    setMessage(
      'Tugas dibuat dan akan tampil di halaman Guru dan Murid.'
    );
  }

  return (
    <>
      <PageHeading
        eyebrow="AKADEMIK"
        title="Manajemen Tugas"
        description="Tugas yang ditambahkan Admin dapat dilihat Guru dan Murid."
      />
      <div className="two-columns">
        <section className="panel">
          <h2>Tambah tugas</h2>
          <form onSubmit={add}>
            <label htmlFor="title">Nama tugas</label>
            <input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <label htmlFor="subject">Mata pelajaran</label>
            <input
              id="subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
            <label htmlFor="due">Tenggat</label>
            <input
              id="due"
              type="date"
              value={due}
              onChange={e => setDue(e.target.value)}
              required
            />
            <label htmlFor="class">Kelas</label>
            <input
              id="class"
              value={cls}
              onChange={e => setCls(e.target.value)}
              placeholder="Contoh: XI RPL"
              required
            />
            <button className="primary-button">Tambah tugas</button>
            {message && (
              <p className="success-message" role="status">
                {message}
              </p>
            )}
          </form>
        </section>
        <section className="panel">
          <h2>Daftar tugas ({data.tasks.length})</h2>
          <div className="table-wrap">
            <table className="workspace-table">
              <thead>
                <tr>
                  <th>Tugas</th>
                  <th>Mapel</th>
                  <th>Kelas</th>
                  <th>Tenggat</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.tasks.map(t => (
                  <tr key={t.id}>
                    <td>{t.title}</td>
                    <td>{t.subject}</td>
                    <td>{t.assignedClass}</td>
                    <td>{t.dueDate}</td>
                    <td>
                      <button
                        className="small-button danger-button"
                        onClick={() =>
                          mutate(
                            d =>
                              (d.tasks = d.tasks.filter(
                                x => x.id !== t.id
                              ))
                          )
                        }
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}