import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Animated, Easing } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const scanAnimation = useRef(new Animated.Value(0)).current;

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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImage(result.uri);
      const { type, data } = await BarCodeScanner.scanFromURLAsync(result.uri);
      if (data) {
        alert(`Bar code with type ${type} and data ${data} has been scanned from image!`);
      } else {
        alert("No QR code found in the selected image.");
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
    <View style={styles.container}>
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
          <Text style={styles.imageText}>QR Image</Text>
          <Image source={{ uri: pickedImage }} style={styles.image} />
        </View>
      )}
      {scanned && (
        <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
          <Text style={styles.scanButtonText}>Scan</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cameraContainer: {
    width: "60%",
    height: "60%",
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
    alignItems:'center'
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
