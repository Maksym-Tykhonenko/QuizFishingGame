import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useWindowDimensions} from 'react-native';

const RulesScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/bcgr.jpeg')}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            position: 'relative',
          }}>
          <View
            style={{
              flex: 1,
              marginTop: 40,
              marginBottom: 20,
              marginHorizontal: 10,
              paddingVertical: 15,
              paddingHorizontal: 5,
              borderWidth: 3,
              borderColor: '#44a941',
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}>
            <ScrollView>
              <Text
                style={{
                  fontSize: 25,
                  color: '#44a941',
                  fontWeight: 'bold',
                  marginBottom: 20,
                }}>
                Welcome to 'Quiz Fishing Game' - an exhilarating exploration
                into the world of fishing! Here's what you need to know:
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: '#44a941',
                  marginBottom: 20,
                }}>
                Embark on a journey through 10 diverse levels, each delving into
                a unique facet of fishing: from general trivia to sea, river,
                winter, and boat fishing.
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: '#44a941',
                  marginBottom: 20,
                }}>
                Feel the pressure of time as each question must be answered
                swiftly, with the time allocated for each level decreasing as
                you progress.
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: '#44a941',
                  marginBottom: 20,
                }}>
                Success awaits those who can navigate the challenges - answering
                all questions correctly within the time frame propels you to the
                next level.
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: '#44a941',
                  marginBottom: 20,
                }}>
                Precision and speed are key to advancing through each level
                successfully.
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: '#44a941',
                  marginBottom: 20,
                }}>
                Be prepared for a wide array of fishing-related topics in each
                level, ensuring an exciting and varied experience.
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: '#44a941',
                  fontWeight: 'bold',
                  marginBottom: 20,
                }}>
                Are you ready to put your fishing knowledge to the test? Dive
                into the 'Quiz Fishing Game' adventure today!
              </Text>
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

export default RulesScreen;
