
import React from 'react';
import { View, Text, Button, Image, StyleSheet,TouchableOpacity } from 'react-native';

export default function StartScreen({ navigation }) {
  const handleStartPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.quickTaxText}>QuickTax</Text>
      <Image source={require('../assets/QuickTax.png')} style={styles.image} />
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.button} onPress={handleStartPress}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FF',
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    top:20,
    color:"#2FAB58"

  },
  quickTaxText: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color:"#3B3B3B",
    
  },
  image: {
    width: '90%',
    height: '40%',
    resizeMode: 'contain',
    marginBottom: 180,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    
    
  },
  button: {
    backgroundColor: '#2FAB58',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
