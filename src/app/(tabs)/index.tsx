import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';

export default function HomeScreen() {
  const markers = [
    {
      latlng: {
        latitude: -1.2119,
        longitude: 36.8888,
      },
      title: 'Marker 1',
      description: 'This is a marker',
    },
    {
      latlng: {
        latitude: -1.2119,
        longitude: 36.8888,
      },
      title: 'Marker 2',
      description: 'This is a marker',
    },
    {
      latlng: {
        latitude: -1.2119,
        longitude: 36.8888,
      },
      title: 'Marker 3',
      description: 'This is a marker',
    },
  ];
  const onRegionChange = (region) => {
    console.log(region);
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        mapType='hybrid'
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: -1.2119,
          longitude: 36.8888,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
