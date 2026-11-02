# EduConnect — Demo Tubes React

Frontend demo portal akademik dengan tiga role yang terhubung: Admin, Guru, dan Murid. Project memakai React + Vite + React Router. Data aksi demo disimpan pada `localStorage` browser sehingga tetap tersedia setelah refresh pada browser yang sama.

## Menjalankan project

Pastikan Node.js versi LTS sudah terpasang.

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite (umumnya `http://localhost:5173`).

Untuk memeriksa build:

```bash
npm run build
```

## Akun demo

- Admin: `admin` / `admin123`
- Guru demo: `budi.santoso` / `guru123`
- Murid demo: `alya.putri` / `murid123`

Admin dapat membuat akun tambahan melalui **Manajemen Pengguna**. Username dan password dari akun itu dapat digunakan untuk login sesuai role yang diberikan.

## Alur yang sudah terhubung

- Admin membuat/menghapus berita; berita muncul di halaman Berita Murid dan ruang Guru.
- Admin membuat/menghapus tugas; tugas muncul di halaman tugas Guru dan Murid sesuai kelas.
- Murid mengumpulkan tugas; pengumpulan tampil pada halaman Guru **Pengumpulan & Penilaian**.
- Guru memberi nilai; nilai bisa dilihat Murid di **Nilai Saya**.
- Guru mencatat kehadiran; status absensi disimpan pada demo.
- Sidebar role menyediakan halaman selain dashboard.

## Catatan demo dan batasan

Ini adalah frontend prototype, bukan sistem produksi. Penyimpanan localStorage hanya berlaku pada browser/perangkat yang sama; data tidak tersinkron antar perangkat dan autentikasi belum aman untuk produksi. Password demo disimpan lokal hanya untuk keperluan presentasi. Untuk sinkronisasi lintas perangkat, diperlukan backend dan database.

Akun awal dan data awal di-seed melalui `src/store.js` serta `src/data/mockData.js`. Untuk reset data demo, hapus key `educonnect_demo_v2` dari localStorage browser.
