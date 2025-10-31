import ImageViewer from '@/components/ImageViewer';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import {Link} from 'expo-router';
import {useState} from 'react';
import axios from 'axios';


const PlaceholderImage = require('../assets/images/background-image.png');

export default function Index() {

  //State variables and functions. Holding Participant ID and password

  const [participantId, setParticipantId] = useState('');
  const [password, setPassword] = useState('');

  // Register study participant function to postParticipant ID and password to Express backend
  const RegisterParticipant = async (e) => {
    // The local IP for Expo and the backend server port
    axios.post('http://192.168.1.8:3000/register', {participantId, password})
        .then(res => {
          alert(res.data);
        })
        .catch(err => console.log(err));
  }

  return (
    <View
      style={styles.container}
    >
      <View>
        <ImageViewer imgSource={PlaceholderImage} />
        <Text style={styles.text}>Register your new account</Text>

        {/*Text field for Participant ID*/}

        <TextInput
            placeholder='Participant Id'
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

        {/*Button to register*/}

        <Button title='REGISTER' onPress={RegisterParticipant} />
      </View>

      {/*Preliminary links to toggle Register/Sign In **** WILL BE DELETED*******/}

      <Link href='/(tabs)/userDashboard'>Go to Dashboard</Link>
      <Link href='/indexLogin'>Go to Sign in</Link>
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
