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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation}) => {
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
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderColor: '#fff',
              borderRadius: 20,
              width: 250,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('LvlSelect');
            }}>
            <Text
              style={{
                fontSize: 70,
                fontWeight: 'bold',
                color: '#ed9b01',
                shadowColor: '#ed9b01',
                shadowOffset: {width: 0, height: 18},
                shadowOpacity: 0.9,
                shadowRadius: 10,
              }}>
              Game
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderColor: '#fff',
              borderRadius: 20,
              width: 250,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('Rules');
            }}>
            <Text
              style={{
                fontSize: 70,
                fontWeight: 'bold',
                color: '#ee9b01',
                shadowColor: '#ed9b01',
                shadowOffset: {width: 0, height: 18},
                shadowOpacity: 0.9,
                shadowRadius: 20,
              }}>
              Rules
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 40,
              left: 20,
              borderWidth: 2,
              borderColor: '#fff',
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 90,
              height: 90,
              shadowColor: '#fff',
              shadowOffset: {width: 0, height: 18},
              shadowOpacity: 0.9,
              shadowRadius: 20,
            }}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <MaterialCommunityIcons
              name="face-man"
              style={{fontSize: 70, color: '#ed9b01'}}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
