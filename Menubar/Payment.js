import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false); 
  const handleAgreeTerms = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleContinue = () => {
    alert("Didn't connect Database");
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Add Payment</Text>
      </View>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <View style={styles.expiryCVCContainer}>
          <TextInput
            style={[styles.input, styles.expiryInput]}
            placeholder="Expiry MM/YY"
            value={expiry}
            onChangeText={setExpiry}
          />
          <TextInput
            style={[styles.input, styles.cvcInput]}
            placeholder="CVC"
            value={cvc}
            onChangeText={setCVC}
          />
        </View>
        <TouchableOpacity style={styles.termsContainer} onPress={handleAgreeTerms}>
          <Ionicons
            name={agreeTerms ? 'checkbox-outline' : 'square-outline'}
            size={20}
            color="#2FAB58"
          />
          <Text style={[styles.checkboxText, { marginLeft: 8 }]}>
            I agree to Terms and Conditions here
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.continueButton, { opacity: agreeTerms ? 1 : 0.5 }]}
          onPress={handleContinue}
          disabled={!agreeTerms} 
        >
          <Text style={styles.continueText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headingContainer: {
    marginTop: 40,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2FAB58',
    textAlign: 'left',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Adjust this to flex-start to move items to the top
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  expiryCVCContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginBottom: 20, // Adjust this margin if needed
  },
  expiryInput: {
    width: 130,
  },
  cvcInput: {
    width: 130,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
  },
  continueButton: {
    width: 300,
    backgroundColor: '#2FAB58',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  continueText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PaymentScreen;
