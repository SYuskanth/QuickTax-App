import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth'; // Firebase auth import
import auth from '../services/firebaseAuth'; // Firebase auth service import
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Notification from '../Tab/Notification'; // Assuming this is your Notification component
import Verification from '../Menubar/Verification';
import Payment from '../Menubar/Payment';
import Map from '../Menubar/Map';
import FAQ from '../Menubar/FAQ';
import Contact from '../Menubar/Contact';
import About from '../Menubar/About';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    if (route.name === 'HomeTab') {
      return <Entypo name="home" size={size} color={color} />;
    } else if (route.name === 'NotificationTab') {
      return <Ionicons name="notifications-sharp" size={size} color={color} />;
    }
  },
  tabBarActiveTintColor: '#16247d',
  tabBarInactiveTintColor: '#fff',
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#2FAB58',
  },
  tabBarItemStyle: (route.name === 'HomeTab') 
    ? { marginRight: 160 / 2 } 
    : { marginLeft: 160 / 2 }
});

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="NotificationTab" component={Notification} />
    </Tab.Navigator>
  );
}

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setModalVisible(false);
        navigation.navigate('Login');
      });
  };

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View style={styles.drawerHeader}>
                <Image
                  source={require('../assets/fox.jpg')} 
                  style={styles.drawerImage}
                />
                <Text style={styles.drawerUserName}>Demo Man</Text>
                <Text style={styles.drawerUserId}>ID:882435645V</Text>
              </View>
              <DrawerItemList {...props} />
              <TouchableOpacity
                style={styles.logoutDrawerItem}
                onPress={() => setModalVisible(true)}
              >
                <SimpleLineIcons name="logout" size={20} color="#808080" />
                <Text style={styles.logoutDrawerLabel}>Logout</Text>
              </TouchableOpacity>
            </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 240,
          },
          headerStyle: {
            backgroundColor: "#2FAB58",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerActiveTintColor: "#2FAB58",
          drawerLabelStyle: {
            color: "#111",
          },
          headerTitle: '', // Remove the 'Menu' title from the header
        }}
      >
        <Drawer.Screen
          name="HomeTab"
          component={TabNavigator}
          options={{
            drawerLabel: "Home",
            drawerIcon: () => <SimpleLineIcons name="home" size={20} color="#808080" />,
          }}
        />
        <Drawer.Screen
          name="Notification"
          component={Notification}
          options={{
            drawerLabel: "Notification",
            drawerIcon: () => <SimpleLineIcons name="bell" size={20} color="#808080" />,
          }}
        />
        <Drawer.Screen
          name="Verification"
          component={Verification}
          options={{
            drawerLabel: "Verification",
            drawerIcon: () => <SimpleLineIcons name="check" size={20} color="#808080" />,
          }}
        />
        <Drawer.Screen
          name="Payment"
          component={Payment}
          options={{
            drawerLabel: "Payment",
            drawerIcon: () => <SimpleLineIcons name="credit-card" size={20} color="#808080" />,
          }}
        />
        <Drawer.Screen
          name="Map"
          component={Map}
          options={{
            drawerLabel: "Map",
            drawerIcon: () => <SimpleLineIcons name="map" size={20} color="#808080" />,
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={Contact}
          options={{
            drawerLabel: "Contact",
            drawerIcon: () => <SimpleLineIcons name="phone" size={20} color="#808080" />,
          }}
        />
        <Drawer.Screen
          name="FAQ"
          component={FAQ}
          options={{
            drawerLabel: "FAQ",
            drawerIcon: () => <SimpleLineIcons name="question" size={20} color="#808080" />,
          }}
        />
        <Drawer.Screen
          name="About"
          component={About}
          options={{
            drawerLabel: "About",
            drawerIcon: () => <SimpleLineIcons name="info" size={20} color="#808080" />,
          }}
        />
      </Drawer.Navigator>

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
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonLogout]}
              onPress={handleLogout}
            >
              <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/scan.gif')} 
        style={styles.gif}
      />
      <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Scanner')}>
        <Text style={styles.scanButtonText}>ScanQR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FDFDFD"
  },
  gif: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  drawerHeader: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
    backgroundColor: "#2FAB58",
  },
  drawerImage: {
    height: 90,
    width: 90,
    borderRadius: 65,
    borderColor: "white",
    borderWidth: 1
  },
  drawerUserName: {
    color: "white",
    fontSize: 18,
    marginVertical: 0,
    fontWeight: "bold",
  },
  drawerUserId: {
    color: "white",
    fontSize: 16,
    marginVertical: 0,
  },
  scanButton: {
    backgroundColor: '#2FAB58',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: 100,
    marginBottom: 100
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutDrawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  logoutDrawerLabel: {
    color: '#808080',
    marginLeft: 20,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonLogout: {
    backgroundColor: '#2FAB58',
  },
  buttonCancel: {
    backgroundColor: '#808080',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
