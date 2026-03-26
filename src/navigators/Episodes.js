import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import EpisodesScreen from '../screens/Episodes';

const Stack = createStackNavigator();

export default function EpisodesNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={26} color="#ffffff" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen name="Browse Episodes" component={EpisodesScreen} />
    </Stack.Navigator>
  );
}
