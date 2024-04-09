import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {useWindowDimensions} from 'react-native';

const VinScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/resultViktory.jpg')}
        style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 60,
              fontFamily: 'Chewy-Regular',
              color: '#ed9b01',
              shadowColor: '#ed9b01',
              shadowOffset: {width: 0, height: 18},
              shadowOpacity: 0.9,
              shadowRadius: 20,
            }}>
            Congrat!!!
          </Text>
          <Text
            style={{
              fontSize: 60,
              fontFamily: 'Chewy-Regular',
              color: '#ed9b01',
              shadowColor: '#ed9b01',
              shadowOffset: {width: 0, height: 18},
              shadowOpacity: 0.9,
              shadowRadius: 20,
            }}>
            You are a
          </Text>
          <Text
            style={{
              fontSize: 60,
              fontFamily: 'Chewy-Regular',
              color: '#ed9b01',
              shadowColor: '#ed9b01',
              shadowOffset: {width: 0, height: 18},
              shadowOpacity: 0.9,
              shadowRadius: 20,
            }}>
            winner!!!
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={{
              marginTop: 20,
              width: '75%',
              height: 70,
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
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default VinScreen;
