import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerificationScreen({ route }) {
  const { verificationData } = route.params;
  const [user, setUser] = useState("");
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats as MM/DD/YYYY or based on locale
  };

  useEffect(async () => {
    try {
      const userDataString = await AsyncStorage.getItem("user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        console.log('User data retrieved:', userData);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${API_URL}/otp/send`, {
        email: verificationData.email // Use the correct field for email
      });

      console.log('OTP sent:', response.data);

      navigation.navigate('otp', { email: verificationData.email }); // Pass email to OTP page

    } catch (error) {
      // Handle error
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      console.log(error);
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{verificationData.name}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{verificationData.address}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Telephone:</Text>
          <Text style={styles.value}>{verificationData.telephone}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>NIC No:</Text>
          <Text style={styles.value}>{verificationData.nicNo}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Registration No:</Text>
          <Text style={styles.value}>{verificationData.regNo}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Engine No:</Text>
          <Text style={styles.value}>{verificationData.engNo}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Chassis No:</Text>
          <Text style={styles.value}>{verificationData.chassisNo}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Fuel Type:</Text>
          <Text style={styles.value}>{verificationData.fuelType}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>{verificationData.model}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Starting Date:</Text>
          <Text style={styles.value}>{formatDate(verificationData.startDate)}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Expiry Date:</Text>
          <Text style={styles.value}>{formatDate(verificationData.expiryDate)}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, { color: verificationData.status ? 'green' : 'red' }]}>
            {verificationData.status ? "Passed" : "Failed"}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>*ref:</Text>
          <Text style={[styles.value, { color: verificationData.status ? 'green' : 'red' }]}>
            {user._id}
          </Text>
        </View>

        {verificationData.status && (
          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
            <Text style={styles.buttonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F5EDED',
    marginTop: 20,
    justifyContent: 'center',
    alignItems : 'center',

  },
  contentContainer: {
    marginVertical: 20, // Space from top and bottom
  },
  detailContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#555',
    textAlign: 'right',
  },
  paymentButton: {
    backgroundColor: '#2FAB58',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
