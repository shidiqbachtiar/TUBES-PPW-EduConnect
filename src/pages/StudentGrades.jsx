import PageHeading from "../components/PageHeading";
import { useStore } from "../store";
export default function StudentGrades({ user }) {
  const [data] = useStore();
  const subs = data.submissions.filter(
    (s) => s.studentId === user.id && s.grade !== "" && s.grade !== null,
  );
  return (
    <>
      <PageHeading
        eyebrow="RUANG MURID"
        title="Nilai Saya"
        description="Nilai yang diberikan Guru setelah tugas diperiksa."
      />
      <section className="panel">
        <h2>Rekap nilai</h2>
        <div className="table-wrap">
          <table className="workspace-table">
            <thead>
              <tr>
                <th>Tugas</th>
                <th>Status</th>
                <th>Nilai</th>
                <th>Tanggal pengumpulan</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id}>
                  <td>
                    {s.taskTitle ||
                      data.tasks.find((t) => t.id === s.taskId)?.title}
                  </td>
                  <td>{s.status}</td>
                  <td>
                    <strong>{s.grade}</strong>
                  </td>
                  <td>{s.submittedAt || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!subs.length && (
          <p className="muted">
            Belum ada nilai. Nilai akan muncul setelah Guru memeriksa tugas
            kamu.
          </p>
        )}
      </section>
    </>
  );
}
