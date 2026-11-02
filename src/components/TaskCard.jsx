export default function TaskCard({ task, onDelete }) {
  return (
    <article className="task-row">
      <div>
        <span className="category-label">{task.subject}</span>
        <h3>{task.title}</h3>
        <p className="muted">{task.assignedClass} · Tenggat {task.dueDate}</p>
      </div>
      <button className="danger-button" onClick={() => onDelete(task.id)}>Hapus</button>
    </article>
  );
}