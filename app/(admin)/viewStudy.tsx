import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { navigate } from 'expo-router/build/global-state/routing';
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Dropdown } from 'react-native-paper-dropdown';
import ProgressScreen from '../(tabs)/progress'; // Adjust the path as needed

    export default function ViewStudy() {

        const {studyName} = useLocalSearchParams();
        console.log("Study Name:", studyName);

        const [usersList, setUsersList] = React.useState([]);
        const [chosenUser, setChosenUser] = React.useState(null);

        useEffect(() => {
            if (!studyName) return;

            axios.get(`https://feelme.onrender.com/api/partfromstudy/${encodeURIComponent(String(studyName))}`)
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

        console.log("Chosen user ID:", chosenUser);

const DownloadUserData = async () => {
    if (!chosenUser) {
        alert("Please select a user first.");
        return;
    }

    try {
        const res = await axios.get(
            `https://feelme.onrender.com/api/logs/getLogsByParticipant/${chosenUser}`,
            { responseType: 'blob' } // important for CSV download
        );

        // Create a link and trigger download
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `participant_${chosenUser}_logs.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();

    } catch (error) {
        console.error("Error downloading CSV:", error);
        alert("Failed to download CSV.");
    }
};

        const DeleteUser = async () => {

            try{
                // Call delete user logs api
                // The local IP for Expo and the backend server port
                const res = await axios.post('https://feelme.onrender.com/api/logs/delete-logs-by-participant', {chosenUser});

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
                const res = await axios.post('https://feelme.onrender.com/api/participant/delete', {chosenUser});

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
                    {/* Render ProgressScreen only when a user is selected */}
                    {chosenUser && (
                        <Card style={styles.gridCard}>
                            <ScrollView horizontal={true}>
                                <ProgressScreen userId={chosenUser || "MOCK_USER_ID"} />
                            </ScrollView>
                        </Card>
                    )}
                        <Card style={styles.row}>
                        <Button style= {styles.button} mode='elevated' onPress={() => navigate('./createParticipants')}> Create New
                            User </Button>
                        <Button style= {styles.button} mode='elevated' onPress={DownloadUserData}> Download Data </Button>
                        <Button style= {styles.button} mode='elevated' onPress={DeleteUser}> DELETE USER </Button>
                        <Button style= {styles.button} mode='elevated' onPress={() => navigate('/admin-dashboard')}> Return to
                            Dashboard </Button>
                    </Card>
                </ScrollView>
            </View>
        );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#56d3adff',
        paddingHorizontal: 0, // Added some padding for the sides
    },
    grid: {
        backgroundColor: '#56d3adff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20, // Adjusted the padding to make space
    },
    gridCard: {
        backgroundColor: '#56d3adff',
        width: '80%', // Adjusted to use full width
        marginBottom: 20,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 30,
        marginVertical: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    });
