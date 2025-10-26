import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  placeholder?: string;
};

const InputValue = ({placeholder} : Props) => {
  const [text, setText] = useState('');

  return (
    <View>
      <TextInput 
        style={styles.text}
        placeholder= {placeholder}
        placeholderTextColor="#888"
        onChangeText={newText => setText(newText)}
        label={text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

export default InputValue;