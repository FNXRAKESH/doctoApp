import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Keyboard,

  ScrollView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import LocationInput from './LocationInput';
import { LinearGradient } from 'expo-linear-gradient';
import email from 'react-native-email';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ReferDoctor = (props) => {
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('Select Speciality');
  const [profileLink, setProfileLink] = useState('');

  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [address, setAddress] = useState('');
  const [speciailtyModal, setSpecialityModal] = useState(false);

  const docAddress = (lat, long, Address) => {
    setLat(lat);
    setLong(long);
    setAddress(Address);
  };
  const handleEmail = () => {
    const to = ['rakeshrajan8484@gmail.com']; // string or array of email addresses
    email(to, {
      // Optional additional arguments
    //   cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
    //   bcc: 'mee@mee.com', // string or array of email addresses
        body: `${name} 
      ${address} 
      ${speciality}`,
      subject: 'Refer a Doctor'
    }).catch(console.error);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 20
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Dashboard')}
        >
          <FontAwesomeIcon icon={faArrowLeft} color={'#000'} />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 20, color: '#000', fontSize: 20, flex: 1 }}>
          Refer a Doctor
        </Text>
      </View>
      <ScrollView keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Text
            style={{ paddingHorizontal: 20, fontSize: 20, paddingVertical: 30 }}
          >
            Help others. Refer to a Doctor you already know.
          </Text>
        </TouchableWithoutFeedback>
        <View style={styles.forms}>
          <View style={styles.InputContainer}>
            <TextInput
              placeholder="Doctor's Name"
              style={styles.textInput}
              placeholderTextColor="#0A213E"
              value={name}
              onChangeText={(e) => {
                setName(e);
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.InputContainer}
            onPress={() => setSpecialityModal(true)}
          >
            <Text style={styles.textInput}>{speciality}</Text>
            <FontAwesomeIcon icon={faChevronDown} color={'#000'} />
          </TouchableOpacity>
          <View style={styles.LocationContainer}>
            <LocationInput docAddress={docAddress} />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              placeholder="Profile Link"
              style={styles.textInput}
              placeholderTextColor="#0A213E"
              value={profileLink}
              onChangeText={(e) => {
                setProfileLink(e);
              }}
            />
          </View>
          <TouchableOpacity onPress={() => handleEmail()}>
            <LinearGradient
              colors={['#5F82E2', '#4A6BC5']}
              style={styles.button}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >
                Submit
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={speciailtyModal}
        onRequestClose={() => {
          setSpecialityModal(!speciailtyModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setSpeciality('General Physician');
                setSpecialityModal(false);
              }}
            >
              <Text style={styles.modalText}>General Physician</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSpeciality('Pediatrician');
                setSpecialityModal(false);
              }}
            >
              <Text style={styles.modalText}>Pediatrician</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSpeciality('Cardiology ');
                setSpecialityModal(false);
              }}
            >
              <Text style={styles.modalText}>Cardiology </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSpeciality('Dermatologists ');
                setSpecialityModal(false);
              }}
            >
              <Text style={styles.modalText}>Dermatologists </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSpeciality('Gynecologists ');
                setSpecialityModal(false);
              }}
            >
              <Text style={styles.modalText}>Gynecologists </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSpeciality('Urologists ');
                setSpecialityModal(false);
              }}
            >
              <Text style={styles.modalText}>Urologists </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSpeciality('Endocrinologists ');
                setSpecialityModal(false);
              }}
            >
              <Text style={styles.modalText}>Endocrinologists </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSpeciality('Others ');
                setSpecialityModal(false);
              }}
            >
              <Text style={styles.modalText}>Not in list</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReferDoctor;

const styles = StyleSheet.create({
  forms: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  button: {
    backgroundColor: '#1AC29A',
    marginHorizontal: 20,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical:15
  },
  InputContainer: {
    backgroundColor: '#F8F8F8',
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 20,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  LocationContainer: {
    backgroundColor: '#F8F8F8',
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  textInput: {
    fontSize: 18,
    paddingLeft: 15,
    borderRadius: 10,
    flex: 1
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
    fontSize: 20
  }
});
