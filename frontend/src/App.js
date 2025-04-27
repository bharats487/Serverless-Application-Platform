import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [health, setHealth] = useState('');
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/health').then(res => setHealth(res.data.status));
    axios.get('http://localhost:4000/api/metrics').then(res => setMetrics(res.data.metrics));
    // WebSocket connection for real-time updates
    const ws = new window.WebSocket('ws://localhost:4000');
    ws.onmessage = msg => {
      // Handle real-time messages here
      console.log('WebSocket:', msg.data);
    };
    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Serverless Application Platform</h1>
      <p>Backend health: {health}</p>
      <h2>Metrics</h2>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}

export default App;
