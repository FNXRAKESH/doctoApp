import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GetAssistance from './GetAssistance';
import DrawerContent from './DrawerContent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCog,
  faHome,
  faQuestionCircle,
  faSearch,
  faUser,
  faUserMd
} from '@fortawesome/free-solid-svg-icons';
import MainScreen from './DoctorDetails/MainScreen';
import MyProfile from './MyProfile';
import Setting from './Setting';
import ReferDoctor from './ReferDoctor';
import { Image, View } from 'react-native';

const Drawer = createDrawerNavigator();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  getUsers = async () => {
    let arr = [];
    await fetch('http://157.245.105.212:9000/api/users')
      .then((response) => response.json())
      .then((data) => {
        data.map((d) => {
          arr.push(d.mobile);
        });
      })
      .then(() => {
        this.setState({ users: arr });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  componentDidMount = () => {
    this.getUsers();
  };
  render() {
    if (this.state.users.length > 0) {
      return (
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: '#fff',
            inactiveTintColor: '#f5f5f5',
            itemStyle: { marginVertical: 5 }
          }}
          drawerContent={(props) => (
            <DrawerContent
              {...props}
              setLogout={this.props.setLogout}
              toggleTheme={this.props.toggleTheme}
              darkTheme={this.props.darkTheme}
            />
          )}
          initialRouteName="MainScreen"
        >
          <Drawer.Screen
            name="MainScreen"
            component={MainScreen}
            options={{
              drawerLabel: 'Dashboard',
              drawerIcon: ({ color }) => (
                <FontAwesomeIcon icon={faHome} size={20} color={color} />
              )
            }}
            initialParams={{
              accessToken: this.props.accessToken,
              userId: this.props.userId,
              user: this.props.user
            }}
          />
       
          <Drawer.Screen
            name="MyProfile"
            component={MyProfile}
            options={{
              drawerLabel: 'My Profile',
              drawerIcon: ({ color }) => (
                <FontAwesomeIcon icon={faUser} size={20} color={color} />
              )
            }}
            initialParams={{
              accessToken: this.props.accessToken,
              userId: this.props.userId,
              users: this.state.users
            }}
          />

          <Drawer.Screen
            name="ReferDoctor"
            component={ReferDoctor}
            options={{
              drawerLabel: 'Refer a Doctor',
              drawerIcon: ({ color }) => (
                <FontAwesomeIcon icon={faUserMd} size={20} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name="Get Assistance"
            component={GetAssistance}
            options={{
              drawerLabel: 'Get Assistance',
              drawerIcon: ({ color }) => (
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  size={20}
                  color={color}
                />
              )
            }}
          />
          <Drawer.Screen
            name="Setting"
            component={Setting}
            options={{
              drawerLabel: 'Settings',
              drawerIcon: ({ color }) => (
                <FontAwesomeIcon icon={faCog} size={20} color={color} />
              )
            }}
          />
        </Drawer.Navigator>
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image source={require('../assets/images/heartBeat.gif')} />
        </View>
      );
    }
  }
}

export default Home;
