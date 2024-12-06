import React from 'react';
import { StatusBar } from 'react-native'; // Import StatusBar
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/home';
import Settings from './components/settings';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Make sure StatusBar is visible and configured */}
      <StatusBar barStyle="light-content" />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
