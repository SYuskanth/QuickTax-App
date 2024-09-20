import { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons for icons
import axios from "axios";
import { API_URL } from '@env';
// import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = () => {
        setError('');
        
        if (!email || !password) {
            setError('Enter Email & Password');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be:\nAt least one Uppercase letters\nAt least one Lowercase letters\nAt least one Numbers\nAt least one Special characters');
            return;
        }

        axios.post(`${API_URL}/user/signup`, { email, password })
        .then((response) => {
            console.log(response)
          Alert.alert("successfully User is created!");
          navigation.navigate('Login');
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message === 'Email Already in Use') {
            setError('Email Already in Use');
          } else {
            setError(error.message);
            console.log(error.response.data)
          }
        });

    };

    function goToLogin() {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Let's Register</Text>
            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
                <TextInput
                    onChangeText={setEmail}
                    placeholder="Email"
                    style={styles.textInput}
                    value={email}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
                <TextInput
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                    style={styles.textInput}
                    value={password}
                />
            </View>
            <TouchableOpacity onPress={handleRegister} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity onPress={goToLogin} style={styles.loginTextContainer}>
                <Text style={{ marginVertical: 10 }}>
                Already have an account? <Text style={styles.loginText}>Sign In</Text>
            </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        width: 300,
        marginVertical: 10,
        paddingHorizontal: 8,
        marginBottom: 20
    },
    textInput: {
        flex: 1,
        paddingVertical: 8,
    },
    buttonContainer: {
        backgroundColor: '#2FAB58',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: 300,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        // fontFamily:'Poppins_400Regular',
        fontSize: 16,
    },
    icon: {
        marginRight: 8,
    },
    errorText: {
        color: '#EE2400',
        marginVertical: 10,
        fontWeight:'bold'
    },
    loginTextContainer: {
        marginVertical: 20,
    },
    loginText: {
        color: '#2FAB58',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
