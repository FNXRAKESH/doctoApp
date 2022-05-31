import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Keyboard,
  Switch
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import {
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler';
import { Rating } from 'react-native-ratings';

const AddReview = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [checked, setChecked] = useState('yes');
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const Rate = (rate) => {
    setRating(rate);
  };
  const submitReview = () => {
    fetch(
      `http://157.245.105.212:9000/api/review/create/${props.route.params.docId}/${props.route.params.userId}`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.route.params.accessToken}`
        }),
        body: JSON.stringify({
          rating,
          comment
        })
      }
    )
      .then((response) => response.json())
      .then((data) => {
        props.navigation.goBack(null);
      });
  };
  return (
    <View style={{ flex: 1 }}>
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
          Add a Reivew
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Text
            style={{ paddingHorizontal: 20, fontSize: 20, paddingVertical: 30 }}
          >
            Help others. Refer to a Doctor you already know.
          </Text>
        </TouchableWithoutFeedback>
        <View style={styles.forms}>
          <Text style={{ paddingHorizontal: 20, fontSize: 20 }}>
            How many starts would you give this Doctor?
          </Text>
          <Rating onFinishRating={Rate} style={{ paddingVertical: 10 }} />
        </View>
        <View style={styles.forms}>
          <Text style={{ paddingHorizontal: 20, fontSize: 20 }}>
            Add your Comments (optional)
          </Text>
          <View style={styles.InputContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.textInput}
              placeholderTextColor="#0A213E"
              value={comment}
              onChangeText={(e) => {
                setComment(e);
              }}
            />
          </View>
        </View>
        <View style={styles.forms}>
          <Text style={{ padding: 10, fontSize: 20 }}>
            Would you Recommend this Doctor to your Contacts?
          </Text>
          <TouchableOpacity
            onPress={() => setChecked('Yes')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <RadioButton
              value="first"
              status={checked === 'Yes' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Yes')}
            />
            <Text style={{ padding: 10, fontSize: 20 }}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setChecked('No')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <RadioButton
              value="first"
              status={checked === 'No' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('No')}
            />
            <Text style={{ padding: 10, fontSize: 20 }}>No</Text>
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
            Show this Review to My Contacts Only
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => submitReview()}
        style={{ backgroundColor: '#fff' }}
      >
        <LinearGradient colors={['#5F82E2', '#4A6BC5']} style={styles.button}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff'
            }}
          >
            Submit Review
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  forms: {
    backgroundColor: '#fff',
    margin: 20,
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
    marginVertical: 15
  },
  InputContainer: {
    borderWidth: 0,
    borderRadius: 10,

    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#5F82E2',
    borderBottomWidth: 1
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
