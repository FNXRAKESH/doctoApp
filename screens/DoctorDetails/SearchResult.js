import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowRight,
  faSearch,
  faMapMarker
} from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
let latlong;
const SearchResult = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [searchName, setSearchName] = useState(props.route.params.searchText);
  const [doctors, setDoctors] = useState([]);
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      setLocation(undefined);
    } else {
      setLocation(latlong.coords);
    }
  };
  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    } else {
      latlong = await Location.getCurrentPositionAsync({});
      setLocation(latlong.coords);
    }
  };
  const searchDoctor = async () => {
    console.log('location.latitude', location);
    if (location !== undefined) {
      await fetch(`http://157.245.105.212:9000/api/doctors/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.route.params.accessToken}`
        },
        body: JSON.stringify({
          query: searchName,
          coordinates: [location.latitude, location.longitude]
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data ', data);
          setDoctors(data);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    } else {
      console.log('else ', location);
      await fetch(`http://157.245.105.212:9000/api/doctors/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.route.params.accessToken}`
        },
        body: JSON.stringify({
          query: searchName
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data ', data);
          setDoctors(data);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    searchDoctor();
  }, [location]);
  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <FontAwesomeIcon icon={faSearch} size={16} />
        <TextInput
          placeholder="Search by Name or Specialities"
          style={styles.textInput}
          placeholderTextColor="#b5b5b5"
          value={searchName}
          onChangeText={(e) => {
            setSearchName(e);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setSearchName(searchName);
            searchDoctor();
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} size={16} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 15,
          justifyContent: 'space-around'
        }}
      >
        <View>
          <Switch
            trackColor={{ false: '#767577', true: '#66c263' }}
            thumbColor={isEnabled ? '#219e1c' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 20,
            flex: 1
          }}
        >
          Filter by location
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {doctors &&
          doctors.map((doctor, index) => {
            return (
              <View key={index} style={styles.doctorCard}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 15
                  }}
                >
                  <Image source={require('../../assets/images/doctor.png')} />
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={{ fontSize: 22 }}>Dr. {doctor.name}</Text>
                    <Text style={{ fontSize: 18, paddingVertical: 5 }}>
                      {doctor.speciality}
                    </Text>
                    <Image
                      source={require('../../assets/images/ratings.png')}
                    />
                  </View>
                </View>
                <View style={styles.line} />
                <Text style={{ paddingVertical: 10, color: '#5F82E2' }}>
                  Recommended by 7 Contacts
                </Text>
                <TouchableOpacity>
                  <LinearGradient
                    colors={['#5F82E2', '#4A6BC5']}
                    style={styles.button}
                  >
                    <FontAwesomeIcon
                      icon={faMapMarker}
                      color={'#fff'}
                      size={20}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#fff',
                        paddingLeft: 10,
                        flex: 1
                      }}
                    >
                      Get Direction
                    </Text>
                    <Text style={{ color: '#f5f5f5', fontSize: 16 }}>
                      3.2km
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  InputContainer: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 15,
    padding: 20,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  textInput: {
    fontSize: 18,
    paddingLeft: 15,
    flex: 1
  },
  doctorCard: {
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10
  },
  button: {
    backgroundColor: '#1AC29A',
    marginVertical: 10,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    borderWidth: 1,
    borderColor: '#f5f5f5'
  }
});
