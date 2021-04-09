import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const styling = {
  width: '100%',
  height: '100%'
};

// capitol building to center map if address not found
const defaultCenter = {
  lat: 43.074699,
  lng: -89.384171
};

/* Map in restaurant info page */
function RestaurantMap(props) {
  
  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBvofUxqoCcatToPg3pJqZzQrUXdQ6vjow"
  })

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: props.addr }, (results, status) => {
      map.setZoom(15);
      if (status === "OK") {
        map.setCenter(results[0].geometry.location);
        new window.google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        map.setCenter(defaultCenter);
      }
    });

    setMap(map)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={styling}
      onLoad={onLoad}
    >
    </GoogleMap>
  ) : <></>
};

export default React.memo(RestaurantMap)
