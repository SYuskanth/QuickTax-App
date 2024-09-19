import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Our App</Text>
      <Text style={styles.paragraph}>
        Our app is designed to streamline the process of vehicle emission testing. We aim to
        provide a simple, efficient, and user-friendly experience for vehicle owners to get their
        emission tests done without any hassle.
      </Text>
      <Text style={styles.paragraph}>
        With our app, users can easily schedule emission tests, track the status of their tests,
        and receive notifications when their tests are due. Our platform ensures that all vehicles
        meet the required environmental standards, helping to reduce pollution and protect the
        environment.
      </Text>
      <Text style={styles.paragraph}>
        We are committed to making the process of vehicle emission testing as smooth as possible.
        By using our app, you contribute to a cleaner, healthier planet. Thank you for choosing our
        service!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: '#2FAB58',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#555',
    textAlign: 'justify',
  },
});

export default About;
