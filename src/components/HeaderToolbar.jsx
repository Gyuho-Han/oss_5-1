import React from 'react';

export default function HeaderToolbar({ search, onSearch, onFetch, onOpenAdd }) {
  return (
    <header>
      <div className="title-wrap">
        <h1>📚 Student Manager</h1>
        <p>Create, Read, Update, Delete and Search</p>
      </div>
      <div className="toolbar">
        <label className="input" htmlFor="search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <input id="search" placeholder="Search students..." value={search} onChange={(e) => onSearch(e.target.value)} />
        </label>
        <button className="btn ghost" title="Fetch demo data" onClick={onFetch}>Fetch</button>
        <button className="btn" title="Add a new student" onClick={onOpenAdd}>Add New Student</button>
      </div>
    </header>
  );
}

