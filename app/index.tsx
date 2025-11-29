// Login screen for FeelMe app

// adapted from Josh Goldbloom's login code

import axios from "axios";
// import { navigate } from 'expo-router/build/global-state/routing';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

// For JWT storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceholderImage = require("@/assets/images/background-image.png");

// Main login screen function with authentication to backend
export default function Index() {

  const router = useRouter()

  // State variables and functions to hold Participant ID and password

  const [participantId, setParticipantId] = useState('');
  const [password, setPassword] = useState('');

  const SignInUser = async () => {

    try{
      // Error message for alphanumeric Participant IDs
      if (!Number.isInteger(Number(participantId))) {
        setParticipantId('');
        setPassword('');
        alert('Participant ID must be a number');
        return
      }

      // The local IP for Expo and the backend server port
      const res = await axios.post('http://192.168.4.23:3000/api/auth/signin', {participantId, password});

      console.log(res.status);
      alert(res.data.status);

      // Store JWT token upon successful login
      const token = res.data.token;

      if (res.status === 200) {
        await AsyncStorage.setItem('jwtToken', token);
        console.log('Token stored successfully', token);
      };

      // Admin dashboard navigation
      if (Number(participantId[0]) === 9) {
       router.push('/(admin)/admin-dashboard');
      } else {
        router.push('/(tabs)/userDashboard');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('Sign-in failed. Please check your Participant ID and password.');  
      // Clear input fields on error
      setParticipantId('');
      setPassword('');      
    }
    }

  return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        <Card style={styles.gridCard}>
          <Card.Cover source={PlaceholderImage} />
        </Card>
        <Card style={styles.gridCard}>
           <Card.Content>  
            <Text style={styles.text}>Sign in to your account</Text>
            
            {/* Input fields for Participant ID and password */}
            <TextInput
              label="Participant ID"
              value={participantId}
              onChangeText={setParticipantId}
              placeholder="Enter Participant ID" />
            <TextInput 
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry 
              placeholder="Enter Password" />
          </Card.Content>
          <Card.Actions>

            {/* Sign in button  */}
            {/* <Button mode='contained' onPress={() => navigate('/(admin)/admin-dashboard')}>Sign In</Button> */}
             <Button mode='contained' onPress={SignInUser}>Sign In</Button>
            <Button mode='contained' onPress={() => alert('Reach out to Researcher to reset your password')}>Forgot Password?</Button>
          </Card.Actions>
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
