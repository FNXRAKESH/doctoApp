import React from 'react';
import { View, Text, StyleSheet, Dimensions,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Facebook from 'expo-facebook';

const { width, height } = Dimensions.get('window');
async function facebookLogin(props) {
  try {
    await Facebook.initializeAsync({
      appId: '1085464265272950'
    });
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile']
    });
    console.log('type ', type);
    if (type === 'success') {
      // console.log('token ', token);
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      // console.log('Logged in!', `Hi ${(await response.json())}!`);
      
      const res = await response.json();
      // console.log(res.id)
      props.route.params.checkLogin(token, res.id);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}
const Landing = (props) => {
  return (
    <View style={styles.contianer}>
      <LinearGradient
        start={[0, 0]}
        end={[1, 1]}
        colors={['#5F82E2', '#4A6BC5']}
        style={styles.topContainer}
      >
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 35,

              fontWeight: 'bold'
            }}
          >
            Hey there!
          </Text>
          <Text style={{ color: '#fff', fontSize: 19, paddingVertical: 10 }}>
            Sign In to Continue
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <View style={styles.logo}>
          <Text style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>
            Docto.
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ paddingVertical: 30 }}
            onPress={() => facebookLogin(props)}
          >
            <LinearGradient
              colors={['#5F7EBE', '#3B5998']}
              style={styles.facebookBtn}
            >
              <FontAwesomeIcon icon={faFacebookF} color={'#fff'} size={25} />
              <Text style={{ fontSize: 20, color: '#fff', paddingLeft: 10 }}>
                Continue with facebook
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
              props.navigation.navigate('SignIn');
            }}
          >
            <Text style={{ fontSize: 20 }}>Sign in with Phone number</Text>
          </TouchableOpacity>
          <Text style={{ paddingVertical: 30, textAlign: 'center' }}>
            Dont have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SignUp');
            }}
          >
            <LinearGradient
              colors={['#5F82E2', '#4A6BC5']}
              style={styles.facebookBtn}
            >
              <Text style={{ fontSize: 20, color: '#fff', paddingLeft: 10 }}>
                Sign Up Now
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: 'center'
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
    width: width
  },
  bottomContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: 20,
    flex: 0.6
  },
  logo: {
    backgroundColor: '#5F82E2',
    borderRadius: 15,
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#5F82E2',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
    marginTop: -100
  },
  facebookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10
  },
  signInButton: {
    borderWidth: 2,
    borderColor: '#5F82E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10
  }
});
