import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentScreen = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleAgreeTerms = () => {
    navigation.navigate('print');
  };

  const handleContinue = () => {
    
  };

  return (
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Add Payment</Text>
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
          <Text style={styles.continueText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingVertical: 30,
    backgroundColor: '#f9f9f9',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2FAB58',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 50
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
