import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const Verification = () => {
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    telephone: '',
    gender: '',
    nicNo: '',
    nicPhoto: '',
    regNo: '',
    vehicleClass: '',
    engNo: '',
    chassisNo: '',
    fuelType: '',
    model: '',
    yearManu: '',
  });

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

  const handleSubmit = () => {
    alert('Details submitted for verification');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NIC 2 Side Photo:</Text>
        <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
          <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
          <Text style={styles.pickImageText}>Upload Image</Text>
        </TouchableOpacity>
        {userData.nicPhoto ? (
          <Image source={{ uri: userData.nicPhoto }} style={styles.uploadedImage} />
        ) : null}
      </View>
      <Text style={styles.heading}>Vehicle Details</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Reg No:</Text>
        <TextInput
          style={[styles.input, styles.inputLarge]}
          placeholder="Enter your vehicle registration number"
          value={userData.regNo}
          onChangeText={(value) => handleInputChange('regNo', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Class:</Text>
        <TextInput
          style={[styles.input, styles.inputLarge]}
          placeholder="Enter your vehicle class"
          value={userData.vehicleClass}
          onChangeText={(value) => handleInputChange('vehicleClass', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Eng. No:</Text>
        <TextInput
          style={[styles.input, styles.inputLarge]}
          placeholder="Enter your engine number"
          value={userData.engNo}
          onChangeText={(value) => handleInputChange('engNo', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Chassis No:</Text>
        <TextInput
          style={[styles.input, styles.inputLarge]}
          placeholder="Enter your chassis number"
          value={userData.chassisNo}
          onChangeText={(value) => handleInputChange('chassisNo', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fuel Type:</Text>
        <TextInput
          style={[styles.input, styles.inputLarge]}
          placeholder="Enter your fuel type"
          value={userData.fuelType}
          onChangeText={(value) => handleInputChange('fuelType', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Model:</Text>
        <TextInput
          style={[styles.input, styles.inputLarge]}
          placeholder="Enter your vehicle model"
          value={userData.model}
          onChangeText={(value) => handleInputChange('model', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Year Manu:</Text>
        <TextInput
          style={[styles.input, styles.inputLarge]}
          placeholder="Enter your vehicle year of manufacture"
          value={userData.yearManu}
          onChangeText={(value) => handleInputChange('yearManu', value)}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
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
  pickImageButton: {
    flexDirection: 'row',
    backgroundColor: '#2FAB58',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  pickImageText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
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
