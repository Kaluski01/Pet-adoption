import React, { useState, useEffect } from 'react';
import './search.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [map, setMap] = useState(null);
  const [petrolStations, setPetrolStations] = useState([]);
  const [platform, setPlatform] = useState(null);
  useEffect(() => {
    const loadHereMap = async () => {
      // Load HERE Maps API asynchronously
      const script = document.createElement('script');
      script.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js';
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        loadHereMapService();
      };

      document.body.appendChild(script);
    };

    const loadHereMapService = () => {
      const serviceScript = document.createElement('script');
      serviceScript.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js';
      serviceScript.type = 'text/javascript';
      serviceScript.async = true;

      serviceScript.onload = () => {
        initializeHereMap();
      };

      document.body.appendChild(serviceScript);
    };

    loadHereMap();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const initializeHereMap = () => {
    const platform = new window.H.service.Platform({
      apikey: 'TnHIcVRJUYrL7GD-t42NyF7FuRaunfqXoMeA609frFo'
    });
    setPlatform(platform);

    const defaultLayers = platform.createDefaultLayers();

    const hereMap = new window.H.Map(
      document.getElementById('map'),
      defaultLayers.vector.normal.map,
      {
        zoom: 12,
        center: { lat: 52.5228, lng: 13.4124 },
      }
    );

    setMap(hereMap);

    // Clean up the map when the component unmounts
    return () => {
      hereMap.dispose();
    };
  };

  const handleSearch = () => {
    if (map) {
      const discoverService = platform.getPlacesService();
  
      // Use Discover API to search for pet grooming and veterinary services around the entered location
      discoverService.discover({
        q: 'pet grooming, veterinary',
        at: `${map.getCenter().lat},${map.getCenter().lng}`,
      }, (result) => {
        if (result && result.items && result.items.length > 0) {
          const locations = result.items.map(item => ({
            position: item.position,
            title: item.title,
          }));
  
          // Set the locations data for display
          setPetrolStations(locations);
        } else {
          console.log('No results found.');
        }
      }, (error) => {
        console.error('Discover API request failed:', error);
      });
    }
  };
  

  // Function to add markers for petrol stations on the map
  useEffect(() => {
    const addPetrolStationMarkers = () => {
      petrolStations.forEach((petrolStation) => {
        const marker = new window.H.map.Marker(petrolStation.position);
        map.addObject(marker);
      });
    };

    // Update markers when petrolStations data changes
    addPetrolStationMarkers();
  }, [petrolStations, map]);

  return (
    <div className='search-area'>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>

      {/* Map container */}
      <div id="map" style={{ width: '100%', height: '400px', marginTop: '50px'}} />
    </div>
  );
}
