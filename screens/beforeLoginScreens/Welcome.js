import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Dimensions,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const images = [
  {
    id: 1,
    title: 'Find Doctors & Clinics Near You.',
    Desc:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
    img: require('../../assets/images/slide1.png'),
    cta: ''
  },
  {
    id: 2,
    title: 'Rate and Review Doctors to Help Others',
    Desc:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
    img: require('../../assets/images/slide2.png'),
    cta: ''
  },
  {
    id: 3,
    title: 'We Need Permission to Access Your Contacts',
    Desc:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
    img: require('../../assets/images/slide3.png'),
    cta: ''
  }
];

const Welcome = (props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  var scrollRef = useRef();
   
  const { width: windowWidth } = useWindowDimensions();
 
  return (
    <LinearGradient colors={['#4A6BC5', '#4A6BC5']} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollContainer}>
          <Animated.ScrollView
            horizontal={true}
            contentContainerStyle={{ alignItems: 'center' }}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX
                  }
                }
              }
            ],{useNativeDriver:false})}
            ref={(node) => (scrollRef = node)}
            scrollEventThrottle={1}
          >
            {images.map((image, imageIndex) => {
              return (
                <View style={styles.scrollContainer} key={imageIndex}>
                  <View style={{ flex: 0.7, justifyContent: 'center' }}>
                    <Image source={image.img} />
                  </View>
                  <View style={{ padding: 20 }}>
                    <Text
                      style={{
                        fontSize: 28,
                        paddingVertical: 10,
                        color: '#fff'
                      }}
                    >
                      {image.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#f2f2f0'
                      }}
                    >
                      {image.Desc}
                    </Text>
                  </View>
                  {imageIndex !== 2 ? (
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => {
                        scrollRef.scrollTo({
                          x: (imageIndex + 1) * windowWidth,
                          animated: true
                        });
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: 18 }}>Next</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.AllowButton}
                      onPress={() => {props.navigation.navigate('Landing');}}
                    >
                      <Text style={{ color: '#5F82E2', fontSize: 18 }}>
                        Allow and Continue
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </Animated.ScrollView>
          <View style={styles.indicatorContainer}>
            {images.map((image, index) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * index - 1,
                  windowWidth * index,
                  windowWidth * index + 1
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View
                  key={index}
                  style={[styles.normalDot, { width }]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',

    width: Dimensions.get('window').width
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },

  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  background: {
    flex: 1,

    width: Dimensions.get('window').width
  },
  nextButton: {
    backgroundColor: '#5F82E2',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  AllowButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15
  }
});

export default Welcome;
