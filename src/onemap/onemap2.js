import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "./onemap.css";
import ewastedata from "./e-waste-recycling-geojson.json";
// import "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

var myIcon = L.icon({
  iconUrl: require("./marker-icon.png"),
  iconSize: [41, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

class Onemap2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
      zoom: 16.5,
      ewaste: ewastedata
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.ThemeDetails = this.ThemeDetails.bind(this);
  }

  // OneMap Theme API
  ThemeDetails() {
    fetch(
      "https://developers.onemap.sg/privateapi/themesvc/retrieveTheme?queryName=recyclingbins&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM5NjIsInVzZXJfaWQiOjM5NjIsImVtYWlsIjoiYW5kcmV3d2VlOTdAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNTgyNDczNjM1LCJleHAiOjE1ODI5MDU2MzUsIm5iZiI6MTU4MjQ3MzYzNSwianRpIjoiZTE0NzhmNmVkYjRlOTdhNmQ1YmU3MWIyOTVlOTVmZTAifQ.8d157AOdoOAhmFvh68u_7UiiwUwcFpGqsCAVlKpHttc"
    ).then(res => res.json());
  }

  // These are for geolocation
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      console.log("Error");
    }
  }

  getCoordinates(position) {
    this.setState({
      lat: Number(position.coords.latitude),
      lng: Number(position.coords.longitude)
    });
  }

  //   componentWillMount() {
  //     fetch(require("./e-waste-recycling-geojson.json"))
  //       .then(response => response.json())
  //       .then(response =>
  //         this.setState({
  //           ewaste: response.data
  //         })
  //       );
  //   }

  render() {
    this.getLocation();
    const position = [this.state.lat, this.state.lng];
    // console.log(this.state.ewaste);
    return (
      <div>
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
            url="https://maps-{s}.onemap.sg/v3/Original/{z}/{x}/{y}.png"
          />
          <GeoJSON data={this.state.ewaste.features} />
          <Marker position={position} icon={myIcon}>
            <Popup>You are currently here!</Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default Onemap2;
