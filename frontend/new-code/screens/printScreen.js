import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function PrintScreen({ route, navigation }) {
  const [verificationData, setVerificationData] = useState(null);
  const [userData, setUserData] = useState(null);
  const { baseAmount, latePenalty, totalAmount } = route.params;
  const [date, setdate] = useState(new Date());

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats as MM/DD/YYYY or based on locale
  };

  useEffect(async () => {
      try {
        
        const verificationDataString = await AsyncStorage.getItem("verificationData");
        const userDataString = await AsyncStorage.getItem("user");

        if (verificationDataString !== null) {
          setVerificationData(JSON.parse(verificationDataString));
        } else {
          Alert.alert('No Data', 'Verification data not found.');
        }

        if (userDataString !== null) {
          setUserData(JSON.parse(userDataString));
        } else {
          Alert.alert('No User Data', 'User data not found.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to retrieve data.');
      }
  
  }, []);

  const generatePDF = async () => {
    try {
      const htmlContent = `
        <html>
        <head>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              padding: 20px; 
              background-color: #f5f5f5;
            }
            .container { 
              margin: 0 auto; 
              padding: 20px; 
              width: 100%; 
              max-width: 600px; 
              background-color: #ffffff; 
              box-shadow: 0 4px 8px rgb(248, 237, 227); 
              border-radius: 8px; 
            }
            .header { 
              text-align: center; 
              margin-bottom: 20px; 
              color: #2FAB58;
            }
            .header h1 { 
              margin: 0; 
              font-size: 24px; 
              font-weight: bold;
            }
            .detail { 
              margin-bottom: 15px; 
              display: flex; 
              justify-content: space-between; 
              border-bottom: 1px solid #f0f0f0;
              padding-bottom: 10px;
            }
            .label { 
              font-weight: bold; 
              font-size: 16px; 
              color: #333;
            }
            .value { 
              font-size: 16px; 
              color: #666;
            }
            .footer { 
              text-align: center; 
              margin-top: 20px; 
              font-size: 12px; 
              color: #aaa;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Vehicle Revenue Licence</h1>
            </div>
            <div class="detail">
              <span class="label">Name:</span>
              <span class="value">${verificationData.name}</span>
            </div>
            <div class="detail">
              <span class="label">Address:</span>
              <span class="value">${verificationData.address}</span>
            </div>
            <div class="detail">
              <span class="label">NIC No:</span>
              <span class="value">${verificationData.nicNo}</span>
            </div>
            <div class="detail">
              <span class="label">REG ID:</span>
              <span class="value">${verificationData.regNo}</span>
            </div>
             <div class="detail">
              <span class="label">Fuel Type:</span>
              <span class="value">${verificationData.fuelType}</span>
            </div>
             <div class="detail">
              <span class="label">MODEL:</span>
              <span class="value">${verificationData.model}</span>
            </div>
             <div class="detail">
              <span class="label">chassis No:</span>
              <span class="value">${verificationData.chassisNo}</span>
            </div>
             <div class="detail">
              <span class="label">Starting Date:</span>
              <span class="value">${formatDate(verificationData.startDate)}</span>
            </div>
             <div class="detail">
              <span class="label">Expiry Date</span>
              <span class="value">${formatDate(verificationData.expiryDate)}</span>
            </div>
            <div class="detail">
              <span class="label">Applied Date:</span>
              <span class="value">${date.toLocaleDateString()}</span>
            </div>
            <div class="detail">
              <span class="label">Base Amount:</span>
              <span class="value">${baseAmount}</span>
            </div>
            <div class="detail">
              <span class="label">Penalty Amount:</span>
              <span class="value">${latePenalty}</span>
            </div>
             <div class="detail">
              <span class="label">Total Amount:</span>
              <span class="value">${totalAmount}</span>
            </div>
            
            <div class="detail">
            <span class="label">Ref ID:</span>
            <span class="value">${userData?._id || 'N/A'}</span>
          </div>
           <div class="detail">
            <span class="label">Status:</span>
            <span class="value">Passed</span>
          </div>

            <div class="footer">
              <p>&copy; 2024 Vehicle Revenue Licence Department</p>
            </div>
          </div>
        </body>
        </html>
      `;
  
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  
      Alert.alert('Success', `PDF saved to ${uri}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF.');
    }
  };
  
  if (!verificationData || !userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Vehicle Revenue Licence</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.detail}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{verificationData.name}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{verificationData.address}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>NIC No:</Text>
          <Text style={styles.value}>{verificationData.nicNo}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>REG ID:</Text>
          <Text style={styles.value}>{verificationData.regNo}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Fuel Type:</Text>
          <Text style={styles.value}>{verificationData.fuelType}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>{verificationData.model}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Chassis No:</Text>
          <Text style={styles.value}>{verificationData.chassisNo}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Starting Date:</Text>
          <Text style={styles.value}>{formatDate(verificationData.startDate)}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Expiry Date:</Text>
          <Text style={styles.value}>{formatDate(verificationData.expiryDate)}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Applied Date:</Text>
          <Text style={styles.value}>{date.toLocaleDateString()}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Base Amount:</Text>
          <Text style={styles.value}>{baseAmount}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Penalty Amount:</Text>
          <Text style={styles.value}>{latePenalty}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Total Amount:</Text>
          <Text style={styles.value}>{totalAmount}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, { color: verificationData.status ? 'green' : 'red' }]}>
            {verificationData.status ? "Passed" : "Failed"}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>*ref:</Text>
          <Text style={[styles.value, { color: verificationData.status ? 'green' : 'red' }]}>
            {userData._id}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.printButton} onPress={generatePDF}>
        <Text style={styles.printButtonText}>Print PDF</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2024 Vehicle Revenue Licence Department</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailContainer: {
    marginBottom: 20,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  printButton: {
    backgroundColor: '#2FAB58',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  printButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
});