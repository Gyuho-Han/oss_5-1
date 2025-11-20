import React, { useEffect, useState } from 'react';

export default function StudentModal({ isOpen, mode, initialValues, onCancel, onSubmit }) {
  const [form, setForm] = useState({ name: '', age: '', email: '', phone: '', sex: '' });

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: initialValues?.name || '',
        age: initialValues?.age || '',
        email: initialValues?.email || '',
        phone: initialValues?.phone || '',
        sex: initialValues?.sex || '',
      });
    }
  }, [isOpen, initialValues]);

  useEffect(() => {
    if (isOpen) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h2>{mode === 'update' ? 'Edit Student' : 'Add New Student'}</h2>
        <div className="form-grid">
          <div className="input-row">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="input-row">
            <label htmlFor="age">Age</label>
            <input type="text" id="age" placeholder="20" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
          </div>
          <div className="input-row">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="jane@school.edu" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="input-row">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" placeholder="010-0000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="input-row" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="sex">Sex</label>
            <input type="text" id="sex" placeholder="male / female" value={form.sex} onChange={(e) => setForm({ ...form, sex: e.target.value })} />
          </div>
        </div>
        <button className="btnAddReact" type="button" onClick={() => onSubmit(form)}>{mode === 'update' ? 'Update' : 'Add'}</button>
        <button className="btnCancelReact" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
