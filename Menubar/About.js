import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Our App</Text>
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur risus sed
        libero hendrerit auctor. Pellentesque habitant morbi tristique senectus et netus et
        malesuada fames ac turpis egestas. Phasellus id augue urna. Proin eu nisi id felis
        cursus pulvinar. Nullam fringilla turpis at dui posuere, et efficitur justo convallis.
        Fusce sit amet est a nulla ultrices tempus.
      </Text>
      <Text style={styles.paragraph}>
        Nunc consequat, justo ut scelerisque faucibus, purus tellus pharetra turpis, a congue
        eros justo vitae purus. In in semper quam. Vivamus eleifend, odio at aliquam ultricies,
        enim erat consequat neque, vel gravida purus sem in sapien.
      </Text>
      <Text style={styles.paragraph}>
        Fusce dapibus sapien nec sagittis convallis. Aenean a purus vel dui pretium auctor ut ut
        libero. Integer in felis vel lacus viverra dictum. Aliquam erat volutpat. Nulla vel
        orci elit. Aenean ullamcorper lorem eu justo varius, et maximus tortor dictum.
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
