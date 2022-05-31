import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import ContactImage from '../assets/images/contact';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

class GetAssistance extends Component {
  state = {};
  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#FAFAFA' }]}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 30,
            paddingHorizontal: 20
          }}
          onPress={() => this.props.navigation.navigate('Dashboard')}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
            Get Assistance
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <ContactImage />
        </View>
        <View style={{ justifyContent: 'center', padding: 30 }}>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>
            We're always
          </Text>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>
            here for you 24/7
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 30 }} showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: 'grey',
              borderBottomWidth: 0.3,
              paddingVertical: 15
            }}
          >
            <View
              style={{
                flex: 0.15,
                justifyContent: 'center'
              }}
            >
              <Image
                source={require('../assets/images/phone.png')}
                style={{ height: 25, width: 25 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: 'grey' }}>Call us</Text>
              <Text style={{ fontSize: 22 }}>(xx) - xxx xxxx</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faChevronRight} size={16} color={'#000'} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: 'grey',
              borderBottomWidth: 0.3,
              paddingVertical: 15
            }}
          >
            <View style={{ flex: 0.15, justifyContent: 'center' }}>
              <Image
                source={require('../assets/images/email.png')}
                style={{ height: 25, width: 25 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: 'grey' }}>Email us</Text>
              <Text style={{ fontSize: 22 }}>contact@finexusinc.com</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faChevronRight} size={16} color={'#000'} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: 'grey',
              borderBottomWidth: 0.3,
              paddingVertical: 15
            }}
          >
            <View style={{ flex: 0.15, justifyContent: 'center' }}>
              <Image
                source={require('../assets/images/whatsapp.png')}
                style={{ height: 25, width: 25 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: 'grey' }}>Call us</Text>
              <Text style={{ fontSize: 22 }}>(xx) - xxx xxxx</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faChevronRight} size={16} color={'#000'} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default GetAssistance;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
