import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ profiles, setProfiles }) => {
  const [newProfile, setNewProfile] = useState({
    name: '',
    description: '',
    photo: '',
    location: '',
    lat: '',
    lng: '',
  });

  const [editingProfile, setEditingProfile] = useState(null); // Track the profile being edited
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Regex to validate URL (basic check for a valid URL)
  const isValidURL = (url) => {
    const regex = /^(https?:\/\/)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})$/;
    return regex.test(url);
  };

  // Handle adding a new profile
  const handleAddProfile = () => {
    setError('');
    setSuccess('');

    if (!newProfile.name || !newProfile.description || !newProfile.location || !newProfile.photo) {
      setError('All fields are required!');
      return;
    }

    if (!isValidURL(newProfile.photo)) {
      setError('Invalid photo URL!');
      return;
    }

    // Add the new profile to the profiles array
    setProfiles([
      ...profiles,
      {
        ...newProfile,
        id: profiles.length + 1,
      }
    ]);
    setNewProfile({ name: '', description: '', photo: '', location: '', lat: '', lng: '' });
    setSuccess('Profile added successfully!');
  };

  // Handle deleting a profile
  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  // Handle editing a profile
  const handleEditProfile = (profile) => {
    setEditingProfile(profile); // Set the profile to be edited
    setNewProfile(profile); // Populate the form with the profile's details
  };

  // Handle saving the edited profile
  const handleSaveProfile = () => {
    setProfiles(profiles.map(profile =>
      profile.id === editingProfile.id ? { ...editingProfile, ...newProfile } : profile
    ));
    setNewProfile({ name: '', description: '', photo: '', location: '', lat: '', lng: '' });
    setEditingProfile(null); // Reset editing mode
    setSuccess('Profile updated successfully!');
  };

  // Handle canceling edit
  const handleCancelEdit = () => {
    setNewProfile({ name: '', description: '', photo: '', location: '', lat: '', lng: '' });
    setEditingProfile(null); // Reset editing mode
  };

  return (
    <div className="admin-panel">
      {/* Display error or success messages */}
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

        {/* Add Profile Form */}
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

            {/* Buttons for adding or saving a profile */}
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





