import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', token: '', userId: '' };
  }

  handleSubmit = () => {
    fetch('http://157.245.105.212:9000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mobile: this.state.username,
        password: this.state.password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data ', data);
        if (data.token !== undefined) {
          console.log('Success:', data.token);
          this.setState({ token: data.token, userId: data.user._id }, () => {
            console.log('data._id ', data.user._id);
            this.props.route.params.checkLogin(
              this.state.token,
              this.state.userId,
              data.user
            );
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  render() {
    return (
      <View style={[styles.container]} onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center'
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={styles.logo}>
              <Text style={{ color: '#fff', fontSize: 35, fontWeight: 'bold' }}>
                Docto.
              </Text>
            </View>
          </View>
          <View style={styles.forms}>
            <View style={styles.InputContainer}>
              <TextInput
                keyboardType="numeric"
                placeholder="Phone Number"
                style={styles.textInput}
                placeholderTextColor="#0A213E"
                value={this.state.username}
                onChangeText={(e) => {
                  this.setState({ username: e });
                }}
              />
            </View>
            <View style={styles.InputContainer}>
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                style={styles.textInput}
                placeholderTextColor="#0A213E"
                value={this.state.password}
                onChangeText={(e) => this.setState({ password: e })}
              />
            </View>

            <TouchableOpacity onPress={() => this.handleSubmit()}>
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
                  Sign In
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('RecoverPassword');
              }}
            >
              <Text
                style={{
                  color: '#5F82E2',
                  textAlign: 'center'
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 20
              }}
            >
              Don't have an account?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}
            style={{
              ...styles.signUpButton
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#5F82E2'
              }}
            >
              Sign Up Now
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1
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

    elevation: 10
  },
  forms: {
    shadowColor: '#000C0B',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  button: {
    backgroundColor: '#1AC29A',
    margin: 20,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10
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
  textInput: {
    fontSize: 18,
    paddingLeft: 15,
    borderRadius: 10
  },
  signUpButton: {
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5F82E2',
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff'
  }
});
