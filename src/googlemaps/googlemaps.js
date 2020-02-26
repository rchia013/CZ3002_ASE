import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '80%',
    height: '80%'
  };


export class MapContainer extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            activeMarker: {},
            selectedPlace:{},
            showingInfoWindow: false,
            lat: '',
            long: ''
        }
        this.getLocation = this.getLocation.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this)
    }
      

    getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates)
        }
        else{
            console.log("Error")
        }
    }


    getCoordinates(position){
        this.setState({
            lat: Number(position.coords.latitude),
            lng: Number(position.coords.longitude)
        })
    }

    handleLocationError(error){
        switch(error.code) {
            case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
            case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
            case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
            case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
        }
    }



  render() {
    // Gets and udpates current coordinates based on HTML5 Geolocation  
    this.getLocation()

    // Stores coordinates in object currentCoordinates
    var currentCoordinates = {lat: this.state.lat, lng: this.state.lng}

    return (
      <div>
            <p>Lat: {this.state.lat}</p>
            <p>Long: {this.state.lng}</p>
            <Map
                google={this.props.google}
                zoom={18}
                style={mapStyles}
                center={currentCoordinates}
            >
                <Marker 
                    title={'You are here!'}
                    name={'Current Location'}
                    position={currentCoordinates}
                />
                
            </Map>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAwBgI9uqnUAlslEI-48KZbaer7Ih0EUjw'
})(MapContainer);