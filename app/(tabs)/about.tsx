import InputValue from "@/components/input-text";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function AdminDashboard() {
  return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        <Card style={styles.gridCard}>
          <Card.Cover source={PlaceholderImage} />
        </Card>
        <Card style={styles.gridCard}>
           <Card.Content>  
            <Text style={styles.text}>Sign in to your account</Text>
            <InputValue placeholder="User Name" />
            <InputValue placeholder="Password" />
          </Card.Content>
          <Card.Actions>
            <Button mode='contained' onPress={() => alert('API needs to be configured...')}>Sign In</Button>
            <Button mode='contained' onPress={() => alert('Reach out to Researcher to reset your password')}>Forgot Password?</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56d3adff',
  },
  grid: {
    backgroundColor: '#56d3adff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  gridCard: {
    backgroundColor: '#56d3adff',
    width: 430,
    alignContent: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 30,
    marginVertical: 10,
    textAlign: 'center',
  },
});
