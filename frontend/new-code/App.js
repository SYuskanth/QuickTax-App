import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home'; 
import Notification from './Tab/Notification'; 
import Scanner from './screens/Scanner';
import Error from './Tab/error';
import OTPScreen from './screens/otp';
import VerificationScreen from './screens/verificationScreen';
import PrintScreen from './screens/printScreen';
import PaymentScreen from './screens/payment';
import PasswordReset from './screens/resetPassword';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    if (route.name === 'HomeTab') {
      return <Entypo name="home" size={size} color={color} />;
    } else if (route.name === 'NotificationTab') {
      return <Ionicons name="notifications-sharp" size={size} color={color} />;
    }
  },
  tabBarActiveTintColor: '#16247d',
  tabBarInactiveTintColor: '#111',
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#fff',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false }} />
        <Stack.Screen name="Error" component={Error} options={{ headerShown: false }} />
        <Stack.Screen name="otp" component={OTPScreen} options={{ headerShown: false }} />
        <Stack.Screen name="verificationScreen" component={VerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="print" component={PrintScreen} options={{ headerShown: true }} />
        <Stack.Screen name="resetpassword" component={PasswordReset} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
