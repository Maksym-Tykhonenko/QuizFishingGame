import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Lvl4 = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [timer, setTimer] = useState(240);
  const [isRuning, setIsRuning] = useState(false);
  //console.log('isRuning==>', isRuning);
  const [modalIsClose, setModalIsClose] = useState(true);
  const [Lvl5Anlock, setLvl5Anlock] = useState(false);

  //////////// AsyncStorage
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [Lvl5Anlock]);

  const setData = async () => {
    try {
      const data = {
        Lvl5Anlock,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('Lvl4', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('Lvl4');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setLvl5Anlock(parsedData.Lvl5Anlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  ///Timer
  //эфект обратного отщета времени
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (isRuning) {
        setTimer(prevTimer => prevTimer - 1);
      }
    }, 1000);

    if (timer === 0) {
      clearInterval(timerInterval);
      Alert.alert(
        'GAME OVER!!!',
        'Go back and try again',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home');
            },
          },
        ],
        {cancelable: false},
      );
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, isRuning]);

  //формат времени
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  //oстановка таймера
  const handleChangeTimerRunState = () => {
    setIsRuning(!isRuning);
  };
  //////////////////////////////////////////
  const questions = [
    {
      //6
      question:
        'Which fishing method involves setting a longline with baited hooks at intervals along its length to catch fish?',
      options: [
        '-Trawling',
        '-Drifting',
        '-Seining',
        '-Longlining',
        '-Jigging',
      ],
      correctAnswer: '-Longlining',
    },
    {
      //7
      question:
        'What is the name for the practice of catching fish by attracting them with light during the night?',
      options: [
        '-Trawling',
        '-Drifting',
        '-Longlining',
        `-Purse seining`,
        '-Squid jigging',
      ],
      correctAnswer: '-Squid jigging',
    },
    {
      //8
      question:
        'Which of the following is a type of fishing gear consisting of a large cone-shaped net that is dragged along the seafloor?',
      options: ['-Gillnet', '-Trawl', '-Dredge', '-Trap', '-Seine'],
      correctAnswer: '-Dredge',
    },
    {
      //9
      question:
        'What is the term for the process of capturing fish in a large enclosure or net known as a "purse"?',
      options: [
        '-Trawling',
        '-Drifting',
        '-Longlining',
        '-Purse seining',
        '-Squid jigging',
      ],
      correctAnswer: '-Purse seining',
    },
    {
      //10
      question:
        'What is the name for the practice of catching fish by dropping baited hooks into the water from a stationary position?',
      options: [
        '-Trawling',
        '-Drifting',
        '-Longlining',
        '-Jigging',
        '-Still fishing',
      ],
      correctAnswer: '-Still fishing',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  //
  const displayQuestion = () => {
    const question = questions[currentQuestionIndex];
    return (
      <View
        style={{
          flex: 1,
          marginTop: 20,
          width: width * 0.9,
          //justifyContent: 'space-between',
        }}>
        <View
          style={{
            borderWidth: 3,
            borderRadius: 15,
            borderColor: '#ed9b01',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Chewy-Regular',
              //marginBottom: 20,
              color: '#ed9b01',
            }}>
            {question.question}
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
            alignItems: 'center',
            borderWidth: 3,
            borderRadius: 15,
            borderColor: '#ed9b01',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}>
          <ScrollView>
            {question.options.map((option, index) => (
              <TouchableOpacity
                disabled={isRuning ? false : true}
                key={index}
                onPress={() => checkAnswer(option)}>
                <Text
                  style={{
                    fontFamily: 'Chewy-Regular',
                    fontSize: 40,
                    color: '#ed9b01',
                  }}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
            <View style={{height: 100}}></View>
          </ScrollView>
        </View>
      </View>
    );
  };

  const checkAnswer = answer => {
    const question = questions[currentQuestionIndex];
    if (answer === question.correctAnswer) {
      setCorrectAnswersCount(correctAnswersCount + 1);
      Alert.alert('Correct!');
    } else {
      //Alert.alert('Incorrect answer. Try again.');
      navigation.navigate('WrongScreen');
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (correctAnswersCount === 4) {
        // Якщо всі 6 відповіді вірні
        setLvl5Anlock(true);
        setIsRuning(false);
        setTimeout(() => {
          navigation.navigate('Lvl5');
        }, 1000);
      } else {
        Alert.alert('Congratulations! You have completed all questions.');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/bcgr.jpeg')}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            position: 'relative',
            marginTop: 30,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#ed9b01',
              fontFamily: 'Chewy-Regular',
              fontSize: 45,
              //shadowColor: '#ed9b01',
              shadowOffset: {width: 0, height: 6},
              shadowOpacity: 9,
              shadowRadius: 20,
            }}>
            Level 4
          </Text>
          {/**Timer */}
          <View style={{alignItems: 'center', marginTop: 0}}>
            <View style={{flexDirection: 'row'}}>
              {isRuning ? (
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    paddingTop: 3,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 70,
                    width: 120,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: 2,
                    borderColor: '#fff',
                    borderRadius: 20,
                    shadowColor: '#fff',
                    shadowOffset: {width: 0, height: 18},
                    shadowOpacity: 0.9,
                    shadowRadius: 20,
                  }}
                  onPress={handleChangeTimerRunState}>
                  <Text
                    style={{
                      color: '#ed9b01',
                      fontFamily: 'Chewy-Regular',
                      fontSize: 45,
                      shadowColor: '#ed9b01',
                      shadowOffset: {width: 0, height: 18},
                      shadowOpacity: 0.9,
                      shadowRadius: 20,
                    }}>
                    Stop
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    paddingTop: 3,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 70,
                    width: 120,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: 2,
                    borderColor: '#fff',
                    borderRadius: 20,
                    shadowColor: '#fff',
                    shadowOffset: {width: 0, height: 18},
                    shadowOpacity: 0.9,
                    shadowRadius: 20,
                  }}
                  onPress={handleChangeTimerRunState}>
                  <Text
                    style={{
                      color: '#ed9b01',
                      fontFamily: 'Chewy-Regular',
                      fontSize: 45,
                      shadowColor: '#ed9b01',
                      shadowOffset: {width: 0, height: 18},
                      shadowOpacity: 0.9,
                      shadowRadius: 20,
                    }}>
                    Play
                  </Text>
                </TouchableOpacity>
              )}
              <View
                style={{
                  borderColor: '#fff',
                  borderRadius: 20,
                  borderWidth: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 70,
                  width: 130,
                  shadowColor: '#fff',
                  shadowOffset: {width: 0, height: 18},
                  shadowOpacity: 0.9,
                  shadowRadius: 20,
                }}>
                <Text
                  style={{
                    fontSize: 45,
                    color: '#ed9b01',
                    fontFamily: 'Chewy-Regular',
                    shadowColor: '#ed9b01',
                    shadowOffset: {width: 0, height: 18},
                    shadowOpacity: 0.9,
                    shadowRadius: 20,
                  }}>
                  {formatTime(timer)}
                </Text>
              </View>
            </View>
          </View>

          <View style={{flex: 1, alignItems: 'center'}}>
            {displayQuestion()}
          </View>

          {/**BTN BACK */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              borderWidth: 2,
              borderColor: '#fff',
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              shadowColor: '#fff',
              shadowOffset: {width: 0, height: 18},
              shadowOpacity: 0.9,
              shadowRadius: 20,
            }}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text
              style={{
                fontSize: 40,
                fontFamily: 'Chewy-Regular',
                color: '#ed9b01',
                shadowColor: '#ed9b01',
                shadowOffset: {width: 0, height: 18},
                shadowOpacity: 0.9,
                shadowRadius: 20,
              }}>
              Back
            </Text>
          </TouchableOpacity>
          <Modal animationType="fade" transparent={true} visible={modalIsClose}>
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                flex: 1,
                justifyContent: 'center',
                marginRight: '5%',
                marginLeft: '5%',
                marginVertical: '50%',
                paddingLeft: 10,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#fff',
                shadowColor: '#fff',
                shadowOffset: {width: 0, height: 18},
                shadowOpacity: 0.9,
                shadowRadius: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalIsClose(!modalIsClose);
                }}>
                <Text
                  style={{
                    fontSize: 40,
                    fontFamily: 'Chewy-Regular',
                    color: '#ed9b01',
                    shadowColor: '#ed9b01',
                    shadowOffset: {width: 0, height: 18},
                    shadowOpacity: 0.9,
                    shadowRadius: 20,
                  }}>
                  Fishing at sea 1.2
                </Text>
                <Text
                  style={{
                    fontSize: 40,
                    fontFamily: 'Chewy-Regular',
                    color: '#ed9b01',
                    shadowColor: '#ed9b01',
                    shadowOffset: {width: 0, height: 18},
                    shadowOpacity: 0.9,
                    shadowRadius: 20,
                  }}>
                  Tab for go to game
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Lvl4;
