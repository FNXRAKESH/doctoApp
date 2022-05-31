import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const AccountCreated = (props) => {
  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: Dimensions.get('window').width,
          height: 350,
          zIndex: -99
        }}
      >
        <Image
          source={require('../../assets/images/AccountCreated.png')}
          style={{ height: null, width: null, flex: 1 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
          Account Created
        </Text>
        <Text style={{ textAlign: 'center', padding: 10, fontSize: 18 }}>
          Confirmation email has been sent to rakesh@finexusinc.com
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          marginTop: 30,
          flex: 0.5,
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: 28, textAlign: 'center', fontWeight: 'bold' }}>
          Would you like to set up your profile now?
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('SignIn');
          }}
        >
          <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
            Yes, Let's set up my profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTwo}
          onPress={() => {
            props.navigation.navigate('SignIn');
          }}
        >
          <Text style={{ color: '#0A213E', fontSize: 20, textAlign: 'center' }}>
            No, I'l do that later
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountCreated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#1AC29A',
    borderRadius: 5,
    padding: 15,
    marginVertical: 20
  },
  buttonTwo: {
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    padding: 15
  }
});
