import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Authentication Screens
import SignInScreen from './src/SignInScreen/screens/SignInScreen';
import LogOutScreen from './src/SettingsScreen/Components/LogOutScreen';
import ResetPasswordScreen from './src/SettingsScreen/Components/ResetPasswordScreen';

// Main Application Screens
import HomeScreen from './src/HomeScreen/screens/HomeContainer';
import CreateCustomer from './src/ADMIN PAGES/CRUD/Create/Customer/Customer';
import CreateEmployee from './src/ADMIN PAGES/CRUD/Create/Employee/Employee';
import AdminScreen from './src/ADMIN PAGES/Screens/adminPage';
import About from './src/ADMIN PAGES/AdminComponents/components/About';
import UpdateEntity from './src/ADMIN PAGES/CRUD/Update/UpdatePersonEntity';
import DeleteEntity from './src/ADMIN PAGES/CRUD/Delete/DeletePersonEntity';
import Pest from './src/ADMIN PAGES/CRUD/Create/Pest/CreatePest';
import viewPest from './src/ADMIN PAGES/CRUD/QueryAdmin/PestLibraryQuery';
import SearchScreen from './src/SearchScreen/screens/SearchScreen';
import ReportGenerateScreen from './src/ReportGenerateScreen/screen/generateScreen';
import { auth } from './src/Backend/DatabaseConnection/DataBaseAuth';
import PDF from './src/GeneratePdfScreen/GeneratePDF';
import ChatRoomScreen from './src/Notifications/ChatRoomScreen';
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

// Authentication Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator >
    <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
    <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: true, headerTitle: 'Change your password', headerBackTitleVisible: true, }} />
    <AuthStack.Screen name="LogOut" component={LogOutScreen} options={{ headerShown: true }}/>
  </AuthStack.Navigator>
);

// Main Application Navigator
const AppNavigator = () => (
  <AppStack.Navigator screenOptions={ {headerShown: false }}>
    <AppStack.Screen name="Pest Control Center" component={HomeScreen} />
    <AppStack.Screen name="CreateCustomer" component={CreateCustomer} options={{ headerTitle: 'Add customer contact', headerShown: true }} />
    <AppStack.Screen name="CreateEmployee" component={CreateEmployee} options={{ headerTitle: 'Add employee contact', headerShown: true }} />
    <AppStack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }}/>
    <AppStack.Screen name="About" component={About} options={{ headerShown: true }}/>
    <AppStack.Screen name="UpdateInfo" component={UpdateEntity} options={{ headerShown: true }}/>
    <AppStack.Screen name="DeleteInfo" component={DeleteEntity} options={{ headerShown: true }}/>
    <AppStack.Screen name="CreatePestEntry" component={Pest} options={{ headerShown: true }}/>
    <AppStack.Screen name="PestLibrary" component={viewPest} options={{ headerShown: true }}/>
    <AppStack.Screen name="Search" component={SearchScreen} />
    <AppStack.Screen name="Create Report" component={ReportGenerateScreen} options={{ headerShown: true }}/>
    <AppStack.Screen name="Generate a PDF File" component={PDF} options={{ headerShown: true }}/>
    <AppStack.Screen name="ChatRoom" component={ChatRoomScreen}  />
  </AppStack.Navigator>
);

// Root Navigator
const RootNavigator = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="Auth" component={AuthNavigator} />
    <RootStack.Screen name="App" component={AppNavigator} />
  </RootStack.Navigator>
);

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <NavigationContainer>
      {isSignedIn ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
