import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { navigate } from 'expo-router/build/global-state/routing';
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Dropdown } from 'react-native-paper-dropdown';
import { styles } from '../../app/src/styles/styles';

    export default function ViewStudy() {

        const {studyName} = useLocalSearchParams();
        console.log("Study Name:", studyName);

        const [usersList, setUsersList] = React.useState([]);
        const [chosenUser, setChosenUser] = React.useState(null);

        useEffect(() => {
            if (!studyName) return;

            axios.get(`http://192.168.1.43:3000/api/partfromstudy/${encodeURIComponent(String(studyName))}`)
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

                    if (err.response && err.response.status === 400) {
                        const message = err.response.data?.message || "No participants found"
                        setUsersList([{label: message, value: null}])
                    } else {

                        console.error("Error getting participants", err);
                        setUsersList([]);
                    }
                });
        }, [studyName]);

        const DeleteUser = async () => {

            try{
                // Call delete user logs api
                // The local IP for Expo and the backend server port
                const res = await axios.post('http://192.168.1.43:3000/api/logs/delete-logs-by-participant', {chosenUser});

                console.log(res.status);
                alert(res.data.status);

                if (res.status === 200) {
                    console.log('Participant logs deleted successfully');
                };

            } catch (error) {
                console.error('Error: Participant logs not deleted.', error);
                alert('Participant logs not deleted. Try again.');  
                // Clear input fields on error
                setChosenUser(null);  
            }

            try{
                // Call delete user api
                // The local IP for Expo and the backend server port
                const res = await axios.post('http://192.168.1.43:3000/api/participant/delete', {chosenUser});

                console.log(res.status);
                alert(res.data.status);

                if (res.status === 200) {
                    console.log('Participant deleted successfully');
                };

            } catch (error) {
                console.error('Error: Participant not deleted.', error);
                alert('Participant not deleted. Try again.');  
                // Clear input fields on error
                setChosenUser(null);  
            }
    }

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.grid}>
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
                    <Card style={styles.gridCard}>
                        <Button style= {styles.button} mode='elevated' onPress={() => navigate('./createParticipants')}> Create New
                            User </Button>
                        <Button style= {styles.button} mode='elevated'> Download Data </Button>
                        <Button style= {styles.button} mode='elevated' onPress={DeleteUser}> DELETE USER </Button>
                        <Button style= {styles.button} mode='elevated' onPress={() => navigate('/admin-dashboard')}> Return to
                            Dashboard </Button>
                    </Card>
                </ScrollView>
            </View>
        );
    }

    // const styles = StyleSheet.create({
    //     row: {
    //         flexDirection: 'row',
    //         justifyContent: 'space-between', // or 'center' or 'space-around'
    //         padding: 16,
    //     },
    //     button: {
    //         flex: 1,
    //         marginHorizontal: 4,
    //     },
    //     container: {
    //         flex: 1,
    //         backgroundColor: '#56d3adff',
    //     },
    //     grid: {
    //         backgroundColor: '#56d3adff',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         paddingVertical: 100,
    //     },
    //     gridCard: {
    //         backgroundColor: '#56d3adff',
    //         width: 430,
    //         alignContent: 'center',
    //         marginBottom: 20,
    //     },
    //     text: {
    //         color: '#FFFFFF',
    //         fontSize: 30,
    //         marginVertical: 10,
    //         textAlign: 'center',
    //     },
    // });

