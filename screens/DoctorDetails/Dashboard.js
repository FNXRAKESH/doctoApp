import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowRight,
  faSearch,
  faSortDown,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { SharedElement } from 'react-navigation-shared-element';

const Dashboard = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [specialities, setSpecialities] = useState('Select a Speciality');
  const [specialityDoctors, setSpecialityDoctors] = useState([]);
  const [searchText, setSearchText] = useState('');
 

  useEffect(() => {
    fetch('http://157.245.105.212:9000/api/doctors')
      .then((response) => response.json())
      .then((data) => {
        // console.log('data ', data);
        setSpecialityDoctors(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

 

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1
        }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          start={[0, 0]}
          end={[1, 1]}
          colors={['#819EEC', '#5F82E2']}
          style={styles.button}
        >
          <View
            style={{
              paddingHorizontal: 15,
              paddingTop: 50,
              position: 'relative'
            }}
          >
            <View style={styles.topImage}>
              <Image source={require('../../assets/images/dashboard.png')} />
            </View>
            <Text style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>
              Find Nearby
            </Text>
            <Text style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>
              Doctors &amp; Clinics
            </Text>
            <View style={styles.InputContainer}>
              <FontAwesomeIcon icon={faSearch} size={16} />
              <TextInput
                placeholder="Search by Name"
                style={styles.textInput}
                placeholderTextColor="#b5b5b5"
                value={searchText}
                onChangeText={(e) => {
                  // searchName(e);
                  setSearchText(e);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('SearchResult', {
                    searchText
                  })
                  setSearchText('');
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} size={16} />
              </TouchableOpacity>
            </View>

            
          </View>
        </LinearGradient>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            Find Doctors by Specialities
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 15,
              marginVertical: 30
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ flex: 1, fontSize: 20 }}>{specialities}</Text>
            <FontAwesomeIcon icon={faSortDown} />
          </TouchableOpacity>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {specialityDoctors.map((doctor, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    props.navigation.navigate('DoctorDetails', {
                      doctor,
                      index,
                      id: doctor._id
                    })
                  }
                  key={index}
                  style={styles.doctorCard}
                >
                  {doctor.speciality === 'Surgeon' ? (
                    <SharedElement id={`${doctor._id}.${index}`}>
                      <Image
                        source={require('../../assets/images/doc1.png')}
                        resizeMode="contain"
                      />
                    </SharedElement>
                  ) : (
                    <SharedElement id={`${doctor._id}.${index}`}>
                      <Image
                        source={require('../../assets/images/doc2.png')}
                        resizeMode="contain"
                      />
                    </SharedElement>
                  )}
                  <View style={{ padding: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      Dr. {doctor.name}
                    </Text>

                    <Text>{doctor.speciality}</Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 10
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        color={'#ED8A19'}
                        size={20}
                      />
                      <Text
                        style={{
                          paddingLeft: 10,
                          color: '#ED8A19',
                          fontSize: 18
                        }}
                      >
                        {doctor.rating}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Animated.ScrollView>
        </View>
        <View style={{ padding: 15, backgroundColor: '#fff' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 20
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold', flexGrow: 1 }}>
              Highest Rated Doctors
            </Text>
            <TouchableOpacity>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {specialityDoctors.map((doctor, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    props.navigation.navigate('DoctorDetails', {
                      doctor,
                      index
                    })
                  }
                  key={index}
                  style={styles.doctorCard}
                >
                  {doctor.speciality === 'Surgeon' ? (
                    <Image
                      source={require('../../assets/images/doc1.png')}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/doc2.png')}
                      resizeMode="contain"
                    />
                  )}
                  <View style={{ padding: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      Dr. {doctor.name}
                    </Text>
                    <Text>{doctor.speciality}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 10
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        color={'#ED8A19'}
                        size={20}
                      />
                      <Text
                        style={{
                          paddingLeft: 10,
                          color: '#ED8A19',
                          fontSize: 18
                        }}
                      >
                        {doctor.rating}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setSpecialities('Surgeon');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Surgeon</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSpecialities('Gastroenterologists');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Gastroenterologists</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSpecialities('Cardiologists');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Cardiologists</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSpecialities('Oncologists');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Oncologists</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSpecialities('Neurologists');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Neurologists</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  InputContainer: {
    backgroundColor: '#F8F8F8',
    borderWidth: 0,
    borderRadius: 15,
    padding: 20,
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  textInput: {
    fontSize: 18,
    paddingLeft: 15,
    flex: 1
  },
  topImage: {
    position: 'absolute',
    right: -50,
    top: 60
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18
  },
  doctorCard: {
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    position: 'relative'
  }
});
