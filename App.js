import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNavigator from './src/navigators/Home';
import ShowsNavigator from './src/navigators/Shows';
import EpisodesNavigator from './src/navigators/Episodes';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" hidden={false} />
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: { backgroundColor: '#1a1a2e' },
          drawerLabelStyle: { color: '#ffffff', fontSize: 16 },
          drawerActiveTintColor: '#7c6fff',
          drawerInactiveTintColor: '#9999bb',
        }}
      >
        <Drawer.Screen name="Home" component={HomeNavigator} />
        <Drawer.Screen name="Browse Shows" component={ShowsNavigator} />
        <Drawer.Screen name="Browse Episodes" component={EpisodesNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
