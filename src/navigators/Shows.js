import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ShowsScreen from '../screens/Shows';
import ShowDetailsScreen from '../screens/ShowDetails';

const Stack = createStackNavigator();

export default function ShowsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Browse Shows"
        component={ShowsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="menu" size={26} color="#ffffff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Show Details" component={ShowDetailsScreen} />
    </Stack.Navigator>
  );
}
