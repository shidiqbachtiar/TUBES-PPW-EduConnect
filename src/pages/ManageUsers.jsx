import { useState } from 'react';
import PageHeading from '../components/PageHeading';
import UserCard from '../components/UserCard';
import EmptyState from '../components/EmptyState';
import { useStore } from '../store';
export default function ManageUsers() {
    const [data, mutate] = useStore();
    const users = data.users.filter(u => u.role !== 'admin');
    const [search, setSearch] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('murid');
    const [className, setClassName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);

    function add(e) {
        e.preventDefault();

        if (!name.trim() ||
            !className.trim() ||
            !username.trim() ||
            !password.trim()) {
            setError('Semua kolom wajib diisi.');
            return;
        }
        if (data.users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            setError('Username sudah digunakan.');
            return;
        } mutate(d => d.users.unshift({
            id: Date.now(),
            name: name.trim(),
            role,
            className: className.trim(),
            username: username.trim(),
            password
        }));
        setName('');
        setClassName('');
        setUsername('');
        setPassword('');
        setError('');
        setMessage('Akun berhasil ditambahkan. Pengguna sekarang dapat login.')
    }

    function editUser(user) {
        setEditingId(user.id);
        setName(user.name);
        setRole(user.role);
        setClassName(user.className);
        setUsername(user.username);
        setPassword(user.password);
    }

    function updateUser(e) {
        e.preventDefault();

        if (
            !name.trim() ||
            !className.trim() ||
            !username.trim() ||
            !password.trim()
        ) {
            setError('Semua kolom wajib diisi.');
            return;
        }

        const duplicate = data.users.some(
            u =>
                u.username.toLowerCase() ===
                username.trim().toLowerCase() &&
                u.id !== editingId
        );

        if (duplicate) {
            setError('Username sudah digunakan.');
            return;
        }

        mutate(d => {
            const user = d.users.find(
                u => u.id === editingId
            );

            if (user) {
                Object.assign(user, {
                    name: name.trim(),
                    role,
                    className: className.trim(),
                    username: username.trim().toLowerCase(),
                    password
                });
            }
        });

        cancelEdit();
        setMessage('Pengguna berhasil diperbarui.');
    }

    function cancelEdit() {
        setEditingId(null);
        setName('');
        setRole('murid');
        setClassName('');
        setUsername('');
        setPassword('');
        setError('');
    }

    const filtered = users.filter(u => `${u.name} ${u.role} ${u.className} ${u.username}`.toLowerCase().includes(search.toLowerCase()));
    return <><PageHeading eyebrow="DATA PENGGUNA" title="Manajemen Pengguna" description="Admin mendaftarkan akun Guru dan Murid beserta kredensial login." />
        <div className="two-columns">
            <section className="panel">
                <h2>Tambah pengguna</h2>
                <form onSubmit={editingId ? updateUser : add}>
                    <label htmlFor="name">Nama lengkap</label>
                    <input id="name" value={name} onChange={e => setName(e.target.value)} required />
                    <label htmlFor="role">Role</label>
                    <select id="role" value={role} onChange={e => setRole(e.target.value)}>
                        <option value="murid">Murid</option><option value="guru">Guru</option>
                    </select>
                    <label htmlFor="class">Kelas / mata pelajaran</label>
                    <input id="class" value={className} onChange={e => setClassName(e.target.value)} required />
                    <label htmlFor="username">Username</label>
                    <input id="username" value={username} onChange={e => setUsername(e.target.value)} required />
                    <label htmlFor="password">Password demo</label>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength="4" />
                    {error && <p className="form-error" role="alert">{error}</p>}
                    {message && <p className="success-message" role="status">{message}</p>}
                    <button className="primary-button">{editingId ? 'Save perubahan' : 'Buat Akun'}</button>
                    {editingId && (
                        <button type="button" className="small-button" onClick={cancelEdit}> Batal </button>
                    )}
                </form>
            </section>
            <section className="panel">
                <h2>Daftar akun</h2>
                <label htmlFor="search">Cari pengguna</label>
                <input id="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Nama, role, username..." />
                <p className="muted small-text">{filtered.length} akun</p>
                <div className="user-list">
                    {filtered.map(u => <div className="user-row" key={u.id}>
                        <div>
                            <strong>{u.name}</strong>
                            <span>{u.role} · {u.className}</span>
                            <small>Username: {u.username}</small>
                        </div>
                        <div className="action-buttons">
                            <button className="small-button" onClick={() => editUser(u)}>Edit</button>

                            <button className="small-button danger-button" onClick={() => {
                                    const confirmDelete = window.confirm(
                                        `Yakin ingin menghapus ${u.name}?`
                                    );

                                    if (confirmDelete) {
                                        mutate(d => {
                                            d.users = d.users.filter(
                                                x => x.id !== u.id
                                            );
                                        });
                                    }
                                }}
                            >Hapus</button>
                        </div>
                    </div>)}</div>
                {!filtered.length && <EmptyState title="Pengguna tidak ditemukan" description="Coba kata kunci lain." />}
            </section></div></>
}
