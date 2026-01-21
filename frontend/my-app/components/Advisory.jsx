import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Advisory = ({ fieldId }) => {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvisory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/advisory/${fieldId}`);
        setAdvice(res.data.advisory);
      } catch (err) {
        console.error("Error fetching advisory", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvisory();
  }, [fieldId]);

  if (loading) return <p>Loading expert advice...</p>;

  return (
    <div className="advisory-card">
      <h3> Smart Advisory</h3>
      <ul>
        {advice.map((item, index) => (
          <li key={index} className="advice-item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Advisory;