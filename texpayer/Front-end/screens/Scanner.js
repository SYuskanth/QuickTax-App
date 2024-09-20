import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Animated, Easing, Alert, ScrollView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";


export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const scanAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");

      const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (imagePickerStatus.status !== "granted") {
        alert("Permission to access media library is required.");
      }
    })();
  }, []);

  useEffect(() => {
    if (!scanned) {
      startScanAnimation();
    } else {
      stopScanAnimation();
    }
  }, [scanned]);

  const startScanAnimation = () => {
    Animated.loop(
      Animated.timing(scanAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopScanAnimation = () => {
    scanAnimation.stopAnimation();
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const testid = data;
      const response = await axios.get(`${API_URL}/verification/verify/${testid}`);
      const verification = response.data.data;

      await AsyncStorage.setItem("verificationData", JSON.stringify(verification));

      if (verification.status) {
        navigation.navigate('verificationScreen', { verificationData: verification });
      } else {
        Alert.alert("Test Failed", "The status of the verification is Failed");
      }
    } catch (error) {
      navigation.navigate('Error');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, // Ensure high quality
    });

    if (!result.cancelled) {
      setPickedImage(result.uri);

      // Log the result to see what is being returned
      console.log('Selected Image:', result.uri);

      try {
        const { type, data } = await BarCodeScanner.scanFromURLAsync(result.uri);
        if (data) {
          console.log('QR code detected:', data);
          handleBarCodeScanned({ type, data });
        } else {
          alert("No QR code found in the selected image.");
        }
      } catch (error) {
        console.error('Error scanning QR code:', error);
        alert("An error occurred while scanning the QR code.");
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }

  const scanLineStyle = {
    ...styles.scanLine,
    transform: [
      {
        translateY: scanAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 500], // Adjust this value to match the camera view height
        }),
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <Animated.View style={scanLineStyle} />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>QR Image</Text>
        </TouchableOpacity>
      </View>
      {pickedImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>Selected QR Image</Text>
          <Image source={{ uri: pickedImage }} style={styles.image} />
        </View>
      )}
      {scanned && (
        <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
          <Text style={styles.scanButtonText}>Scan Again</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  cameraContainer: {
    width: "70%",
    height: "50%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    position: "relative",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#2FAB58",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  imageText: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 250, // Customize width here
    height: 500, // Customize height here
    resizeMode: "contain",
  },
  scanLine: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "red",
  },
  scanButton: {
    backgroundColor: "#2FAB58",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
