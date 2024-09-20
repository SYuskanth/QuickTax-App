import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from '@env';

const OTPScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputs = useRef([]);
  const { email } = route.params; // Assuming the email is passed as a route parameter

  const handleChange = async (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.join('').length === 4) {
      setIsVerifying(true);
      try {
        const response = await fetch(`${API_URL}/otp/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email, // Replace with the user's email or identifier
            otp: newOtp.join('')
          }),
        });

        const data = await response.json();
        if (response.ok) {
          navigation.navigate('payment'); // Or navigate to the payment screen
        } else {
          Alert.alert('Error', data.message || 'Invalid OTP');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to verify OTP');
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const resendOTP = async () => {
    try {
      const response = await fetch(`${API_URL}/otp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email // Replace with the user's email or identifier
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('OTP Resent', 'A new OTP has been sent to your email.');
      } else {
        Alert.alert('Error', data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.mainCon}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="#000" />
            </Pressable>
          </View>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Ionicons name="key" size={100} color="#000" />
            </View>
            <View style={styles.otpContent}>
              <Text style={styles.title}>Enter OTP</Text>
              <Text style={styles.description}>A 4 digit code has been sent to</Text>
              <Text style={styles.phoneNumber}>{email}</Text>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    ref={(ref) => (inputs.current[index] = ref)}
                    editable={!isVerifying}
                  />
                ))}
              </View>
              <Pressable onPress={resendOTP}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    flex: 1,
    backgroundColor: '#2FAB58',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  otpContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
  resendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OTPScreen;
