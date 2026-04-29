import React, { useState, useEffect } from 'react';
import { FaTimes, FaCrosshairs, FaMapMarkerAlt } from 'react-icons/fa';

const LocationModal = ({ isOpen, onClose, onSelectLocation }) => {
  const [search, setSearch] = useState('');
  const [detectingLocation, setDetectingLocation] = useState(false);
  
  const popularCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Chandigarh', 'Goa', 'Coimbatore', 'Vizag', 'Nagpur'
  ];

  const filteredCities = popularCities.filter(city => 
    city.toLowerCase().includes(search.toLowerCase())
  );

  const handleCurrentLocation = () => {
    setDetectingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // You can reverse geocode here, but for now we'll show coordinates
          const locationName = `📍 (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
          onSelectLocation(locationName);
          setDetectingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enable location access or select a city.");
          setDetectingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setDetectingLocation(false);
    }
  };

  const handleCitySelect = (city) => {
    onSelectLocation(city);
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Select Delivery Location</h3>
          <FaTimes onClick={onClose} style={{ cursor: 'pointer', fontSize: '20px' }} />
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="modal-search"
            placeholder="Search for area, street or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          
          <button 
            className="current-loc"
            onClick={handleCurrentLocation}
            disabled={detectingLocation}
          >
            <FaCrosshairs /> 
            {detectingLocation ? 'Detecting your location...' : 'Use Current Location'}
          </button>
          
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
            <FaMapMarkerAlt style={{ display: 'inline', marginRight: '8px', color: '#ff5200' }} />
            Popular Cities
          </h4>
          
          <div className="city-buttons">
            {filteredCities.length > 0 ? (
              filteredCities.map(city => (
                <button
                  key={city}
                  className="city-btn"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </button>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#999', gridColumn: '1/-1' }}>
                No cities found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;