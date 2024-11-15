import React from 'react';

const ProfileList = ({ profiles, handleProfileClick, handleLocationClick }) => {
  return (
    <div className="profile-list">
      {profiles.map((profile) => (
        <div key={profile.id} className="profile">
          <img src={profile.photo} alt={profile.name} />
          <div>
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <p>{profile.location}</p>
            <div className="profile-actions">
              <button onClick={() => handleLocationClick(profile)}>
                Summary
              </button>
              <button onClick={() => handleProfileClick(profile)}>
                View Profile
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileList;







