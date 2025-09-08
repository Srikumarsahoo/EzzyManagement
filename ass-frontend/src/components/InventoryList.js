import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InventoryList() {
  const [parts, setParts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    axios.get('http://localhost:5000/api/parts', { 
      headers: { Authorization: `Bearer ${token}` } // Send token in headers
    })
    .then(res => setParts(res.data))
    .catch(err => setError('ERROR\n' + err.toString()));
  }, []);

  if(error) return <pre style={{color: 'red'}}>{error}</pre>;

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {parts.map(part => (
          <li key={part.code}>{part.name} ({part.quantity} units)</li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;
