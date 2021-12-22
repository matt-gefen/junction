import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useRef, useCallback } from 'react'
import MapGL, {GeolocateControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import MAP_STYLE from './MapStyle.json';
import styles from './LocationSearch.module.css'

// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWdlZmVuIiwiYSI6ImNreGduZzBidjBoZzQydm1sNzducGJ2azgifQ.inJ-UIK78Vd7VGc91RiRug'

const geolocateStyle = {
  top: 0,
  left: 0,
  margin: 10
};
const positionOptions = {enableHighAccuracy: true};

const LocationSearch = (props) => {
  // const [searchResult, setSearchResult] = useState()
  const [resultLatLong, setResultLatLong] = useState()
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: 96,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );

  const onResult = (results) => {
    console.log(results.result.place_name)
    props.setLocation(results.result.place_name)
    setResultLatLong(results.result.geometry.coordinates)
  }

  return (
    <div className={styles.mapContainer}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="50%"
        height="50%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={positionOptions}
          trackUserLocation
          showUserLocation={false}
          auto
        />
        <Geocoder
          mapRef={mapRef}
          proximity={{longitude: viewport.longitude, latitude: viewport.latitude}}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          width="100%"
          onResult={onResult}
          marker={true}
        />
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
        >
          <p style={{fontSize:"20px"}}>📌</p>
        </Marker>
      </MapGL>
    </div>
  );
};

export default LocationSearch