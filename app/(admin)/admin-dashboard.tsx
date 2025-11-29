import { navigate } from 'expo-router/build/global-state/routing';
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Dropdown } from 'react-native-paper-dropdown';
import axios from "axios";
import {useEffect} from "react";
import * as React from "react";

// Dropdown options to view study
// const OPTIONS = [
//     { label: 'Stress and Anxiety Study', value: 'Stress and Anxiety Study'},
//     { label: 'Fear Study', value: 'Fear Study'},
// ];

export default function AdminDashboard() {

    const [chosenStudy, setChosenStudy] = React.useState(null);
    const [studiesList, setStudiesList] = React.useState([]);

    useEffect(() => {
    axios.get('http://192.168.4.23:3000/studyname')
        .then((res) => {

        const mappedOptions = res.data.map(study => ({
            label: study.nameStudy,
            value: study._id,
            name: study.nameStudy
        }));

    setStudiesList(mappedOptions);
})
.catch((err) => console.error("Error getting studies", err));
}, []);


  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.grid}>
            {/* <Text style={styles.text}>Feel Me {'\n'} Researcher Dashboard!</Text> */}
            <Card style={styles.gridCard}>
              <Text style={styles.text}>Click below to create a new study</Text>
              <Button mode='elevated' onPress={() => navigate('createStudy')}>Create Study</Button>
            </Card>
            <Card style={styles.gridCard}>
              <Text style={styles.text}>Select a study to view data</Text>
              <Dropdown
                label="Choose a Study to View"
                placeholder="Choose a Study to View"
                options={studiesList}
                value={chosenStudy}
                onSelect={setChosenStudy}
                mode='outlined'
                />
              <Button mode='elevated' onPress={() => {
                  if (!chosenStudy) return alert ("Please choose a study");
                  const selected = studiesList.find(s => s.value === chosenStudy);
                  navigate({
                      pathname: 'viewStudy', params: {
                         studyName: String(selected.name)
                      }
                  }); }}
                  > View Study
              </Button>
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
