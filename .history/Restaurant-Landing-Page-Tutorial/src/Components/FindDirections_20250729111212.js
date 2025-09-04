import React, { useState } from 'react';
import {GoogleMapReact} from 'google-map-react';

  const Marker = ({ children, lat, lng }) => {
  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${lng}px, ${lat}px)`,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'red',
      }}
    >
      {children}
    </div>
  );
};

const MapComponent = () => {
  const center = { lat: 37.7749, lng: -122.4194 };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'YOUR_API_KEY' }}
      defaultCenter={center}
      defaultZoom={11}
    >
      <Marker lat={37.7749} lng={-122.4194}>
        <div>Marker 1</div>
      </Marker>
      <Marker lat={37.7859} lng={-122.4364}>
        <div>Marker 2</div>
      </Marker>
    </GoogleMapReact>
  );
};


const FindDirections = () => {
  const [origin, setOrigin] = useState('201 Aquatic Cir, Cumming, GA 30040');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleGetDirections = () => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=YOUR_API_KEY`;
    fetch(url)
      .then(response => response.json())
      .then(data => setDirections(data));
  };


  return (
    <div>
      <h2>Find Directions</h2>
      <input type="text" value={destination} onChange={handleDestinationChange} placeholder="Enter your address" />
      <button onClick={handleGetDirections}>Get Directions</button>
      {directions && (
        <div>
          <h3>Directions</h3>
          <ul>
            {directions.routes[0].legs[0].steps.map((step, index) => (
              <li key={index}>{step.instructions}</li>
            ))}
          </ul>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'YOUR_API_KEY' }}
            defaultCenter={{ lat: directions.routes[0].legs[0].start_location.lat, lng: directions.routes[0].legs[0].start_location.lng }}
            defaultZoom={12}
          >
            <Marker
              lat={directions.routes[0].legs[0].start_location.lat}
              lng={directions.routes[0].legs[0].start_location.lng}
              text="Start"
            />
            <Marker
              lat={directions.routes[0].legs[0].end_location.lat}
              lng={directions.routes[0].legs[0].end_location.lng}
              text="End"
            />
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
};

export default FindDirections;