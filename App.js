import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import SignUp from './screens/beforeLoginScreens/SignUp';
import Home from './screens/Home';

// import LogoImage from './screens/LogoImage';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from './screens/beforeLoginScreens/Welcome';
import SignIn from './screens/beforeLoginScreens/SignIn';
import AccountCreated from './screens/beforeLoginScreens/AccountCreated';
import Landing from './screens/beforeLoginScreens/Landing';
import RecoverPassword from './screens/beforeLoginScreens/RecoverPassword';

const Stack = createStackNavigator();

let content;

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLoggedIn: false,
      darkTheme: false,
      accessToken: '',
      initialRouteName: 'Welcome',
      userId: '',
      user:[]
    };
  }
  toggleTheme = (e) => {
    this.setState({ darkTheme: !this.state.darkTheme }, () => {
      console.log('app ', this.state.darkTheme);
    });
  };
  checkLogin = (e, id, user) => {
    AsyncStorage.setItem('@accessToken', e);
    this.setState({ isLoggedIn: true, accessToken: e, userId: id , user :user });
  };
  setLogout = async (e) => {
    await AsyncStorage.clear();
    this.setState({ isLoggedIn: false, initialRouteName: 'SignIn' });
  };

  render() {
    if (this.state.isLoggedIn == false) {
      content = (
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid
          }}
          headerMode="float"
          animation="fade"
          // screenOptions={{ headerLeft: () => <LogoImage /> }}
          initialRouteName={this.state.initialRouteName}
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
            initialParams={{ checkLogin: this.checkLogin }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: true, title: 'Sign in with Phone number' }}
            initialParams={{ checkLogin: this.checkLogin }}
          />
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
            initialParams={{ checkLogin: this.checkLogin }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: true, title: 'Create New Account' }}
          />
          <Stack.Screen
            name="RecoverPassword"
            component={RecoverPassword}
            options={{ headerShown: true, title: 'Recover Password' }}
          />
        </Stack.Navigator>
      );
    } else if (this.state.isLoggedIn == true) {
      content = (
        <Home
          setLogout={this.setLogout}
          accessToken={this.state.accessToken}
          userId={this.state.userId}
          user={this.state.user}
        />
      );
    }
    return (
      <NavigationContainer>
        <StatusBar hidden />
        {content}
      </NavigationContainer>
    );
  }
}
