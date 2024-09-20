import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Error = ({ navigation }) => {
  const returnHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.titleText}>Oops!</Text>
        <Text style={styles.messageText}>Your test has failed.</Text>
        <TouchableOpacity style={styles.homeButton} onPress={returnHome}>
          <Text style={styles.homeButtonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  messageContainer: {
    backgroundColor: '#FF4C4C',
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: '#2FAB58',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Error;
