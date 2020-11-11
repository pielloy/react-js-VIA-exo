import React from 'react';
import {Alert,Platform,StyleSheet} from 'react-native';
import MapView from 'react-native-maps'

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
    filteredMarkers: []
  };

  setRegion(region) {
    if(this.state.ready) {
      //setTimeout(() => this.map.mapview.animateToRegion(region), 10);
    }
    //this.setState({ region });
  }

  componentDidMount() {
    console.log('Component did mount');
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
  };

  onRegionChange = (region) => {
    console.log('onRegionChange', region);
  };

  onRegionChangeComplete = (region) => {
    console.log('onRegionChangeComplete', region);
  };

  render() {

    const { region } = this.state;
    const { children } = this.props;

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

        {children && children || null}

      </MapView>
    );
  }
}

export default MyMapView;