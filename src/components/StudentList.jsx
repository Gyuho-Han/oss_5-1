import React from 'react';

export default function StudentList({ students, onEdit, onDelete }) {
  if (!students || students.length === 0) {
    return (
      <div id="contents">
        <div className="empty">
          <span className="emoji">✨</span>
          No students yet. Click "Add New Student" to create one, or "Fetch" to load demo data.
        </div>
      </div>
    );
  }

  return (
    <div id="contents">
      <ul>
        {students.map((stu) => {
          const sex = (stu.sex || '-').toLowerCase();
          const badgeClass = sex === 'male' ? 'male' : sex === 'female' ? 'female' : 'na';
          const initials = String(stu.name || '?')
            .split(' ')
            .map((p) => p[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
          return (
            <li key={stu.id}>
              <div className="avatar" aria-hidden="true">{initials}</div>
              <span className={`badge ${badgeClass}`}>{sex || '-'}</span>
              <div className="meta">
                <div className="name">{stu.name || 'Unnamed'} <span className="sub">({stu.age || '-'})</span></div>
                <div className="sub">{stu.email || '-'} • {stu.phone || '-'}</div>
              </div>
              <div className="row-actions">
                <button onClick={() => onEdit(stu)}>Modify</button>
                <button onClick={() => onDelete(stu.id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

