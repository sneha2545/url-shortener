import React, { useEffect, useState } from 'react';

function AdminPage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/urls')
      .then(res => res.json())
      .then(data => {
        setUrls(data.urls);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Admin: All Shortened URLs</h2>
        {loading ? <p>Loading...</p> : (
          <table>
            <thead>
              <tr>
                <th>Short URL</th>
                <th>Original URL</th>
                <th>Visit Count</th>
              </tr>
            </thead>
            <tbody>
              {urls.map(url => (
                <tr key={url.shortCode}>
                  <td><a href={`http://localhost:3000/${url.shortCode}`}>{url.shortCode}</a></td>
                  <td style={{ wordBreak: 'break-all' }}>{url.originalUrl}</td>
                  <td>{url.visitCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
