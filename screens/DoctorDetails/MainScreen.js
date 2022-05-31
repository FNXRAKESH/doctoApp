import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
 
import Dashboard from './Dashboard';
import DoctorDetails from './DoctorDetails';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import SearchResult from './SearchResult';
import AddReview from './AddReview';

const Stack = createSharedElementStackNavigator();

const MainScreen = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
      }}
      headerMode="float"
      animation="fade"
      initialRouteName="Dashboard"
      options={{
        gestureEnabled: true
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false
        }}
        initialParams={{
          accessToken: props.route.params.accessToken,
          userId: props.route.params.userId
        }}
      />
      <Stack.Screen
        name="DoctorDetails"
        component={DoctorDetails}
        options={{
          headerShown: false
        }}
        initialParams={{
          accessToken: props.route.params.accessToken,
          userId: props.route.params.userId,
          user: props.route.params.user
        }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          headerShown: true
        }}
        initialParams={{
          accessToken: props.route.params.accessToken,
          userId: props.route.params.userId
        }}
      />
      <Stack.Screen
        name="AddReview"
        component={AddReview}
        options={{
          headerShown: false
        }}
        initialParams={{
          accessToken: props.route.params.accessToken,
          userId: props.route.params.userId
        }}
      />
    </Stack.Navigator>
  );
};

export default MainScreen;
