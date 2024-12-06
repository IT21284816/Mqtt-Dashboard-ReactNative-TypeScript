import React from 'react';
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/home';
import Settings from './components/settings';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
      <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerLeft: () => (
              <Ionicons name="home" size={24} color="black" style={{ marginLeft: 20, marginRight:10 }} />  // Home Icon
            ),
          }}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
