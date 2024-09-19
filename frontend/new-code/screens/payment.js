import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = ({ route }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [baseAmount, setBaseAmount] = useState(500); // Base amount
  const [latePenalty, setLatePenalty] = useState(0); // Late penalty amount
  const navigation = useNavigation();

  useEffect(() => {
    calculatePayment();
  }, []);

  const calculatePayment = async () => {
    try {
      const verificationDataString = await AsyncStorage.getItem("verificationData");
      if (verificationDataString !== null) {
        const verificationData = JSON.parse(verificationDataString);
  
        const startTime = new Date(verificationData.startDate);
        const currentTime = new Date();
        const timeDifference = Math.abs(currentTime - startTime); // Difference in milliseconds
  
        const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert difference to days
  
        if (dayDifference > 0) { 
          const penalty = 50 * dayDifference; // 50 penalty per day
          setLatePenalty(penalty); // Set late penalty
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to calculate payment.');
    }
  };
  

  const handleAgreeTerms = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleContinue = () => {
    
    const totalAmount = baseAmount + latePenalty;
  
    navigation.navigate('print', {
      baseAmount: baseAmount,
      latePenalty: latePenalty,
      totalAmount: totalAmount
    });
    

  };

  return (
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Add Payment</Text>
        <Text style={styles.amountText}>Base Amount: Rs. {baseAmount}</Text>
        <Text style={styles.amountText}>Late Penalty: Rs. {latePenalty}</Text>
        <Text style={styles.totalAmountText}>Total Amount: Rs. {baseAmount + latePenalty}</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        <View style={styles.expiryCVCContainer}>
          <TextInput
            style={[styles.input, styles.expiryInput]}
            placeholder="Expiry MM/YY"
            value={expiry}
            onChangeText={setExpiry}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.cvcInput]}
            placeholder="CVC"
            value={cvc}
            onChangeText={setCVC}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.termsContainer} onPress={handleAgreeTerms}>
          <Ionicons
            name={agreeTerms ? 'checkbox-outline' : 'square-outline'}
            size={20}
            color="#2FAB58"
          />
          <Text style={styles.checkboxText}>
            I agree to Terms and Conditions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.continueButton, { opacity: agreeTerms ? 1 : 0.5 }]}
          onPress={handleContinue}
          disabled={!agreeTerms}
        >
          <Text style={styles.continueText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  
    
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2FAB58',
    textAlign: 'center',
    marginBottom: 20,
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalAmountText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d9534f',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    maxWidth: 300,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  expiryCVCContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
    marginBottom: 20,
  },
  expiryInput: {
    width: '48%',
  },
  cvcInput: {
    width: '48%',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#2FAB58',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PaymentScreen;
