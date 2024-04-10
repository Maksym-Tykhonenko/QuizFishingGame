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

const Lvl9 = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [timer, setTimer] = useState(140);
  const [isRuning, setIsRuning] = useState(false);
  //console.log('isRuning==>', isRuning);
  const [modalIsClose, setModalIsClose] = useState(true);
  const [Lvl10Anlock, setLvl10Anlock] = useState(false);

  //////////// AsyncStorage
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [Lvl10Anlock]);

  const setData = async () => {
    try {
      const data = {
        Lvl10Anlock,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('Lvl9', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('Lvl9');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setLvl10Anlock(parsedData.Lvl10Anlock);
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
  //////////////////////////////////////////
  const questions = [
    {
      //1
      question:
        'Which of the following types of fishing boats is designed for use in shallow waters and features a flat bottom?',
      options: ['-Yacht', '-Trawler', '-Jon boat', '-Sailboat', '-Cruiser'],
      correctAnswer: '-Jon boat',
    },
    {
      //2
      question:
        'What is the term for a small, lightweight fishing boat propelled by oars or paddles?',
      options: ['-Skiff', '-Trawler', '-Yacht', `-Dinghy`, '-Cabin cruiser'],
      correctAnswer: '-Dinghy',
    },
    {
      //3
      question:
        'Which type of fishing boat is characterized by a large open deck and a high gunwale, providing ample space for angling?',
      options: ['-Bass boat', '-Trawler', '-Canoe', '-Kayak', '-Pontoon boat'],
      correctAnswer: '-Bass boat',
    },
    {
      //4
      question:
        'What is the name for the fishing boat with a trawling net extended from the stern and is used for commercial fishing?',
      options: ['-Skiff', '-Yacht', '-Trawler', '-Canoe', '-Jon boat'],
      correctAnswer: '-Trawler',
    },
    {
      //5
      question:
        'Which of the following is a fishing boat with a cabin for shelter and accommodation, commonly used for overnight trips?',
      options: ['-Kayak', '-Canoe', '-Yacht', '-Sailboat', '-Cruiser'],
      correctAnswer: '-Yacht',
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
            borderColor: '#44a941',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              padding: 5,
              color: '#44a941',
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
            borderColor: '#44a941',
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
                    fontWeight: 'bold',
                    fontSize: 40,
                    color: '#44a941',
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
      navigation.navigate('Wrong');
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (correctAnswersCount === 4) {
        // Якщо всі 6 відповіді вірні
        setLvl10Anlock(true);
        setIsRuning(false);
        setTimeout(() => {
          navigation.navigate('Lvl10');
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
              color: '#44a941',
              fontWeight: 'bold',
              fontSize: 45,
              //shadowColor: '#44a941',
              shadowOffset: {width: 0, height: 6},
              shadowOpacity: 9,
              shadowRadius: 20,
            }}>
            Level 9
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
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderWidth: 2,
                    borderColor: '#44a941',
                    borderRadius: 20,
                    shadowColor: '#fff',
                    shadowOffset: {width: 0, height: 18},
                    shadowOpacity: 0.9,
                    shadowRadius: 20,
                  }}
                  onPress={handleChangeTimerRunState}>
                  <Text
                    style={{
                      color: '#44a941',
                      fontWeight: 'bold',
                      fontSize: 45,
                      shadowColor: '#44a941',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderWidth: 2,
                    borderColor: '#44a941',
                    borderRadius: 20,
                    shadowColor: '#fff',
                    shadowOffset: {width: 0, height: 18},
                    shadowOpacity: 0.9,
                    shadowRadius: 20,
                  }}
                  onPress={handleChangeTimerRunState}>
                  <Text
                    style={{
                      color: '#44a941',
                      fontWeight: 'bold',
                      fontSize: 45,
                      shadowColor: '#44a941',
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
                  borderColor: '#44a941',
                  borderRadius: 20,
                  borderWidth: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
                    color: '#44a941',
                    fontWeight: 'bold',
                    shadowColor: '#44a941',
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
              navigation.navigate('Home');
            }}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: '#44a941',
                shadowColor: '#44a941',
                shadowOffset: {width: 0, height: 18},
                shadowOpacity: 0.9,
                shadowRadius: 20,
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Lvl9;
