// src/components/Profile.js
import React from "react";

const Profile = ({ profile, onShowLocation }) => {
  return (
    <div className="profile">
      <img src={profile.photo} alt={profile.name} />
      <h3>{profile.name}</h3>
      <p>{profile.description}</p>
      <button onClick={() => onShowLocation(profile.location)}>Summary</button>
    </div>
  );
};

export default Profile;

