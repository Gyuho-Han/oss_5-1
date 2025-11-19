import React, { useEffect, useMemo, useState } from 'react';
import HeaderToolbar from './components/HeaderToolbar';
import StudentList from './components/StudentList';
import StudentModal from './components/StudentModal';

const API_URL = 'https://690493406b8dabde496444eb.mockapi.io/my_data';

export default function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState('add'); // 'add' | 'update'
  const [editing, setEditing] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      (s.name || '').toLowerCase().includes(q) ||
      String(s.age || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q) ||
      (s.phone || '').toLowerCase().includes(q) ||
      (s.sex || '').toLowerCase().includes(q)
    );
  }, [students, search]);

  const openAdd = () => {
    setMode('add');
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (stu) => {
    setMode('update');
    setEditing(stu);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const createStudent = async (payload) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Create failed');
      closeModal();
      await fetchStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const updateStudent = async (id, payload) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Update failed');
      closeModal();
      await fetchStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (form) => {
    if (mode === 'update' && editing?.id) {
      updateStudent(editing.id, form);
    } else {
      createStudent(form);
    }
  };

  return (
    <div className="app">
      <HeaderToolbar
        search={search}
        onSearch={setSearch}
        onFetch={fetchStudents}
        onOpenAdd={openAdd}
      />
      <div className="body-wrap">
        <StudentList students={filtered} onEdit={openEdit} onDelete={deleteStudent} />
      </div>
      <StudentModal
        isOpen={modalOpen}
        mode={mode}
        initialValues={editing}
        onCancel={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
