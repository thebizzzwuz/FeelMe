import ImageViewer from '@/components/ImageViewer';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import {Link} from 'expo-router';
import {useState} from 'react';
import axios from 'axios'
import {navigate} from 'expo-router/build/global-state/routing';

// For JWT storage later //
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceholderImage = require('../assets/images/background-image.png');

// Login study participant function to authenticate participant ID and password to Express backend
export default function IndexLogin() {

    //State variables and functions. Holding Participant ID and password

    const [participantId, setParticipantId] = useState('');
    const [password, setPassword] = useState('');

    const SignInUser = async (e) => {

        // The local IP for Expo and the backend server port
        axios.post('http://192.168.1.8:3000/signin', {participantId, password})
            .then(res => {
                // For JWT storage later //
                // const token = res.data.token;
                // await AsyncStorage.setItem('jwtToken', token);
                alert(res.data);
                // Branch for Admin dashboard and Participant dashboard
                if (Number(participantId[0]) === 9) {
                    navigate('/(tabs)/adminDashboard');
                }
                else{
                    navigate('/(tabs)/userDashboard');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <View
            style={styles.container}
        >
            <View>
                <ImageViewer imgSource={PlaceholderImage} />
                <Text style={styles.text}>Sign in to your account</Text>

                {/*Text field for Participant ID*/}

                <TextInput
                    placeholder='Sign In'
                    value={participantId}
                    onChangeText={(text) => setParticipantId(text)}
                />

                {/*Text field for Password*/}

                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.footerContainer}>

                {/*Button to sign in*/}

                <Button title='SIGN IN' onPress={SignInUser} />
            </View>
            {/*Preliminary links to toggle Register/Sign In **** WILL BE DELETED*******/}

            <Link href='/(tabs)/userDashboard'>Go to Dashboard</Link>
            <Link href='/'>Go to Register</Link>
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
