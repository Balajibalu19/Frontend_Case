import React, { useState, useEffect } from "react";
import './App.css';
import ProfileList from './components/ProfileList';
import AdminPanel from './components/AdminPanel';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { ClipLoader } from "react-spinners"; // Optional: Use this or similar spinner

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading profiles
  const [mapLoading, setMapLoading] = useState(false); // State to handle map loading
  const [mapVisible, setMapVisible] = useState(false);  // State to manage map visibility

  // Simulating data fetching for profiles with contact and interests
  useEffect(() => {
    setLoading(true); // Set loading to true when data is being fetched
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
          photo: 'https://img.freepik.com/free-photo/young-attractive-female-wearing-sunglasses-casual-style_273609-21616.jpg', 
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
          photo: 'https://img.freepik.com/free-photo/portrait-casual-young-man-smiling-confidently_1262-2919.jpg', 
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
      setLoading(false); // Set loading to false once the data is loaded
    }, 2000); // Simulate a 2-second delay for fetching data
  }, []);

  // Debounced search logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Debounced delay of 500ms

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filtered profiles based on the debounced search query
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
    profile.location.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const showLocationOnMap = (lat, lng) => {
    setMapLoading(true);
    setSelectedLocation({ lat, lng });
    setMapVisible(true);  // Show the map when location is clicked
    setSelectedProfile(null); // Hide profile details when showing map
    setMapLoading(false);
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile); // Set the selected profile for detailed view
    setMapVisible(false);  // Hide the map when a profile is clicked
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
  };

  return (
    <div className="App">
      <h1>Your Profile, Your Schedule: Organize with Ease</h1>

      {/* Search Bar */}
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

      {/* Loading indicator for profiles */}
      {loading && (
        <div className="loading-indicator">
          <ClipLoader color={"#36d7b7"} loading={loading} size={50} />
          <p>Loading profiles...</p>
        </div>
      )}

      {/* Admin Panel to manage profiles */}
      <AdminPanel profiles={profiles} setProfiles={setProfiles} />

      {/* Heading for Profile List */}
      {!loading && (
        <>
          <h2 className="profile-list-heading">Profile List</h2>

          {/* Profile List */}
          <ProfileList 
            profiles={filteredProfiles} 
            showLocationOnMap={showLocationOnMap} 
            handleProfileClick={handleProfileClick} 
          />
        </>
      )}

      {/* Show Map when mapVisible is true */}
      {mapVisible && (
        <div className="map-container">
          <LoadScript googleMapsApiKey="AIzaSyCM7krGiqhaXAVhFJodNI9q8ctAu3Bpt-s">
            <GoogleMap
              id="map"
              mapContainerStyle={{ width: '100%', height: '500px' }}
              zoom={10}
              center={selectedLocation}
            >
              <Marker position={selectedLocation} />
            </GoogleMap>
          </LoadScript>
        </div>
      )}

      {/* Profile Details for the selected profile */}
      {selectedProfile && (
        <div className="profile-details">
          <h3>{selectedProfile.name}</h3>
          <img src={selectedProfile.photo} alt={selectedProfile.name} />
          <p>{selectedProfile.description}</p>
          <p>Location: {selectedProfile.location}</p>
          <p>Contact: {selectedProfile.contact}</p>
          <p>Interests: {selectedProfile.interests.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default App;





