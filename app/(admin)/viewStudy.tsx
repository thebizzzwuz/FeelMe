import { navigate } from 'expo-router/build/global-state/routing';
import React, {useEffect} from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Dropdown } from 'react-native-paper-dropdown';
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

// Placeholder variables - Will DELETE - 
// const OPTIONS = [
//     { label: 'PlaceholderUSER1', value: 'PlaceholderUSER1'},
//     { label: 'PlaceholderUSER2', value: 'PlaceholderUSER2'},
// ];

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

    const { studyName } = useLocalSearchParams();
    console.log("Study Name:", studyName);

    const [usersList, setUsersList] = React.useState([]);
    const [chosenUser, setChosenUser] = React.useState(null);

    useEffect(() => {
        if(!studyName) return;

        axios.get(`http://192.168.4.23:3000/participant/${studyName}`)
            .then((res) => {
                console.log("Raw participant data:", res.data);
                const mappedUsers = res.data.map(user => ({
                    label: user.participantId,
                    value: user._id
                }));
                console.log("Mapped users:", mappedUsers);
                setUsersList(mappedUsers);



            })
            .catch(err => {


                if (err.response && err.response.status === 400){
                    const message = err.response.data?.message || "No participants found"
                    setUsersList([{label: message, value: null}])
                }
                else{

                console.error("Error getting participants", err);
            setUsersList([]);
            }
    });
},[studyName]);


  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.grid}>
            {/* <Text style={styles.text}>Feel Me {'\n'} View Study!</Text> */}
            <Card style={styles.gridCard}>
              <Text style={styles.text}>{studyName}</Text>
              <Dropdown
                label="Choose a User"
                placeholder="Choose a User"
                options={usersList}
                value={chosenUser}
                onSelect={setChosenUser}
                mode='outlined'
                />
            </Card>
            <Card style={styles.gridCard}>
              <Text style={styles.text}>USER DATA CHART AND TABLE HERE</Text>
            </Card>
            <Card style={styles.row}>
                <Button mode='elevated' onPress={() => navigate('./createParticipants')}> Create New User </Button>
                <Button mode='elevated' > Download Data </Button>
                <Button mode='elevated' > DELETE USER </Button>
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
