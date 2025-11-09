import DropdownComponent from "@/components/Dropdown";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.grid}>
            {/* <Text style={styles.text}>Feel Me {'\n'} Researcher Dashboard!</Text> */}
            <Card style={styles.gridCard}>
              <Text style={styles.text}>Click below to create a new study</Text>
              <Button mode='elevated' onPress={() => alert('API needs to be configured...')}>Create Study</Button>
            </Card>
            <Card style={styles.gridCard}>
              <Text style={styles.text}>Select a study to view data</Text>
              <DropdownComponent></DropdownComponent>
              <Button mode='elevated' onPress={() => alert('API needs to be configured')}>View Study</Button>
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
