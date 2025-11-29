import { navigate } from 'expo-router/build/global-state/routing';
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Dropdown } from 'react-native-paper-dropdown';

// Placeholder variables - Will DELETE - 
const OPTIONS = [
    { label: 'PlaceholderUSER1', value: 'PlaceholderUSER1'},
    { label: 'PlaceholderUSER2', value: 'PlaceholderUSER2'},
];

// const chooseUserDropdown = () => {  

// State variables for choose a user dropdown
    //const [value, setValue] = useState('');
    //const [list, setList] = useState([]);
    //const [showDropDown, setShowDropDown] = useState(false);

//     useEffect(() => {
//         const fetchDropDownData = async () => {
//             try {
//                 const res = await axios.get('http://192.168.1.43:8081/api/participant/get-participants');
//             }
//         }
//     })

// }

export default function ViewStudy() {

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.grid}>
            {/* <Text style={styles.text}>Feel Me {'\n'} View Study!</Text> */}
            <Card style={styles.gridCard}>
              <Text style={styles.text}>Stress and Anxiety Study</Text>
              <Dropdown
                label="Choose a User"
                placeholder="Choose a User"
                options={OPTIONS}
                //value={value}
                //onSelect={}
                mode='outlined'
                />
            </Card>
            <Card style={styles.gridCard}>
              <Text style={styles.text}>USER DATA CHART AND TABLE HERE</Text>
            </Card>
            <Card style={styles.row}>
                <Button mode='elevated' onPress={() => alert('Need to connect to page.')}> Create New User </Button>
                <Button mode='elevated' onPress={() => alert('Need to connect to backend api.')}> Download Data </Button>
                <Button mode='elevated' onPress={() => alert('Need to connect to backend api.')}> DELETE USER </Button>
                <Button mode='elevated' onPress={() => navigate('/(admin)/admin-dashboard')}> Return to Dashboard </Button>
            </Card>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // or 'center' or 'space-around'
    padding: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
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
