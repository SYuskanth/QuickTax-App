import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons for icons
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [resetEmail, setResetEmail] = useState("");

    const handleLogin = async () => {
        setError('');

        if (!email || !password) {
            setError('Enter Email & Password');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/auth/loginuser`, {
                email,
                password
            });
            
           // console.log(response.data.user);
            await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
            await AsyncStorage.setItem('isLoggedIn', 'true');
            navigation.navigate('Home');
        } catch (error) {
            setError('Invalid credentials' );
        }
    };

    const handleSendResetEmail = async () => {
       
        navigation.navigate('resetpassword')
    }

    function goToRegister() {
        navigation.navigate('Register');
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>Let's Log In</Text>
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
            <TouchableOpacity onPress={handleSendResetEmail} style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainerLogIn}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
            {error && <Text style={{ color: '#EE2400' , fontWeight:'bold'}}>{error}</Text>}
            <Text style={{ marginVertical: 10 }}>
                Don't have an account? <Text style={styles.registerText} onPress={goToRegister}>Sign Up</Text>
            </Text>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Enter your email address</Text>
                        <TextInput
                            onChangeText={setResetEmail}
                            placeholder="Email"
                            style={styles.modalTextInput}
                            value={resetEmail}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.Sbutton} onPress={handleSendResetEmail}>
                               <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Sbutton} onPress={() => setModalVisible(!modalVisible)}>
                               <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
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
    buttonContainerLogIn: {
        marginTop: 10,
        marginBottom: 20,
        width: 300,
        borderRadius: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2FAB58',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    icon: {
        marginRight: 8,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-start',
        marginLeft: 35,
    },
    forgotPasswordText: {
        color: '#2FAB58',
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 15
    },
    registerText: {
        color: '#2FAB58',
        fontSize: 15,
        fontWeight:"bold"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#E7E5E7',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    Sbutton:{
        backgroundColor: '#2FAB58',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '50%',
        alignItems: 'center',
        margin:10
        
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize:18,
        fontWeight:"bold"
    },
    modalTextInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: 280,
        paddingHorizontal: 8,
        marginBottom: 20,
        marginVertical: 10,
    },
});
