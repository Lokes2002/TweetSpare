import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/api/communities');
      setCommunities(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Communities</h2>
        <Button variant="contained" onClick={() => navigate('/communities/create')}>
          + Create
        </Button>
      </div>
      <div className="space-y-4">
        {communities.map((c) => (
          <div
            key={c.id}
            className="border p-3 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/communities/${c.id}`)}  // ✅ FIXED
          >
            <h3 className="font-semibold text-lg">{c.name}</h3>
            <p className="text-gray-600">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
