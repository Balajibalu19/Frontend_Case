import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ profiles, setProfiles }) => {
  const [newProfile, setNewProfile] = useState({
    name: '',
    description: '',
    photo: '',
    location: '',
    lat: 0,         // New input for latitude
    lng: 0,         // New input for longitude
    contact: '',
    interests: '',
  });

  const [editingProfile, setEditingProfile] = useState(null); // Track the profile being edited
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle adding a new profile
  const handleAddProfile = () => {
    setError('');
    setSuccess('');

    if (!newProfile.name || !newProfile.description || !newProfile.location || !newProfile.photo || !newProfile.contact || !newProfile.interests || !newProfile.lat || !newProfile.lng) {
      setError('All fields are required!');
      return;
    }

    const interestsArray = (newProfile.interests || '')
      .trim()
      .split(',')
      .map(interest => interest.trim());


    setProfiles([
      ...profiles,
      {
        ...newProfile,
        interests: interestsArray,
        id: profiles.length + 1,
      }
    ]);
    console.log(newProfile);
    setNewProfile({ name: '', description: '', photo: '', location: '', lat: 0, lng: 0, contact: '', interests: '' });
    setSuccess('Profile added successfully!');
  };

  // Handle deleting a profile
  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  // Handle editing a profile
  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
    setNewProfile(profile);
  };

  // Handle saving the edited profile
  const handleSaveProfile = () => {
    let interestsArray;

    // Check if newProfile.interests is an array or a string
    if (Array.isArray(newProfile.interests)) {
      interestsArray = newProfile.interests; // It's already an array
    } else {
      interestsArray = (newProfile.interests || '')
        .trim()
        .split(',')
        .map(interest => interest.trim());
    }

    setProfiles(profiles.map(profile =>
      profile.id === editingProfile.id ? { ...editingProfile, ...newProfile, interests: interestsArray } : profile
    ));

    setNewProfile({ name: '', description: '', photo: '', location: '', lat: 0, lng: 0, contact: '', interests: '' });
    setEditingProfile(null);
    setSuccess('Profile updated successfully!');
  };


  // Handle canceling edit
  const handleCancelEdit = () => {
    setNewProfile({ name: '', description: '', photo: '', location: '', lat: '', lng: '', contact: '', interests: '' });
    setEditingProfile(null);
  };

  return (
    <div className="admin-panel">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <h2>Profiles</h2>
      <div className="content-container">

        {/* Profile List */}
        <div className="profile-list-container">
          <div className="profile-list">
            {profiles.map(profile => (
              <div key={profile.id} className="profile">
                <img src={profile.photo} alt={profile.name} />
                <h2>{profile.name}</h2>
                <p>{profile.description}</p>
                <p>{profile.location}</p>

                <button onClick={() => handleEditProfile(profile)}>Edit</button>
                <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Profile Form */}
        <div className="form-container">
          <h2>{editingProfile ? 'Edit Profile' : 'Add Profile'}</h2>
          <div className="input-fields">
            <input
              type="text"
              placeholder="Name"
              value={newProfile.name}
              onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProfile.description}
              onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              value={newProfile.location}
              onChange={(e) => setNewProfile({ ...newProfile, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={newProfile.photo}
              onChange={(e) => setNewProfile({ ...newProfile, photo: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact"
              value={newProfile.contact}
              onChange={(e) => setNewProfile({ ...newProfile, contact: e.target.value })}
            />
            <input
              type="text"
              placeholder="Interests (comma-separated)"
              value={newProfile.interests || ''} // Ensure it's always a string
              onChange={(e) => setNewProfile({ ...newProfile, interests: e.target.value })}
            />

            <input
              type="number"
              placeholder="Latitude"
              value={newProfile.lat}
              onChange={(e) => setNewProfile({ ...newProfile, lat: parseFloat(e.target.value) || 0 })}
            />
            <input
              type="number"
              placeholder="Longitude"
              value={newProfile.lng}
              onChange={(e) => setNewProfile({ ...newProfile, lng: parseFloat(e.target.value) || 0 })}
            />


            {editingProfile ? (
              <>
                <button className="save-profile-button" onClick={handleSaveProfile}>Save Changes</button>
                <button className="cancel-edit-button" onClick={handleCancelEdit}>Cancel Edit</button>
              </>
            ) : (
              <button className="add-profile-button" onClick={handleAddProfile}>Add Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;





