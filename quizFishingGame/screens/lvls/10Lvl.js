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

const Lvl10 = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [timer, setTimer] = useState(120);
  const [isRuning, setIsRuning] = useState(false);
  //console.log('isRuning==>', isRuning);
  const [modalIsClose, setModalIsClose] = useState(true);

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
      //6
      question:
        'What is the term for the process of using multiple fishing lines or nets towed behind a fishing boat?',
      options: [
        '-Trawling',
        '-Drifting',
        '-Longlining',
        '-Seining',
        '-Trolling',
      ],
      correctAnswer: '-Trolling',
    },
    {
      //7
      question:
        'Which type of fishing boat is designed for use in rivers and features a flat-bottomed hull with a squared-off bow?',
      options: ['-Skiff', '-Trawler', '-Jon boat', `-Yacht`, '-Cruiser'],
      correctAnswer: '-Jon boat',
    },
    {
      //8
      question:
        'What is the term for the small boat used by anglers to access fishing spots near the shore or in shallow waters?',
      options: ['-Canoe', '-Dinghy', '-Yacht', '-Trawler', '-Pontoon boat'],
      correctAnswer: '-Dinghy',
    },
    {
      //9
      question:
        'Which of the following fishing boats is powered by sails and used for recreational sailing and fishing?',
      options: ['-Trawler', '-Kayak', '-Canoe', '-Sailboat', '-Skiff'],
      correctAnswer: '-Sailboat',
    },
    {
      //10
      question:
        'What is the name for the fishing boat equipped with specialized gear for catching large fish such as tuna or marlin?',
      options: [
        '-Sportfishing boat',
        '-Trawler',
        '-Kayak',
        '-Canoe',
        '-Dinghy',
      ],
      correctAnswer: '-Sportfishing boat',
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

        setIsRuning(false);
        setTimeout(() => {
          navigation.navigate('Vin');
        }, 1000);
      } else {
        Alert.alert('Congratulations! You have completed all questions.');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/bgraund.png')}
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
            Level 10
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

export default Lvl10;
