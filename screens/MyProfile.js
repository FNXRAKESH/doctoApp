import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Switch,
  TextInput,
  Alert
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faChevronDown,
  faEllipsisH,
  faMapMarkerAlt,
  faSearch,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';

const MyProfile = (props) => {
  let arr = props.route.params.users;

  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState('reviews');
  const [editMenu, setEditMenu] = useState(false);
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState('');
  const [Reviews, setReviews] = useState([]);
  const [show, setShow] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    setUsers(arr);
  });
  useEffect(() => {
    showFirstContactAsync();
  }, [users]);
  const getProfileData = () => {
    // console.log(props.route.params.accessToken);
    fetch(`http://157.245.105.212:9000/api/user/${props.route.params.userId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.route.params.accessToken}`
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('data ', data.mobile);
        setUsername(data.name);
        setEmail(data.email);
        setMobile(data.mobile);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const editProfile = () => {
    fetch(`http://157.245.105.212:9000/api/user/${props.route.params.userId}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.route.params.accessToken}`
      }),
      body: JSON.stringify({
        name: username,
        phone: mobile,
        email: email
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('updated');
      });
  };
  const showFirstContactAsync = async () => {
    let arr = [];
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });

      if (data.length > 0) {
        {
          data.map((contact, index) => {
            if (contact.hasOwnProperty('phoneNumbers')) {
              if (contact.phoneNumbers.length > 0) {
                // console.log('contact.phoneNumbers[0].number' ,typeof(contact.phoneNumbers[0].number));
                if (users.includes(parseInt(contact.phoneNumbers[0].number))) {
                  // console.log('available ', arr);
                  arr.push(contact);
                } else if (
                  users.includes(
                    parseInt(
                      contact.phoneNumbers[0].number
                        .substring(3)
                        .replace(/ /g, '')
                    )
                  )
                ) {
                  arr.push(contact);
                }
              }
            }
          });
          setContacts(arr);
        }
      }
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      let data = await AsyncStorage.getItem('@showReviews');
      setShow(JSON.parse(data));
    };
    getReviews();
  });

  useEffect(() => {
    let data;
    if (show === true) {
      data = (
        <View>
          <TouchableOpacity style={styles.sortReview}>
            <Text style={{ flex: 1, fontSize: 20, color: '#5F82E2' }}>
              Sort by Date Reviewed
            </Text>
            <FontAwesomeIcon icon={faChevronDown} color={'#5F82E2'} />
          </TouchableOpacity>

          <View style={styles.review}>
            <Text
              style={{
                fontSize: 22,
                paddingVertical: 10,
                fontWeight: 'bold'
              }}
            >
              You Reviewed{' '}
              <Text style={{ color: '#5F82E2' }}>Dr. Rohit Shukla</Text>
            </Text>
            <View style={{ alignItems: 'center', paddingVertical: 15 }}>
              <View style={{ paddingBottom: 15 }}>
                <Image source={require('../assets/images/doc1.png')} />
              </View>
              <Image source={require('../assets/images/ratings.png')} />
            </View>
            <Text style={{ fontSize: 18 }}>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur, vel illum qui dolorem eum
              fugiat quo voluptas nulla pariatur
            </Text>

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 15,
                justifyContent: 'space-around'
              }}
            >
              <View>
                <Switch
                  trackColor={{ false: '#767577', true: '#66c263' }}
                  thumbColor={isEnabled ? '#219e1c' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 20,
                  flex: 1
                }}
              >
                Show this Review to My Contacts Only
              </Text>
            </View>
            <View style={styles.line}></View>
            <View style={{ paddingVertical: 15, flexDirection: 'row' }}>
              <FontAwesomeIcon icon={faThumbsUp} color={'#5F82E2'} size={25} />
              <Text style={{ fontSize: 18, paddingLeft: 10, flex: 1 }}>
                180
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#b5b5b5',
                  paddingRight: 10
                }}
              >
                29d ago
              </Text>
              <FontAwesomeIcon icon={faEllipsisH} size={25} />
            </View>
          </View>
        </View>
      );
      setReviews(data);
    } else {
      data = (
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 25,
              paddingHorizontal: 15,
              textAlign: 'center'
            }}
          >
            Only Contacts can view your Reviews
          </Text>
          <Image source={require('../assets/images/hidden.png')} />
        </View>
      );
      setReviews(data);
    }
  }, [show]);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#5F82E2'
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.goBack(null)}
          style={{ padding: 20 }}
        >
          <FontAwesomeIcon icon={faArrowLeft} color={'#fff'} />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 20, color: '#fff', fontSize: 20, flex: 1 }}>
          My Profile
        </Text>
        <TouchableOpacity
          onPress={() => setEditMenu(!editMenu)}
          style={{ padding: 20 }}
        >
          <FontAwesomeIcon icon={faEllipsisH} color={'#fff'} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          start={[0, 0]}
          end={[0.5, 1]}
          colors={['#5F82E2', '#4A6BC5']}
          style={styles.topContainer}
        >
          {editMenu ? (
            <View style={styles.editScreen}>
              <TouchableOpacity
                onPress={() => {
                  setShowEditScreen(true),
                    setEditMenu(!editMenu),
                    getProfileData();
                }}
              >
                <Text style={{ padding: 10, color: '#fff', fontSize: 20 }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowEditScreen(false),
                    setEditMenu(!editMenu),
                    setSelectedScreen('reviews');
                }}
              >
                <Text style={{ padding: 10, color: '#fff', fontSize: 20 }}>
                  My Reviews
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <Image
            source={require('../assets/images/user.png')}
            resizeMode="contain"
          />

          <Text
            style={{
              paddingTop: 25,
              color: '#fff',
              fontSize: 30,
              fontWeight: 'bold'
            }}
          >
            Tushar Palei
          </Text>

          <Text style={{ color: '#b5b5b5', fontSize: 20, paddingBottom: 20 }}>
            22years, Orissa
          </Text>

          {!showEditScreen ? (
            <View style={styles.icons}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedScreen('contacts');
                  showFirstContactAsync();
                }}
                style={{ alignItems: 'center' }}
              >
                <Text
                  style={
                    selectedScreen === 'contacts'
                      ? { color: '#5F82E2', fontSize: 25 }
                      : { color: '#000', fontSize: 25 }
                  }
                >
                  56
                </Text>
                <Text
                  style={
                    selectedScreen === 'contacts'
                      ? {
                          paddingTop: 10,
                          color: '#000',
                          fontSize: 18,
                          color: '#5F82E2'
                        }
                      : { paddingTop: 10, color: '#000', fontSize: 18 }
                  }
                >
                  Contacts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedScreen('reviews')}
                style={{ alignItems: 'center', marginHorizontal: 25 }}
              >
                <Text
                  style={
                    selectedScreen === 'reviews'
                      ? { color: '#5F82E2', fontSize: 25 }
                      : { color: '#000', fontSize: 25 }
                  }
                >
                  12
                </Text>
                <Text
                  style={
                    selectedScreen === 'reviews'
                      ? {
                          paddingTop: 10,
                          color: '#000',
                          fontSize: 18,
                          color: '#5F82E2'
                        }
                      : { paddingTop: 10, color: '#000', fontSize: 18 }
                  }
                >
                  Reviews
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedScreen('favourites')}
                style={{ alignItems: 'center' }}
              >
                <Text
                  style={
                    selectedScreen === 'favourites'
                      ? { color: '#5F82E2', fontSize: 25 }
                      : { color: '#000', fontSize: 25 }
                  }
                >
                  6
                </Text>
                <Text
                  style={
                    selectedScreen === 'favourites'
                      ? {
                          paddingTop: 10,
                          color: '#000',
                          fontSize: 18,
                          color: '#5F82E2'
                        }
                      : { paddingTop: 10, color: '#000', fontSize: 18 }
                  }
                >
                  Favourite
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </LinearGradient>
        {!showEditScreen ? (
          <View>
            {selectedScreen === 'reviews' ? (
              <View style={{ marginTop: 90 }}>{Reviews}</View>
            ) : null}
            {selectedScreen === 'contacts' ? (
              <View>
                <TouchableOpacity style={styles.searchFriend}>
                  <FontAwesomeIcon icon={faSearch} />
                  <TextInput
                    placeholder="Search friends list"
                    style={styles.textInput}
                    placeholderTextColor="#0A213E"
                  />
                </TouchableOpacity>

                <View style={{ paddingVertical: 25 }}>
                  {contacts.map((contact, index) => {
                    // console.log('contact ', contact);
                    return (
                      <View key={index} style={styles.friends}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <Image
                            source={require('../assets/images/reviewUser.png')}
                          />
                          <View style={{ paddingLeft: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                              {contact.name}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}
            {selectedScreen === 'favourites' ? (
              <View style={{ marginTop: 90 }}>
                <TouchableOpacity style={styles.sortReview}>
                  <TextInput
                    placeholder="Search favourites list"
                    style={styles.textInput}
                    placeholderTextColor="#0A213E"
                  />
                </TouchableOpacity>
                <View style={{ paddingVertical: 25 }}>
                  <View style={styles.friends}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 10
                      }}
                    >
                      <Image source={require('../assets/images/doctor.png')} />
                      <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                          Dr. Jessica Smith
                        </Text>
                        <Text style={{ color: '#b5b5b5' }}>
                          General Physician
                        </Text>
                        <Image
                          source={require('../assets/images/ratings.png')}
                        />
                      </View>
                    </View>
                    <View style={styles.line}></View>
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: '#5F82E2',
                          fontSize: 16,
                          paddingVertical: 10
                        }}
                      >
                        - Remove from favourites list
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.direction}>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        size={25}
                        color={'#fff'}
                      />

                      <Text
                        style={{
                          fontSize: 18,
                          color: '#fff',
                          flex: 1,
                          paddingLeft: 10
                        }}
                      >
                        Get Direction
                      </Text>
                      <Text style={{ fontSize: 18, color: '#b5b5b5' }}>
                        3.2km
                      </Text>
                    </View>
                  </View>
                  <View style={styles.friends}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 10
                      }}
                    >
                      <Image source={require('../assets/images/doctor.png')} />
                      <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                          Dr. Jessica Smith
                        </Text>
                        <Text style={{ color: '#b5b5b5' }}>
                          General Physician
                        </Text>
                        <Image
                          source={require('../assets/images/ratings.png')}
                        />
                      </View>
                    </View>
                    <View style={styles.line}></View>
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: '#5F82E2',
                          fontSize: 16,
                          paddingVertical: 10
                        }}
                      >
                        - Remove from favourites list
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.direction}>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        size={25}
                        color={'#fff'}
                      />

                      <Text
                        style={{
                          fontSize: 18,
                          color: '#fff',
                          flex: 1,
                          paddingLeft: 10
                        }}
                      >
                        Get Direction
                      </Text>
                      <Text style={{ fontSize: 18, color: '#b5b5b5' }}>
                        3.2km
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.forms}>
            <View style={styles.InputContainer}>
              <TextInput
                keyboardType="numeric"
                placeholder="Name"
                style={styles.textInput}
                placeholderTextColor="#0A213E"
                value={username}
                onChangeText={(e) => {
                  setUsername(e);
                }}
              />
            </View>
            <View style={styles.InputContainer}>
              <TextInput
                keyboardType="number-pad"
                placeholder="Phone Number"
                style={styles.textInput}
                placeholderTextColor="#0A213E"
                value={`${mobile}`}
                onChangeText={(e) => {
                  setMobile(e);
                }}
              />
            </View>
            <View style={styles.InputContainer}>
              <TextInput
                keyboardType="email-address"
                placeholder="Email Addreess"
                style={styles.textInput}
                placeholderTextColor="#0A213E"
                value={email}
                onChangeText={(e) => {
                  setEmail(e);
                }}
              />
            </View>
            <TouchableOpacity onPress={() => editProfile()}>
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
                  Save Changes
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyProfile;

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
    zIndex: 999,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: Dimensions.get('window').width - 40,
    paddingVertical: 15
  },
  sortReview: {
    backgroundColor: '#E6E7F1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15
  },
  searchFriend: {
    backgroundColor: '#E6E7F1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 80
  },
  review: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15
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
  friends: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    marginVertical: 5
  },
  direction: {
    backgroundColor: '#5F82E2',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  editScreen: {
    backgroundColor: '#5F82E2',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 5,
    zIndex: 999
  },
  InputContainer: {
    backgroundColor: '#F8F8F8',
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    fontSize: 18,
    paddingLeft: 15,
    borderRadius: 10
  },
  forms: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    marginTop: -30
  },
  button: {
    backgroundColor: '#1AC29A',
    margin: 20,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10
  }
});
