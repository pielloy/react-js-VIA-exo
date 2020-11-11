import * as React from 'react';
import { StyleSheet, NavigationContainer, StatusBar, Image } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators  } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import HomeScreen from './views/Home_screen/Home_screen';
import MenuScreen from './views/Menu_screen/Menu_screen';
import MHScreen from './views/MH_screen/ArmorDisplay'
import ARScreen from './views/Map_screen/Marker';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTransition = {
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            })
          }
        ],
      },
      overlayStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
          }),
        },
      ]}
    };
  },
}

function test () {
  return (
    <Tab.Navigator tabBarOptions={{ showIcon: true }}>
      <Tab.Screen name="GOOGLE" component={ARScreen} options={{tabBarLabel: 'Google map', headerShown: true, animationEnabled: false }}/>
      <Tab.Screen name="MH" component={MHScreen} options={{title: 'API monster hunter', headerShown: true, animationEnabled: false,  showIcon: true }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false,
        }} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Custom animations', ...MyTransition}} />
        <Stack.Screen name="Test" component= {test} options={{title: 'Custom animations', ...MyTransition}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* 



*/
