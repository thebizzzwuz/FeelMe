import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import InputValue from "@/components/input-username";
import { StyleSheet, Text, View } from "react-native";

const PlaceholderImage = require("../../assets/images/background-image.png");

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <View>
        <ImageViewer imgSource={PlaceholderImage} />
        <Text style={styles.text}>Sign in to your account</Text>
        <InputValue placeholder="User Name" />
        <InputValue placeholder="Password" />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Sign In" />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25282E',
    flex: 1,
    alignItems: 'center',
    padding: 1.0,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 30,
    marginVertical: 10,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
    backgroundColor: '#338a7eff',
  },
});
