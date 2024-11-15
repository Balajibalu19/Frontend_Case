import React, { useState, useEffect } from "react";
import './App.css';
import ProfileList from './components/ProfileList';
import AdminPanel from './components/AdminPanel';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { ClipLoader } from "react-spinners"; // Optional: Use this or similar spinner

// Profile Modal (View Profile Details)
const ProfileModal = ({ profile, onClose, onLocationClick }) => {
  if (!profile) return null; // Return nothing if no profile is selected

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>X</button>
        <h3>{profile.name}</h3>
        <img src={profile.photo} alt={profile.name} />
        <p>{profile.description}</p>
        <p>Location: <span className="location-link" onClick={() => onLocationClick(profile)}>Show on Map</span></p>
        <p>Contact: {profile.contact}</p>
        <p>Interests: {profile.interests.join(', ')}</p>
      </div>
    </div>
  );
};

// Map Modal (Shows the location on the map)
const MapModal = ({ profile, onClose }) => {
  if (!profile) return null; // Return nothing if no profile is selected

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>X</button>
        <h3>Location of {profile.name}</h3>
        <div className="map-container">
          <LoadScript googleMapsApiKey="AIzaSyCM7krGiqhaXAVhFJodNI9q8ctAu3Bpt-s">
            <GoogleMap
              id="map"
              mapContainerStyle={{ width: '100%', height: '400px' }}
              zoom={12}
              center={{ lat: profile.lat, lng: profile.lng }}
            >
              <Marker position={{ lat: profile.lat, lng: profile.lng }} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedLocationProfile, setSelectedLocationProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('profiles');
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProfiles([
        {
          id: 1,
          name: 'John Doe',
          description: 'Software Engineer',
          photo: 'https://img.freepik.com/free-photo/young-woman-wearing-striped-shirt-eyeglasses_273609-13226.jpg?t=st=1731593834~exp=1731597434~hmac=262ba9ddba2af649f947deb479b983bb28cefbe77b6b25aa07bfa4dfaade6e7f&w=1060',
          location: 'San Francisco, CA',
          lat: 37.7749,
          lng: -122.4194,
          contact: 'john.doe@email.com',
          interests: ['Coding', 'Open Source', 'AI']
        },
        {
          id: 2,
          name: 'Jane Smith',
          description: 'Graphic Designer',
          photo: 'https://img.freepik.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses_176420-13176.jpg?t=st=1731596933~exp=1731600533~hmac=a632f2106e40a469b703a908e1ffbb9ace888353dff05f884ee888f0a83f33c4&w=1060',
          location: 'Los Angeles, CA',
          lat: 34.0522,
          lng: -118.2437,
          contact: 'jane.smith@email.com',
          interests: ['Design', 'Photography', 'Travel']
        },
        {
          id: 3,
          name: 'Michael Brown',
          description: 'Product Manager',
          photo: 'https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg?t=st=1731596994~exp=1731600594~hmac=ebe1da51ecf9f830dc1edd2bd90a445d733be2967b73c74bdb5e16356376516b&w=740',
          location: 'Chicago, IL',
          lat: 41.8781,
          lng: -87.6298,
          contact: 'michael.brown@email.com',
          interests: ['Leadership', 'Technology', 'Product Strategy']
        },
        {
          id: 4,
          name: 'Alice Johnson',
          description: 'Marketing Specialist',
          photo: 'https://img.freepik.com/free-photo/close-up-outdoor-portrait-attractive-young-european-woman-with-stylish-bob-haircut-spending-time-wild-nature-having-happy-carefree-facial-expression-enjoying-vacations-some-tropical-country_343059-297.jpg?t=st=1731671546~exp=1731675146~hmac=75ed32fc80a255ff50705973c8651d586e3f325bd8397a5dfd043a1f9dc8d98e&w=1060',
          location: 'New York, NY',
          lat: 40.7128,
          lng: -74.0060,
          contact: 'alice.johnson@email.com',
          interests: ['Marketing', 'Social Media', 'Branding']
        },
        {
          id: 5,
          name: 'Chris Lee',
          description: 'Data Scientist',
          photo: 'https://img.freepik.com/free-photo/portrait-confident-young-man_1262-3339.jpg',
          location: 'Seattle, WA',
          lat: 47.6062,
          lng: -122.3321,
          contact: 'chris.lee@email.com',
          interests: ['Data Science', 'Machine Learning', 'Big Data']
        },
        {
          id: 6,
          name: 'Emily Clark',
          description: 'UX Designer',
          photo: 'https://img.freepik.com/free-photo/young-woman-posing-white-background_273609-11671.jpg',
          location: 'Austin, TX',
          lat: 30.2672,
          lng: -97.7431,
          contact: 'emily.clark@email.com',
          interests: ['User Experience', 'Prototyping', 'Research']
        },
        {
          id: 7,
          name: 'Tom Harris',
          description: 'Full Stack Developer',
          photo: 'https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg?t=st=1731671583~exp=1731675183~hmac=ceff1b7970ef9cd04f7cf24ca67f5efe6aed7bca4d9c2914289166ee6dbc155c&w=996',
          location: 'Dallas, TX',
          lat: 32.7767,
          lng: -96.7970,
          contact: 'tom.harris@email.com',
          interests: ['React.js', 'Node.js', 'Cloud Computing']
        },
        {
          id: 8,
          name: 'Sophia Adams',
          description: 'Content Writer',
          photo: 'https://img.freepik.com/free-photo/portrait-beautiful-woman-smiling-outdoor_1150-10628.jpg',
          location: 'Miami, FL',
          lat: 25.7617,
          lng: -80.1918,
          contact: 'sophia.adams@email.com',
          interests: ['Writing', 'Blogging', 'Reading']
        }
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
    profile.location.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile); // Show profile details modal
    setSelectedLocationProfile(null); // Ensure map modal is hidden
  };

  const handleLocationClick = (profile) => {
    setSelectedLocationProfile(profile); // Show map modal
    setSelectedProfile(null); // Ensure profile modal is hidden
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
  };

  return (
    <div className="App">
      <h1>Your Profile, Your Schedule: Organize with Ease</h1>

      <div className="toggle-buttons">
        <button
          className={activeSection === 'admin' ? 'active' : ''}
          onClick={() => setActiveSection('admin')}
        >
          Admin Panel
        </button>
        <button
          className={activeSection === 'profiles' ? 'active' : ''}
          onClick={() => setActiveSection('profiles')}
        >
          Profile List
        </button>
      </div>

      {activeSection === 'admin' ? (
        <AdminPanel profiles={profiles} setProfiles={setProfiles} />
      ) : (
        <>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search profiles by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={clearSearch} className="clear-search-btn">
                Clear
              </button>
            )}
          </div>

          {loading && (
            <div className="loading-indicator">
              <ClipLoader color={"#36d7b7"} loading={loading} size={50} />
              <p>Loading profiles...</p>
            </div>
          )}

          {!loading && (
            <>
              <ProfileList
                profiles={filteredProfiles}
                handleLocationClick={handleLocationClick}
                handleProfileClick={handleProfileClick}
              />
            </>
          )}

          {selectedProfile && (
            <ProfileModal
              profile={selectedProfile}
              onClose={() => setSelectedProfile(null)}
              onLocationClick={handleLocationClick}
            />
          )}

          {selectedLocationProfile && (
            <MapModal profile={selectedLocationProfile} onClose={() => setSelectedLocationProfile(null)} />
          )}
        </>
      )}
    </div>
  );
};

export default App;





