import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {uid} from 'uid';

const ProfileScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [finalTimes, setFinalTimes] = useState([]);
  const [onChangeName, setOnChangeName] = useState('');
  const [name, setName] = useState();
  console.log('finalTime==>', finalTimes);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState(null);
  const [avatar, setAvatart] = useState(null);
  const [selected, setSelected] = useState('');
  const [scoreTime, setScoreTime] = useState('');
  const [scoreEvent, setScoreEvent] = useState([]);
  console.log('scoreEvent==>', scoreEvent);

  useEffect(() => {
    getData();
    //getDataFrom1Lvl();
  }, []);

  useEffect(() => {
    setData();
  }, [
    wallpaper,
    avatar,
    name,
    scoreEvent,
    //finalTime
  ]); // Додано finalTime

  const setData = async () => {
    try {
      const data = {
        //finalTime,
        wallpaper,
        avatar,
        name,
        scoreEvent,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('ProfileScreen', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getDataFrom1Lvl = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('Lvl1');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);

        setFinalTimes([...finalTimes, parsedData.finalTime]);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('ProfileScreen');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        //setFinalTimes(parsedData.finalTime);
        setWallpaper(parsedData.wallpaper);
        setAvatart(parsedData.avatar);
        setName(parsedData.name);
        setScoreEvent(parsedData.scoreEvent);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const handleSeveName = () => {
    setName(onChangeName);
    setOnChangeName('');
  };

  const WallpaperPicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        console.log('response==>', response.assets[0].uri);
        setWallpaper(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const AvatartPicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        console.log('response==>', response.assets[0].uri);
        setAvatart(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const handlSaveScoreEvent = () => {
    let newScoreEvent = {
      data: selected,
      score: scoreTime,
    };

    setScoreEvent([...scoreEvent, newScoreEvent]);

    setSelected('');
    setScoreTime('');
    setModalIsOpen(false);
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/bcgr.jpeg')}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            position: 'relative',
            alignItems: 'center',
          }}>
          {/**Avatar Block */}
          {!wallpaper ? (
            <TouchableOpacity
              onPress={() => {
                WallpaperPicker();
              }}
              style={{
                width: width * 0.95,
                height: 250,
                marginTop: 50,
                borderWidth: 3,
                borderRadius: 15,
                borderColor: '#44a941',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#fff',
                shadowOffset: {width: 0, height: 18},
                shadowOpacity: 0.4,
                shadowRadius: 6,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}>
              <Text
                style={{
                  color: '#44a941',

                  fontSize: 40,
                }}>
                Tab for change
              </Text>
              <Text
                style={{
                  color: '#44a941',

                  fontSize: 40,
                }}>
                background
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                WallpaperPicker();
              }}
              style={{
                width: width * 0.95,
                height: 250,
                marginTop: 50,
                borderWidth: 3,
                borderRadius: 15,
                borderColor: '#44a941',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#fff',
                shadowOffset: {width: 0, height: 18},
                shadowOpacity: 0.4,
                shadowRadius: 6,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}>
              <Image
                style={{
                  width: width * 0.95,
                  height: 250,
                  borderWidth: 3,
                  borderRadius: 15,
                  borderColor: '#44a941',
                }}
                source={{uri: wallpaper}}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              AvatartPicker();
            }}
            style={{marginTop: -80}}>
            {!avatar ? (
              <Image
                style={{width: 200, height: 200}}
                source={require('../assets/free-icon-contact-11456604.png')}
              />
            ) : (
              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 150,
                  borderWidth: 3,
                  borderColor: '#44a941',
                }}
                source={{uri: avatar}}
              />
            )}
          </TouchableOpacity>

          {/**NAME */}
          {!name ? (
            <View
              style={{
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <TextInput
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                placeholder="Enter your name..."
                value={onChangeName}
                onChangeText={setOnChangeName}
                style={{
                  shadowOffset: {width: 3, height: 4},
                  shadowOpacity: 0.8,
                  elevation: 9,
                  marginTop: 5,
                  marginBottom: 15,
                  paddingLeft: 10,
                  fontSize: 20,
                  borderWidth: 3,
                  borderColor: '#44a941',
                  color: '#000',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: 15,
                  width: 280,
                  height: 60,
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  handleSeveName();
                }}
                style={{marginBottom: 9}}>
                <Image
                  source={require('../assets/free-icon-check-box-4561593.png')}
                  style={{width: 60, height: 70}}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  color: '#44a941',
                  fontWeight: 'bold',
                  fontSize: 60,
                }}>
                {name}
              </Text>
            </View>
          )}

          {/**Best Score block */}
          <View>
            <TouchableOpacity
              onPress={() => {
                setModalIsOpen(true);
              }}
              style={{
                borderWidth: 2,
                borderColor: '#44a941',
                borderRadius: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                shadowColor: '#fff',
                shadowOffset: {width: 0, height: 18},
                shadowOpacity: 0.9,
                shadowRadius: 20,
              }}>
              <Text
                style={{
                  color: '#44a941',
                  fontSize: 35,
                }}>
                Tab to enter the result
              </Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {scoreEvent.map(e => {
                  return (
                    <View
                      style={{
                        marginTop: 10,
                        borderWidth: 3,
                        borderColor: '#44a941',
                        borderRadius: 20,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      }}
                      key={uid()}>
                      <Text
                        style={{
                          color: '#44a941',

                          fontSize: 30,
                        }}>
                        Data: {e.data}
                      </Text>
                      <Text
                        style={{
                          color: '#44a941',

                          fontSize: 35,
                        }}>
                        Score: {e.score}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/**BTN BACK */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              borderWidth: 2,
              borderColor: '#44a941',
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              shadowColor: '#fff',
              shadowOffset: {width: 0, height: 18},
              shadowOpacity: 0.9,
              shadowRadius: 20,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              style={{
                fontSize: 40,
                color: '#44a941',
                shadowColor: '#44a941',
                shadowOffset: {width: 0, height: 18},
                shadowOpacity: 0.9,
                shadowRadius: 20,
              }}>
              Back
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            //visible={modalClose}
            visible={modalIsOpen}>
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                paddingTop: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                flex: 1,
                marginRight: '5%',
                marginLeft: '5%',
                marginTop: '35%',
                marginBottom: '35%',
                borderRadius: 15,
                borderWidth: 5,
                borderColor: '#44a941',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalIsOpen(false);
                }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  marginTop: 15,
                  borderWidth: 2,
                  borderColor: '#44a941',
                  borderRadius: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  shadowColor: '#fff',
                  shadowOffset: {width: 0, height: 18},
                  shadowOpacity: 0.9,
                  shadowRadius: 20,
                  width: 60,
                  height: 60,
                }}>
                <Text
                  style={{
                    fontSize: 40,

                    color: '#44a941',
                    shadowColor: '#44a941',
                    shadowOffset: {width: 0, height: 18},
                    shadowOpacity: 0.9,
                    shadowRadius: 20,
                  }}>
                  X
                </Text>
              </TouchableOpacity>

              <ScrollView
                style={{marginTop: 50}}
                showsVerticalScrollIndicator={false}>
                <TextInput
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  placeholder="Enter your time..."
                  value={scoreTime}
                  onChangeText={setScoreTime}
                  style={{
                    shadowOffset: {width: 3, height: 4},
                    shadowOpacity: 0.8,
                    elevation: 9,
                    marginTop: 5,
                    marginBottom: 15,
                    paddingLeft: 10,
                    fontSize: 20,
                    borderWidth: 3,
                    borderColor: '#44a941',
                    color: '#000',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: 15,
                    width: 280,
                    height: 60,
                  }}
                />

                <Calendar
                  style={{borderRadius: 15}}
                  onDayPress={day => {
                    setSelected(day.dateString);
                  }}
                  markedDates={{
                    [selected]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedDotColor: 'orange',
                    },
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    handlSaveScoreEvent();
                  }}
                  style={{
                    marginTop: 15,
                    borderWidth: 2,
                    borderColor: '#44a941',
                    borderRadius: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    shadowColor: '#fff',
                    shadowOffset: {width: 0, height: 18},
                    shadowOpacity: 0.9,
                    shadowRadius: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 40,

                      color: '#44a941',
                      shadowColor: '#44a941',
                      shadowOffset: {width: 0, height: 18},
                      shadowOpacity: 0.9,
                      shadowRadius: 20,
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
                <View style={{height: 200}}></View>
              </ScrollView>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
