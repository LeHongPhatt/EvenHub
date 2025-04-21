// import { View, Text } from 'react-native'
// import React from 'react'

// const AddNewScreen = () => {
//   return (
//     <View>
//       <Text>AddNewScreen</Text>
//     </View>
//   )
// }

// export default AddNewScreen
import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import axios from 'axios';

const MAPTILER_API_KEY = 'Jrlhhj7qCFmgMDtQKR3C'; // Thay bằng API Key của bạn
const OPENCAGE_API_KEY = '6e757cf97f9c47f2a530ea7fcbc53050'; // Thay bằng API Key OpenCage của bạn

MapLibreGL.setAccessToken(null); // MapLibre không cần token

const AddNewScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 21.0285,
    longitude: 105.8542,
  });

  const handleSearch = async text => {
    setSearchQuery(text);
    if (text.length > 2) {
      try {
        const res = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json`,
          {
            params: {
              q: text,
              key: OPENCAGE_API_KEY,
              limit: 5,
            },
          },
        );
        setSearchResults(res.data.results);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectLocation = location => {
    const {lat, lng} = location.geometry;
    setSelectedLocation({latitude: lat, longitude: lng});
    setSearchQuery(location.formatted);
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tìm địa điểm..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleSelectLocation(item)}
            style={styles.item}>
            <Text>{item.formatted}</Text>
          </TouchableOpacity>
        )}
      />
      <MapLibreGL.MapView
        style={styles.map}
        styleURL={`https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`}>
        <MapLibreGL.Camera
          centerCoordinate={[
            selectedLocation.longitude,
            selectedLocation.latitude,
          ]}
          zoomLevel={14}
        />
        <MapLibreGL.PointAnnotation
          coordinate={[selectedLocation.longitude, selectedLocation.latitude]}
        />
      </MapLibreGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
  input: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 1,
  },
});

export default AddNewScreen;
