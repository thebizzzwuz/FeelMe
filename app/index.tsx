// import ImageViewer from '@/components/ImageViewer';
import {StyleSheet, Text, TextInput, View, Button, TouchableOpacity} from 'react-native';
import {Link} from 'expo-router';
import {useState} from 'react';
import axios from 'axios';

// const PlaceholderImage = require('../assets/images/background-image.png');

export default function Index() {

  //State variables and functions. Holding Participant ID and password

  const [participantId, setParticipantId] = useState('');
  const [password, setPassword] = useState('');

  // Register study participant function to post Participant ID and password to Express backend
  const RegisterParticipant = async (e) => {
    if (!Number.isInteger(Number(participantId))){

      // Error message for alphanumeric Participant IDs
      setParticipantId('');
      setPassword('');
      alert('Participant ID must be a number');
      return
    }

    // The local IP for Expo and the backend server port
    axios.post('http://192.168.1.55:3000/register', {participantId, password})
        .then(res => {
          alert(res.data.status);
          setParticipantId('');
          setPassword('');
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 400) {
              alert('Participant already exists');
              setParticipantId('');
              setPassword('');
            }}})
  }
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>

        {/*<ImageViewer imgSource={PlaceholderImage}  />*/}

      </View>
        <Text style={styles.text}>Register a New Participant</Text>

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

        {/*Button to register*/}

          <TouchableOpacity style={styles.registerButton} onPress={RegisterParticipant}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
      </View>

      {/*Preliminary links to toggle Register/Sign In **** WILL BE DELETED*******/}

        <View style={styles.linkContainer}>
          <Link href='/(tabs)/userDashboard' style={styles.linkText}>
            Go to Dashboard
          </Link>
          <Link href='/indexLogin' style={styles.linkText}>
            Go to Sign in
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
  registerButton: {
    backgroundColor: '#338a7eff',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 25,
    alignItems: 'center',
  },
  registerButtonText: {
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
