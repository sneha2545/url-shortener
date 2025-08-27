import React, { useState } from 'react';
import AdminPage from './AdminPage';
import './App.css';

function App() {
  const [page, setPage] = useState('user');
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl('');
    try {
      const res = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: longUrl }),
      });
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setShortUrl('Error shortening URL');
    }
    setLoading(false);
  };

  if (page === 'admin') {
    return (
      <div className="container">
        <button className="nav-btn" onClick={() => setPage('user')}>User Page</button>
        <AdminPage />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">URL Shortener</h2>
        <button className="nav-btn" onClick={() => setPage('admin')}>Admin Page</button>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="url"
            value={longUrl}
            onChange={e => setLongUrl(e.target.value)}
            placeholder="Enter long URL"
            className="input"
            required
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </form>
        {shortUrl && (
          <div className="result">
            <strong>Short URL:</strong> <a href={shortUrl}>{shortUrl}</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
