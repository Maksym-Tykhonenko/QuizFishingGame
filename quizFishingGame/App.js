import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import LvlSelectScreen from './screens/LvlSelectScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import RulesScreen from './screens/RulesScreen';
import VinScreen from './screens/VinScreen';
import WrongScreen from './screens/WrongScreen';
import Lvl1 from './screens/lvls/1Lvl';
import Lvl2 from './screens/lvls/2Lvl';
import Lvl3 from './screens/lvls/3Lvl';
import Lvl4 from './screens/lvls/4Lvl';
import Lvl5 from './screens/lvls/5Lvl';
import Lvl6 from './screens/lvls/6Lvl';
import Lvl7 from './screens/lvls/7Lvl';
import Lvl8 from './screens/lvls/8Lvl';
import Lvl9 from './screens/lvls/9Lvl';
import Lvl10 from './screens/lvls/10Lvl';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LvlSelect"
          component={LvlSelectScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Rules"
          component={RulesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Vin"
          component={VinScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wrong"
          component={WrongScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvl1"
          component={Lvl1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvl2"
          component={Lvl2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvl3"
          component={Lvl3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvl4"
          component={Lvl4}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvl5"
          component={Lvl5}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvl6"
          component={Lvl6}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvl7"
          component={Lvl7}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvl8"
          component={Lvl8}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvl9"
          component={Lvl9}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Lvl10"
          component={Lvl10}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
