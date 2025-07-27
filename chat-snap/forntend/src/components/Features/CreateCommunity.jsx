import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { useSelector } from 'react-redux';
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';

const CreateCommunity = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);

  const handleImageUpload = async (e, type) => {
    setUploading(true);
    try {
      const url = await uploadToCloudnary(e.target.files[0], 'image');
      if (type === 'avatar') setImage(url);
      else setBackgroundImage(url);
    } catch (err) {
      console.log('Image Upload Error:', err);
    }
    setUploading(false);
  };

  const handleCreate = async () => {
    try {
      const payload = { name, description, image, backgroundImage };
      const res = await api.post('/api/communities', payload, {
        headers: { userId: authUser.id },
      });
      navigate(`/api/communities/${res.data.id}`);
    } catch (err) {
      alert('Failed to create community');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-2">Create Community</h2>

      <input
        className="border p-2 w-full rounded"
        placeholder="Community Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="border p-2 w-full rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Background Image Upload */}
      <div>
        <label className="block font-semibold mb-1">Upload Background Image</label>
        <input type="file" onChange={(e) => handleImageUpload(e, 'background')} />
        {backgroundImage && (
          <img src={backgroundImage} alt="bg" className="mt-2 h-[150px] w-full object-cover rounded" />
        )}
      </div>

      {/* Avatar Upload */}
      <div>
        <label className="block font-semibold mb-1">Upload Avatar Image</label>
        <input type="file" onChange={(e) => handleImageUpload(e, 'avatar')} />
        {image && (
          <img src={image} alt="avatar" className="mt-2 h-[100px] w-[100px] object-cover rounded-full" />
        )}
      </div>

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Create'}
      </button>
    </div>
  );
};

export default CreateCommunity;
