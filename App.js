import * as React from 'react';
import { NavigationContainer, StatusBar  } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';

import HomeScreen from './views/Home_screen/Home_screen';
import MenuScreen from './views/Menu_screen/Menu_screen';
import ARScreen from './views/AR_screen/AR_screen';

const Stack = createStackNavigator();





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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false,
        }} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Custom animations', ...MyTransition}}/>
        <Stack.Screen name="Game" component={MenuScreen} options={{title: 'Custom animations', ...MyTransition}}/>
        <Stack.Screen name="AR" component={ARScreen} options={{title: 'Custom animations', ...MyTransition}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*



*/
