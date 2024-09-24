import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarButtonClient from '../Components/Footer/CalanderButton/CalendarButtonClient';
import CalendarButton from '../Components/Footer/CalanderButton/CalendarButton';
import ClientCalendarButton from '../Components/Footer/CalanderButton/ClientCalendarButton';
import HomeButton from '../Components/Footer/HomeButton/HomeButton';
import SearchButton from '../Components/Footer/SearchButton/SearchButton';
import SettingsButton from '../Components/Footer/SettingsButton/SettingsButton';
import mailButton from '../../Notifications/Messaging';
import AdminPage from '../../ADMIN PAGES/Screens/adminPage';
import styles from './Style/styles';
import { StatusBar } from "expo-status-bar";
const Tab = createBottomTabNavigator();

// Function to get the icon name based on the route name and focus state
const getIconName = (routeName, focused) => {
  switch (routeName) {
    case 'Home':
      return focused ? 'home' : 'home-outline';
    case 'Settings':
      return focused ? 'settings' : 'settings-outline';
      case 'messaging':
      return focused ? 'mail-open-outline' : 'mail-outline';
    case 'Search':
      return focused ? 'search' : 'search-outline';
    case 'Calendar':
      return focused ? 'calendar' : 'calendar-outline';
    case 'ClientCalendar':
      return focused ? 'calendar' : 'calendar-outline';
    case 'Admin':
      return focused ? 'shield' : 'shield-outline';
    default:
      return 'home-outline';
  }
};

const HomeContainer = ({ route }) => {
  const { isAdmin } = route.params;

  return (
    
    <View style={styles.container}>
        <StatusBar
        barStyle="dark-content"  // Options: 'default', 'light-content', 'dark-content'
        backgroundColor="#ffffff"  // Background color of the status bar
        translucent={false}  // Set to true for a translucent status bar
        animated={true}  // Whether to animate status bar transitions
      />
      <Tab.Navigator
        initialRouteName={isAdmin ? 'Admin' : 'Home'}
        screenOptions={({ route }) => ({

          headerShadowVisible: false, 
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: 'red', 
          tabBarInactiveTintColor: '#B0BEC5', 
          headerTitleAlign: 'center', // Center the title
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = getIconName(route.name, focused);
            return (
              <View style={{ alignItems: 'center' }}>
                <Ionicons name={iconName} size={size} color={color} />
                {focused && (
                  <Text style={{ color, fontSize: 12 }}>
                    {route.name}
                  </Text>
                )}
              </View>
            );
          },
        })}
      >
  {isAdmin ?
        <Tab.Screen
          name={'Admin'}
          component={AdminPage}
          initialParams={{ isAdmin }} // Pass isAdmin as an initial parameter
          options={{
            tabBarLabel: () => null,
            headerShown: false, // Hide the header for this screen
          }}
        />
        :
        <Tab.Screen
        name="Home"
        component={HomeButton}
        initialParams={{ isAdmin }}
        options={{
          tabBarLabel: () => null,
          tabBarLabelShown: false, // Hide the tab bar label

        }}
      />
      
  }
        <Tab.Screen
          name={'Search'}
          component={SearchButton}
          initialParams={{ isAdmin }} // Pass isAdmin as an initial parameter
          options={{
            tabBarLabel: () => null,
            tabBarLabelShown: false, // Hide the tab bar label

          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingsButton}
          initialParams={{ isAdmin }} // Pass isAdmin as an initial parameter
          options={{
            tabBarLabel: () => null,
            tabBarLabelShown: false, // Hide the tab bar label
 
          }}
        />
         <Tab.Screen
          name='messaging'
          component={mailButton}
          initialParams={{ isAdmin }} // Pass isAdmin as an initial parameter
          options={{
            tabBarLabel: () => null,
            tabBarLabelShown: false, // Hide the tab bar label
            headerShown: true, // Hide the header for this screen
            headerTitle: 'Contacts',
          }}
        />
        <Tab.Screen
          name={isAdmin ? 'Calendar' : 'Calendar'}
          component={isAdmin ? CalendarButton : CalendarButtonClient}
          initialParams={{ isAdmin }} // Pass isAdmin as an initial parameter
          options={{
            tabBarLabel: () => null,
            tabBarLabelShown: false, // Hide the tab bar label

          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default HomeContainer;