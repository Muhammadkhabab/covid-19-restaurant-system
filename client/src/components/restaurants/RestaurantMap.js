/* istanbul ignore file */

import { React, Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const styling = {
  width: '100%',
  height: '394px'
};

// the default center is the capitol in Madison
const capitolCenter = {
  lat: 43.074699,
  lng: -89.384171
};

class RestaurantMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userLocation: null,
      restLocation: null,
    }
  }

  componentDidMount() {
    this.updateMap();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.addr!==prevProps.addr) {
      this.updateMap();
    }
  } 

  async updateMap() {
    let currentComponent = this;

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "denied") {
            // can show message on how to turn on location
            currentComponent.setState({
              userLocation: null
            });
          } else {
            navigator.geolocation.getCurrentPosition(function(position) {
              currentComponent.setState({
                userLocation: new window.google.maps.LatLng(position.coords.latitude,position.coords.longitude)
              });
            });
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: this.props.addr }, (results, status) => {
      if (status === "OK") {
        this.setState({
          restLocation: new window.google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng())
        });
      } else {
        this.setState({
          restLocation: null
        });
      }
    });

  }

  render() {
    return (
      <Map
        id='map'
        google={window.google}
        zoom={12}
        style={styling}
        center={new window.google.maps.LatLng(capitolCenter)}
      >
        { this.state.restLocation ? <Marker
                                      label={this.props.restName}
                                      position={this.state.restLocation}
                                    /> : <></> }
        { this.state.userLocation ? <Marker
                                      label={'You'}
                                      position={this.state.userLocation}
                                    /> : <></> }
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBvofUxqoCcatToPg3pJqZzQrUXdQ6vjow'
})(RestaurantMap);
