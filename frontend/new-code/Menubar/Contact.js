import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ContactScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (email.trim() === '' || message.trim() === '') {
      // If either email or message is empty
      Alert.alert('Error', 'Enter Email and Message');
    } else {
      // If both email and message are filled
      // Implement your logic for handling the submission
      console.log('Email:', email);
      console.log('Message:', message);
      Alert.alert('Success', 'Message submitted successfully!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.contactHeading}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Add Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Enter Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={5}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contactHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom:50,
    textAlign: 'left', // Changed to 'left' for left alignment
    color: '#2FAB58',
    alignSelf: 'flex-start', // Ensure the heading takes full width of the container
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  messageInput: {
    height: 250,
    textAlignVertical: 'top',
  },
  submitButton: {
    width: 300,
    backgroundColor: '#2FAB58',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ContactScreen;
