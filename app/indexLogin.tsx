// import ImageViewer from '@/components/ImageViewer';
import {StyleSheet, Text, TextInput, View, Button, TouchableOpacity} from 'react-native';
import {Link} from 'expo-router';
import {useState} from 'react';
import axios from 'axios';
import {navigate} from 'expo-router/build/global-state/routing';
// import {loadPartialConfig} from '@babel/core';

// For JWT storage //
import AsyncStorage from '@react-native-async-storage/async-storage';

// const PlaceholderImage = require('../assets/images/background-image.png');

// Login study participant function to authenticate participant ID and password to Express backend
export default function IndexLogin() {

    //State variables and functions. Holding Participant ID and password

    const [participantId, setParticipantId] = useState('');
    const [password, setPassword] = useState('');

    const SignInUser = async (e) => {

        try{
            // Error message for alphanumeric Participant IDs
        if (!Number.isInteger(Number(participantId))) {
            setParticipantId('');
            setPassword('');
            alert('Participant ID must be a number');
            return
        }

            // The local IP for Expo and the backend server port
        const res = await axios.post('http://192.168.1.55:3000/signin', {participantId, password})

        console.log(res.status);
        alert(res.data.status);

            // JWT storage //

        const token = res.data.token;
        await AsyncStorage.setItem('jwtToken', token);
        console.log('JWT stored', token);

            // JWT storage confirmation //

            const tokenConfirm = await AsyncStorage.getItem('jwtToken');
            console.log('Retrieved token:', tokenConfirm);

            // Branch for Admin dashboard and Participant dashboard

        if (Number(participantId[0]) === 9) {
            navigate('/(tabs)/adminDashboard');
        } else {
            navigate('/(tabs)/userDashboard');
        }

    }

            catch(err)  {
                if (err.response) {
                    if (err.response.status === 401) {
                        alert('Invalid Password');
                    } else {
                        alert(`Error: ${err.response.status} - ${err.response.data?.message || 'ID Must Only Contain Integers'}`);
                    }

                } else if (err.request) {
                        alert('No response from server. Check your network connection.');
                } else {
                        alert('Error: ' + err.message);
                    }
                    console.error(err)

                //Clears  participantID and password for failed sign-ins
            setParticipantId('')
            setPassword('')
                }
            }

    return (
        <View
            style={styles.container}
        >
            <View style={styles.imageContainer}>
                {/*<ImageViewer imgSource={PlaceholderImage}  />*/}
            </View>
            <Text style={styles.text}>Sign In a Participant</Text>

            {/*Text field for Participant ID*/}

            <View style={styles.form}>
                <Text style={styles.label}>Participant ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Participant ID'
                    placeholderTextColor='#cccccc'
                    value={participantId}
                    onChangeText={setParticipantId}
                />

                {/*Text field for Password*/}

                {/* Password */}
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Password'
                    placeholderTextColor='#cccccc'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {/*Button to sign in*/}

                <TouchableOpacity style={styles.signInButton} onPress={SignInUser}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
            </View>

            {/*Preliminary links to toggle Register/Sign In **** WILL BE DELETED*******/}

            <View style={styles.linkContainer}>
                <Link href='/(tabs)/userDashboard' style={styles.linkText}>
                    Go to Dashboard
                </Link>
                <Link href='/' style={styles.linkText}>
                    Go to Register
                </Link>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: '#25282E',
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        width: '30%',
        height: '30%',
        alignSelf: 'center',
        marginTop: 20,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    form:{
        width: '90%',
    },
    label: {
        color: '#FFFFFF',
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#333840',
        color: '#FFFFFF',
        fontSize: 16,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 22,
    },
    signInButton: {
        backgroundColor: '#338a7eff',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 25,
        alignItems: 'center',
    },
    signInButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    linkText: {
        color: '#FFFFFF',
        fontSize: 18,
        marginVertical: 5,
    },

});
