import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  placeholder?: string;
};

const InputValue = ({placeholder} : Props) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.text}
        placeholder= {placeholder}
        placeholderTextColor="#888"
        onChangeText={newText => setText(newText)}
        value={text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25282E',
    outlineWidth:2,
    outlineColor: '#FFFFFF',
    flex: 1/4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'white',
  },
});

export default InputValue;