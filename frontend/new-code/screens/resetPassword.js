import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';

const PasswordReset = ({navigation}) => {
  const [step, setStep] = useState(1); // Track which step the user is on
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailSubmit = async () => {

    try {
        // Send OTP request to backend
        const response = await axios.post(`${API_URL}/otp/send`, {
            email: email
        });
    
        console.log('OTP sent:', response.data); 
    
      } catch (error) {
        
        const errorMessage = error.response?.data?.message || 'Failed to send OTP';
        console.log(errorMessage)
        Alert.alert('Error', errorMessage);
      }

    
    Alert.alert('OTP Sent', 'An OTP has been sent to your email.');
    setStep(2);
  };

  const handleOTPSubmit = async () => {

    try {
      const response = await fetch(`${API_URL}/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // Replace with the user's email or identifier
          otp: otp, // Assuming 'otp' is the entered OTP
        }),
      });
  
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        Alert.alert('OTP Verified', 'OTP verified successfully.');
        setStep(3); // Move to the next step (e.g., password reset)
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP');
    }
  };
  

  const handleChangePassword = async () => {

   
    try {
        const password = newPassword;
        const response = await axios.put(
          `${API_URL}/user/update`,
          { email, password }
        );
  
        if (response.status === 200) {
          Alert.alert('Success', 'Your details have been updated successfully.');
          navigation.navigate('Login'); 
        } else {
          Alert.alert('Update Failed', response.data.message || 'Failed to update details.');
        }
      } catch (error) {
        console.error(error.data.message); // Log the error for debugging
      }
    };

    
  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.heading}>Reset Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleEmailSubmit}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.heading}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOTP}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleOTPSubmit}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.heading}>Change Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  stepContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2FAB58',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2FAB58',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PasswordReset;
