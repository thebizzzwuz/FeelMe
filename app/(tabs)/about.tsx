import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the About Screen of the Feel Me App.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25282E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
  },
});