import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faChevronRight,
  faEllipsisH,
  faHeart,
  faHeartBroken,
  faMapMarkerAlt,
  faPhoneAlt,
  faStar,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';

const DoctorDetails = (props) => {
  const doctor = props.route.params.doctor;
  const userId = props.route.params.userId;
  const user = props.route.params.user;

  const index = props.route.params.index;
  const [reviews, setReviews] = useState([]);
  const [doctorId, setDoctorId] = useState(props.route.params.doctor._id);
  const [favourite, setFavourite] = useState([]);
  const addFavourite = () => {
    fetch(`http://157.245.105.212:9000/api/user/createFavourites/${userId}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.route.params.accessToken}`
      }),
      body: JSON.stringify({
        favourite: doctor._id
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  const readFavourite = () => {
    console.log('read ', userId);
    fetch(`http://157.245.105.212:9000/api/user/${userId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.route.params.accessToken}`
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setFavourite(data.favourite);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    fetch(`http://157.245.105.212:9000/api/DoctorReviews/${doctor._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('data ', data);
        setReviews(data);
      })
      .then(() => {})
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [doctorId]);
  useEffect(() => {
    readFavourite();
  });
  console.log(props.route.params.id);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#5F82E2',
          padding: 20
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
          <FontAwesomeIcon icon={faArrowLeft} color={'#fff'} />
        </TouchableOpacity>

        <Text style={{ paddingLeft: 20, color: '#fff', fontSize: 20 }}>
          Dr. {doctor.name}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          start={[0, 0]}
          end={[0.5, 1]}
          colors={['#5F82E2', '#4A6BC5']}
          style={styles.topContainer}
        >
          {doctor.speciality === 'Surgeon' ? (
            <SharedElement id={`${doctor._id}.${index}`}>
              <Image
                source={require('../../assets/images/doc1.png')}
                resizeMode="contain"
              />
            </SharedElement>
          ) : (
            <SharedElement id={`${doctor._id}.${index}`}>
              <Image
                source={require('../../assets/images/doc2.png')}
                resizeMode="contain"
              />
            </SharedElement>
          )}

          <Text
            style={{
              paddingTop: 25,
              color: '#fff',
              fontSize: 25,
              fontWeight: 'bold'
            }}
          >
            Dr. {doctor.name}
          </Text>

          <Text style={{ color: '#fff', fontSize: 20, paddingBottom: 20 }}>
            {doctor.speciality}
          </Text>

          <View style={styles.icons}>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 35,
                  padding: 25
                }}
              >
                <FontAwesomeIcon icon={faPhoneAlt} color={'#fc2a17'} />
              </View>
              <Text style={{ paddingTop: 10, color: '#4A6BC5' }}>Call</Text>
            </View>
            <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 35,
                  padding: 25
                }}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} color={'#46b02e'} />
              </View>
              <Text style={{ paddingTop: 10, color: '#4A6BC5' }}>
                Get Direction
              </Text>
            </View>
            <TouchableOpacity
              style={{ alignItems: 'center', marginRight: 15 }}
              onPress={() =>
                props.navigation.navigate('AddReview', { docId: doctor._id })
              }
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 35,
                  padding: 25
                }}
              >
                <FontAwesomeIcon icon={faStar} color={'#ffa200'} />
              </View>
              <Text style={{ paddingTop: 10, color: '#4A6BC5' }}>Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => addFavourite()}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 35,
                  padding: 25
                }}
              >
                {favourite.includes(doctorId) ? (
                  <FontAwesomeIcon icon={faHeart} color={'#fc6262'} />
                ) : (
                  <FontAwesomeIcon icon={faHeartBroken} color={'#fc6262'} />
                )}
              </View>
              <Text style={{ paddingTop: 10, color: '#4A6BC5' }}>
                Favourite
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.recommend}>
          <Image source={require('../../assets/images/friends.png')} />
          <Text style={{ fontSize: 16, flex: 1, fontWeight: 'bold' }}>
            7 of your friends Recommended this Doctor
          </Text>
          <FontAwesomeIcon icon={faChevronRight} />
        </View>

        <LinearGradient
          start={[0, 0]}
          end={[0.5, 1]}
          colors={['#4A6BC5', '#4A6BC5']}
          style={styles.ratingCard}
        >
          <Image source={require('../../assets/images/star.png')} />
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
              4.5
            </Text>
            <Text style={{ color: '#b5b5b5', fontSize: 20 }}>1800 Reviews</Text>
          </View>
          <FontAwesomeIcon icon={faChevronRight} color={'#fff'} />
        </LinearGradient>
        <View style={styles.about}>
          <Text
            style={{ fontSize: 22, paddingVertical: 10, fontWeight: 'bold' }}
          >
            About Dr. {doctor.name}
          </Text>
          <Text style={{ fontSize: 18 }}>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
            quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
            quo voluptas nulla pariatur
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 20,
              justifyContent: 'space-around'
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <View style={styles.awards}>
                <Image source={require('../../assets/images/experience.png')} />
              </View>
              <Text style={{ paddingTop: 10, fontSize: 18 }}>25 Years</Text>
              <Text style={{ fontSize: 16, color: '#b5b5b5' }}>Experience</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.awards}>
                <Image source={require('../../assets/images/award.png')} />
              </View>
              <Text style={{ paddingTop: 10, fontSize: 18 }}>10 Awards</Text>
              <Text style={{ fontSize: 16, color: '#b5b5b5' }}>
                Recognitions
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.about}>
          <Text
            style={{ fontSize: 22, paddingVertical: 10, fontWeight: 'bold' }}
          >
            Expertise
          </Text>
          <Text style={{ fontSize: 18 }}>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
            quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
            quo voluptas nulla pariatur
          </Text>
          <Text style={{ fontSize: 22, paddingVertical: 10, color: '#5F82E2' }}>
            {doctor.speciality}
          </Text>
          <Text style={{ fontSize: 18 }}>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
            quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
            quo voluptas nulla pariatur
          </Text>
        </View>
        <Text
          style={{ fontSize: 22, paddingHorizontal: 20, fontWeight: 'bold' }}
        >
          Reviews and Ratings
        </Text>
        <View style={styles.ratingCard}>
          <Image source={require('../../assets/images/starBlue.png')} />
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text style={{ color: '#000', fontSize: 22, fontWeight: 'bold' }}>
              4.5
            </Text>
            <Text style={{ color: '#b5b5b5', fontSize: 18 }}>1800 Reviews</Text>
          </View>
        </View>
        {reviews.map((review, index) => {
          return (
            <View key={index} style={styles.about}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/images/reviewUser.png')} />
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      paddingBottom: 10
                    }}
                  >
                    Jessica Smith
                  </Text>
                  <Image source={require('../../assets/images/ratings.png')} />
                </View>
              </View>
              <Text style={{ fontSize: 18, paddingVertical: 15 }}>
                {review.comment}
              </Text>
              <View style={styles.line}></View>
              <View style={{ paddingVertical: 15, flexDirection: 'row' }}>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  color={'#5F82E2'}
                  size={25}
                />
                <Text style={{ fontSize: 18, paddingLeft: 10, flex: 1 }}>
                  18
                </Text>
                <Text
                  style={{ fontSize: 18, color: '#b5b5b5', paddingRight: 10 }}
                >
                  29d ago
                </Text>
                <FontAwesomeIcon icon={faEllipsisH} size={25} />
              </View>
            </View>
          );
        })}

        <View style={styles.footer}>
          <FontAwesomeIcon icon={faStar} size={25} color={'#5F82E2'} />
          <Text style={{ fontSize: 23, paddingLeft: 10, flex: 1 }}>
            Rate Doctor
          </Text>
          <View style={styles.direction}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size={25} color={'#fff'} />
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 18, color: '#fff' }}>Get Direction</Text>
              <Text style={{ fontSize: 18, color: '#b5b5b5' }}>3.2km</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

DoctorDetails.sharedElements = (route) => {
  const doctor = route.params.doctor;
  const index = route.params.index;
  return [
    {
      id: `${doctor._id}.${index}`,
      animation: 'move',
      resize: 'auto',
      align: 'auto'
    }
  ];
};

export default DoctorDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    paddingVertical: 35,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    position: 'relative'
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -60,
    zIndex: 999
  },
  recommend: {
    marginTop: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 15
  },
  ratingCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  about: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15
  },
  awards: {
    backgroundColor: 'rgba(95,130,226,0.3)',
    padding: 20,
    borderRadius: 30
  },
  line: {
    borderWidth: 1,
    borderColor: '#f5f5f5'
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  direction: {
    backgroundColor: '#5F82E2',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
