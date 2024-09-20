import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

const Verification = () => {
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    telephone: '',
    gender: '',
    nicNo: '',
  });

  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve the email from local storage
    const fetchEmail = async () => {
      try {
        const userS = await AsyncStorage.getItem("user");
        const user = JSON.parse(userS)
        if (user) {

          setEmail(user.email);  // Correct parsing of JSON
        }
      } catch (error) {
        console.error('Failed to retrieve email from local storage:', error);
      }
    };

    fetchEmail();
  }, []);

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserData({ ...userData, nicPhoto: result.uri });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${API_URL}/user/updatedetails`, {
        email,
        ...userData,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Details updated successfully, we will update your verification');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Failed to update details');
      }
    } catch (error) {
      console.error('Error updating details:', error);
      Alert.alert('Error', 'An error occurred while updating details');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>User Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={[styles.input, styles.inputLarge]}
            placeholder="Enter your name"
            value={userData.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={[styles.input, styles.inputLarge]}
            placeholder="Enter your address"
            value={userData.address}
            onChangeText={(value) => handleInputChange('address', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telephone:</Text>
          <TextInput
            style={[styles.input, styles.inputLarge]}
            placeholder="Enter your telephone"
            value={userData.telephone}
            onChangeText={(value) => handleInputChange('telephone', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your gender"
            value={userData.gender}
            onChangeText={(value) => handleInputChange('gender', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>NIC No:</Text>
          <TextInput
            style={[styles.input, styles.inputLarge]}
            placeholder="Enter your NIC number"
            value={userData.nicNo}
            onChangeText={(value) => handleInputChange('nicNo', value)}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  inputLarge: {
    width: 300,
  },
  submitButton: {
    backgroundColor: '#2FAB58',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Verification;
