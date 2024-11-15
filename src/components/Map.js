// src/components/Map.js
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const Map = ({ location }) => {
  const center = location || { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
