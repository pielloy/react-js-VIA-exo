import React from 'react';
import {Alert,Platform,StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps'

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
    latitude: 55.9371,
    latitudeDelta: 12.2086,
    longitude: 25.5701,
    longitudeDelta: 13.8778,
}

class MyMapView extends React.Component {

  map = null;

  state = {
    region: {
        latitude: 55.9371,
        latitudeDelta: 12.2086,
        longitude: 25.5701,
        longitudeDelta: 13.8778,
    },
    ready: true,
    filteredMarkers: [],
    hesburger_pos: []
  };

  setRegion(region) {
    if(this.state.ready) {
      //setTimeout(() => this.map.mapview.animateToRegion(region), 10);
    }
    //this.setState({ region });
  }

  componentDidMount() {
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.setRegion(region);
        },
        (error) => {
          //TODO: better design
          switch (error.code) {
            case 1:
              if (Platform.OS === "ios") {
                Alert.alert("", "To locate your location, enable permission for the application in Settings - Privacy - Location");
              } else {
                Alert.alert("", "To locate your location enable permission for the application in Settings - Apps - ExampleApp - Location");
              }
              break;
            default:
              Alert.alert("", "Error detecting your location");
          }
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
  };

  onMapReady = (e) => {
    if(!this.state.ready) {
      this.setState({ready: true});
    }


    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=57.516570, 25.330441&radius=100000&type=restaurant&keyword=hesburger&key=Put your API key here')
      .then(response => response.json())
      .then(responseJson => {
        responseJson.results.forEach(element => {
          this.state.hesburger_pos.push({Location: {latitude:  element.geometry.location.lat, longitude:  element.geometry.location.lng}, Name: element.name});
        });
        console.log('FORCE UPDATE !')
        this.forceUpdate();
      })
      .catch(error => { 
        console.error(error);
      });
  };

  onRegionChange = (region) => {
  };

  onRegionChangeComplete = (region) => {
  };

  render() {

    const { region } = this.state;
    const { children } = this.props;

    let markers = [];

    let i = 0;

    this.state.hesburger_pos.forEach((element) => {
      markers.push(<Marker key={i} coordinate={element.Location} title={element.Name}/>);
      i++;
    });

    return (
      <MapView
        showsUserLocation
        ref={ map => { this.map = map }}
        initialRegion={initialRegion}
        onMapReady={this.onMapReady}
        showsMyLocationButton={false}
        onRegionChange={this.onRegionChange}
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={StyleSheet.absoluteFill} 
        textStyle={{ color: '#bc8b00' }}
        containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}>

        {markers}

      </MapView>
    );
  }
}

export default MyMapView;