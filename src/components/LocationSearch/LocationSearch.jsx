import React, { useRef, useEffect, useState } from 'react'

import styles from './LocationSearch.module.css'

import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoibWdlZmVuIiwiYSI6ImNreGduZzBidjBoZzQydm1sNzducGJ2azgifQ.inJ-UIK78Vd7VGc91RiRug'

const LocationSearch = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-98.56);
  const [lat, setLat] = useState(39.66);
  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if ("geolocation" in navigator) { 
      navigator.geolocation.getCurrentPosition(position => { 
          map.current = new mapboxgl.Map({
          // container id specified in the HTML
            container: mapContainer.current,
  
             // style URL
            style: 'mapbox://styles/mapbox/streets-v11',
  
           // initial position in [lon, lat] format
            center: [position.coords.longitude, position.coords.latitude],
  
           // initial zoom
          zoom: 8
          });
      }); 
  } else {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  }})

  return (
    <div>
    <div ref={mapContainer} className={styles.mapContainer} />
    </div>
    );

}

export default LocationSearch