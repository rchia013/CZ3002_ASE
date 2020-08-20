import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./onemap.css";

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM5NjIsInVzZXJfaWQiOjM5NjIsImVtYWlsIjoiYW5kcmV3d2VlOTdAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNTgyNDczNjM1LCJleHAiOjE1ODI5MDU2MzUsIm5iZiI6MTU4MjQ3MzYzNSwianRpIjoiZTE0NzhmNmVkYjRlOTdhNmQ1YmU3MWIyOTVlOTVmZTAifQ.8d157AOdoOAhmFvh68u_7UiiwUwcFpGqsCAVlKpHttc
// Possible themes
/*
{
      "THEMENAME": "Recycling Bins",
      "QUERYNAME": "recyclingbins",
      "ICON": "recycle1a.jpg"
    },
    {
      "THEMENAME": "Cash For Trash",
      "QUERYNAME": "cashfortrash",
      "ICON": "cash for trash.jpg"
    },
    {
      "THEMENAME": "E-waste Recycling",
      "QUERYNAME": "ewaste",
      "ICON": "ewaste.jpg"
    },

*/

// var basemap = L.tileLayer(
//   "https://maps-{s}.onemap.sg/v3/Original/{z}/{x}/{y}.png",
//   {
//     detectRetina: true,
//     maxZoom: 18,
//     minZoom: 11,
//     //Do not remove this attribution
//     attribution:
//       '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
//   }
// );

var myIcon = L.icon({
  iconUrl: require("./marker-icon.png"),
  iconSize: [41, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

class Onemap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
      zoom: 16.5
      // bins: {}
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.ThemeDetails = this.ThemeDetails.bind(this);
  }

  // This is for Onemap Theme API, updates bins in state
  ThemeDetails() {
    fetch(
      "https://developers.onemap.sg/privateapi/themesvc/retrieveTheme?queryName=recyclingbins&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM5NjIsInVzZXJfaWQiOjM5NjIsImVtYWlsIjoiYW5kcmV3d2VlOTdAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNTgyNDczNjM1LCJleHAiOjE1ODI5MDU2MzUsIm5iZiI6MTU4MjQ3MzYzNSwianRpIjoiZTE0NzhmNmVkYjRlOTdhNmQ1YmU3MWIyOTVlOTVmZTAifQ.8d157AOdoOAhmFvh68u_7UiiwUwcFpGqsCAVlKpHttc"
    ).then(res => res.json());
    // .then(result => {
    //   this.setState({
    //     bins: result.SrchResults
    //   });
    // });
  }

  // componentDidMount() {
  //   this.ThemeDetails();
  // }

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

  render() {
    this.getLocation();
    const position = [this.state.lat, this.state.lng];

    // Locations of bins can be seen through console log
    // Need to clean up data before markers can be placed, may be too many though :)
    // Also need to figure out how to filter on the map
    console.log(this.state.bins);

    return (
      <div>
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
            url="https://maps-{s}.onemap.sg/v3/Original/{z}/{x}/{y}.png"
          />

          {/*
                -- This is the original leafletjs version of map, just for reference --
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />*/}

          <Marker position={position} icon={myIcon}>
            <Popup>
              You are here! <br /> Location done by HTML5 geolocation, may not
              be accurate
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default Onemap;
