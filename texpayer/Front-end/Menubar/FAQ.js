import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const FAQ = () => {
  const faqData = [
    {
      question: 'What is Lorem Ipsum?',
      answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      question: 'Why do we use it?',
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      question: 'Where does it come from?',
      answer: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
    },
    {
      question: 'Where can I get some?',
      answer: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.',
    },
    {
      question: 'Is it safe to use?',
      answer: 'Yes, Lorem Ipsum is safe to use. It has been used for centuries without any issues.',
    },
  ];

  const [expandedId, setExpandedId] = useState(null);

  const toggleAnswer = (index) => {
    if (expandedId === index) {
      setExpandedId(null);
    } else {
      setExpandedId(index);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>FAQ's</Text>
      {faqData.map((item, index) => (
        <View
          key={index}
          style={[
            styles.item,
            expandedId === index && { backgroundColor: '#6CBA7A' },
          ]}
        >
          <TouchableOpacity
            style={styles.questionContainer}
            onPress={() => toggleAnswer(index)}
          >
            <Text
              style={[
                styles.question,
                { color: expandedId === index ? '#fff' : '#2FAB58' },
              ]}
            >
              {item.question}
            </Text>
            <SimpleLineIcons
              name={expandedId === index ? 'minus' : 'plus'}
              size={20}
              color={expandedId === index ? '#fff' : '#2FAB58'}
              style={styles.icon}
            />
          </TouchableOpacity>
          {expandedId === index && (
            <View style={styles.answerContainer}>
              <Text style={[styles.answer, { color: '#fff' }]}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2FAB58',
    marginBottom: 20,
    textAlign: 'left',
  },
  item: {
    marginBottom: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
  },
  question: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 5,
  },
  answerContainer: {
    paddingLeft: 25,
    paddingBottom: 10,
    paddingTop: 10,
    borderLeftWidth: 1,
    borderColor: '#6CBA7A',
    backgroundColor: '#6CBA7A',
  },
  answer: {
    fontSize: 16,
  },
});

export default FAQ;
