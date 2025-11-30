import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text } from 'react-native-paper';

export default function UserDashboard() {
    const router  = useRouter();
    const [selectedButton, setSelectedButton] = useState('');

    const downloadCSV = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            if (!token) {
            alert('User not authenticated');
            return;
            }

            // Fetch the CSV from backend
            const res = await fetch('http://192.168.1.55:3000/api/logs/download', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            if (!res.ok) {
            alert('Failed to download data');
            return;
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            // Trigger download in browser
            const a = document.createElement('a');
            a.href = url;
            a.download = 'my_logs.csv';
            a.click();
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error(err);
            alert('Error downloading CSV');
        }
    };
    
    return (

        // Title Bar

        <View style={styles.container}>
            <Text style={styles.header}>Welcome!</Text>
            <Text style={styles.title}>Stress and Anxiety Study</Text>

            {/*Large Button for Participant to Log Data*/}

            <Button icon='pencil' mode='contained' onPress={() => router.push('/(tabs)/pre-intervention')}
                    style={[styles.largeButton]}
                    labelStyle={styles.textLargeButton}>
               Daily Self-Rating
            </Button>

            {/*React Native Paper Segmented Buttons for View Progress and Download Data*/}

        <SegmentedButtons
                value={selectedButton}
                onValueChange={async (value) => {
                    setSelectedButton(value);
                    if (value === 'Download Data') {
                        await downloadCSV();
                    } else if (value === 'View Progress') {
                        router.push('/(tabs)/progress');
                    }
                }}
                buttons={[
                    {
                        value: 'View Progress',
                        label: 'View Progress',
                        icon: 'chart-line',
                        buttonColor: '#6200ee',
                        uncheckedColor: '#FFFFFF',
                    },
                    {
                        value: 'Download Data',
                        label: 'Download Data',
                        icon: 'download',
                        buttonColor: '#6200ee',
                        uncheckedColor: '#FFFFFF',
                    },
                ]}
                style={styles.segmented}
                textColor='#ffffff'
            />
        </View>

)
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#25282E',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    content: {
        text: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmented: {
        width: '90%',
        marginBottom: 60,
    },
    header: {
    color: 'white',
        fontSize: 70
},
    title: {
        paddingBottom: 150,
        color: 'white',
        fontSize: 30
    },

    largeButton: {
    backgroundColor: '#ffffff',
        width: 300,
        height: 70,
        borderRadius: 15,
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,

},
    textLargeButton: {
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 3
    },

});