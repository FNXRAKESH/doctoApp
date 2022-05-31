import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Switch,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faChevronRight,
  faInfo,
  faQuestion,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';

const Setting = (props) => {
  const [showReviewEnabled, setShowReviewEnabled] = useState(true);
  const [hideContactsEnabled, setHideContactsEnabled] = useState(true);
  const [hideFavouritesEnabled, setHideFavouritesEnabled] = useState(true);

  const toggleReviews = () =>
    setShowReviewEnabled((previousState) => !previousState);

  const toggleContacts = () =>
    setHideContactsEnabled((previousState) => !previousState);

  const toggleFavourites = () =>
    setHideFavouritesEnabled((previousState) => !previousState);
  
  useEffect(() => {
    showReviewEnabled
      ? AsyncStorage.setItem('@showReviews', "true")
      : AsyncStorage.setItem('@showReviews', "false");
  },[showReviewEnabled])
  return (
    <View style={{flex:1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 20
        }}
      >
        <Text style={{ paddingLeft: 20, color: '#000', fontSize: 20, flex: 1 }}>
          Settings
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.privacy}>
          <Text style={{ fontSize: 18, color: '#5F82E2' }}>Privacy</Text>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              justifyContent: 'space-around'
            }}
          >
            <Text
              style={{
                fontSize: 20,
                paddingRight: 20,
                flex: 1
              }}
            >
              Show this Review to My Contacts Only
            </Text>
            <View>
              <Switch
                trackColor={{ false: '#767577', true: '#66c263' }}
                thumbColor={showReviewEnabled ? '#219e1c' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleReviews}
                value={showReviewEnabled}
              />
            </View>
          </View>
          <View style={styles.line}></View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 20,
              justifyContent: 'space-around'
            }}
          >
            <Text
              style={{
                fontSize: 20,
                paddingRight: 20,
                flex: 1
              }}
            >
              Hide my Contacts
            </Text>
            <View>
              <Switch
                trackColor={{ false: '#767577', true: '#66c263' }}
                thumbColor={hideContactsEnabled ? '#219e1c' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleContacts}
                value={hideContactsEnabled}
              />
            </View>
          </View>
          <View style={styles.line}></View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              justifyContent: 'space-around'
            }}
          >
            <Text
              style={{
                fontSize: 20,
                paddingRight: 20,
                flex: 1
              }}
            >
              Hide my favourites
            </Text>
            <View>
              <Switch
                trackColor={{ false: '#767577', true: '#66c263' }}
                thumbColor={hideFavouritesEnabled ? '#219e1c' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleFavourites}
                value={hideFavouritesEnabled}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 15,
            alignItems: 'center',
            marginVertical: 10
          }}
          onPress={()=>props.navigation.navigate('ReferDoctor')}
        >
          <Image source={require('../assets/images/referDoc.png')} />
          <Text style={{ paddingLeft: 15, flex: 1, fontSize: 20 }}>
            Refer a Doctor
          </Text>
          <FontAwesomeIcon icon={faChevronRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 15,
            alignItems: 'center',
            marginVertical: 10
          }}
        >
          <View
            style={{
              backgroundColor: '#5F82E2',
              padding: 10,
              borderRadius: 20
            }}
          >
            <FontAwesomeIcon icon={faQuestion} color={'#fff'} />
          </View>
          <Text style={{ paddingLeft: 15, flex: 1, fontSize: 20 }}>FAQ</Text>
          <FontAwesomeIcon icon={faChevronRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 15,
            alignItems: 'center',
            marginVertical: 10
          }}
        >
          <View
            style={{
              backgroundColor: '#5F82E2',
              padding: 10,
              borderRadius: 20
            }}
          >
            <FontAwesomeIcon icon={faInfo} color={'#fff'} />
          </View>
          <Text style={{ paddingLeft: 15, flex: 1, fontSize: 20 }}>
            About Us
          </Text>
          <FontAwesomeIcon icon={faChevronRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 15,
            alignItems: 'center',
            marginVertical: 10
          }}
        >
          <View style={{ padding: 10, borderRadius: 20 }}>
            <FontAwesomeIcon icon={faStar} color={'#5F82E2'} size={25} />
          </View>
          <Text style={{ paddingLeft: 15, flex: 1, fontSize: 20 }}>
            Rate us on Playstore
          </Text>
          <FontAwesomeIcon icon={faChevronRight} />
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient colors={['#5F82E2', '#4A6BC5']} style={styles.button}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff'
              }}
            >
              Contact Us
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  privacy: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff'
  },
  line: {
    borderWidth: 1,
    borderColor: '#f5f5f5'
  },
  button: {
    backgroundColor: '#1AC29A',
    margin: 20,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10
  }
});
