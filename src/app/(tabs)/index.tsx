import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View } from '../../components/Themed';
import { Comparable } from '../../types';

export default function HomeScreen() {
  const [mapType, setMapType] = useState<String>('roadmap');
  const [markers, setMarkers] = useState<Comparable[]>([])

  const getAllComparables = async() => {
    try {
      const response = await fetch('https://realhive.vercel.app/api/comparables')
      const data = await response.json()
      // console.log("Comparables Data: ",data)
      setMarkers(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllComparables()
  }, [])
  
  const onRegionChange = (region) => {
    console.log(region);
  };
  const changeMapType = () => {
    console.log(mapType)
    if(mapType === 'roadmap'){
      setMapType('hybrid');
    }else{
      setMapType('roadmap');
    }    
  }

  return (
    <View style={styles.container}> 
      <TouchableOpacity onPress={changeMapType} style={styles.mapToggleButton}>
        <FontAwesome name="map" size={30} color="royalblue" />
      </TouchableOpacity> 
      <MapView 
        style={styles.map} 
        mapType={mapType}
        onRegionChange={onRegionChange}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
          latitude: -1.2119,
          longitude: 36.8888,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker, index) => (
          <Marker style={styles.marker}
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            pinColor="red"
            // image={marker.image}
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
    position: "relative"
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapToggleButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  },
  marker: {
    width: 50,
    height:50  
  }
});
