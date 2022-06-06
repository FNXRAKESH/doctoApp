import React, { useState } from 'react';
import { Text, Image, StyleSheet, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



const LocationInput = (props) => {
  const [fromLat, setFromLat] = useState(0);
  const [fromLong, setFromLong] = useState(0);
  return (
    <GooglePlacesAutocomplete
      placeholder="Location"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      renderDescription={(row) => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(details.formatted_address);
        props.docAddress(
          details.geometry.location.lat,
          details.geometry.location.lng,
          details.formatted_address
        );
        // setFromLat(details.geometry.location.lat)
        // setFromLong(details.geometry.location.lng)
      }}
      textInputProps={{ onBlur: () => {} }}
      getDefaultValue={() => ''}
      enablePoweredByContainer={false}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'Googel API key 2',
        language: 'en' // language of the results
      }}
      styles={{
        textInput: {
          fontSize: 18,
          paddingLeft: 15,
              backgroundColor: 'transparent',
          color:"#000"
        },
       
      }}
      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3'
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
    />
  );
};

export default LocationInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
