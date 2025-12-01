// import ImageViewer from '@/components/ImageViewer';
import axios from 'axios';
import { Link } from 'expo-router';
import * as React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Menu } from "react-native-paper";


export default function CreateParticipants() {

  //State variables and functions. Holding Participant ID, password, assigned researcher, researcher email, irb#

  const [participantId, setParticipantId] = useState('');
  const [password, setPassword] = useState('');
  const [assignedResearcher, setAssignedResearcher] = useState('');
  const [researcherEmail, setResearcherEmail] = useState('');
  const [irbApprovalNumber, setIrbApprovalNumber] = useState('');

  // State variables for drop-down menu for studies

  const [visibleStudies, setVisibleStudies] = React.useState(false);
  const [study, setStudy] = React.useState('Choose a Study');
  const [studiesList, setStudiesList] = React.useState([]);

  useEffect(() => {

    // Scrape database for a list of study names

    axios.get('http://192.168.1.55:3000/api/study/studyname').then((res) => setStudiesList(res.data))
        .catch((err) => console.error("Error", err)); }, []);

  // Register study participant function to post Participant ID and password to Express backend
  const RegisterParticipant = async (e) => {
    if (!Number.isInteger(Number(participantId))){

      // Error message for alphanumeric Participant IDs
      setParticipantId('');
      setPassword('');
      setAssignedResearcher('');
      setResearcherEmail('');
      setIrbApprovalNumber('');
      alert('Participant ID must be a number');
      return
    }

    // The local IP for Expo and the backend server port
    axios.post('http://192.168.1.55:3000/api/auth/register', {participantId, password, assignedResearcher, researcherEmail, irbApprovalNumber, study})
        .then(res => {
          alert(res.data.status);

          //Reset fields after successful creation of participant

          setParticipantId('');
          setPassword('');
          setAssignedResearcher('');
          setResearcherEmail('');
          setIrbApprovalNumber('');
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 400) {
              alert('Participant already exists');

              //Reset fields after error

              setParticipantId('');
              setPassword('');
              setAssignedResearcher('');
              setResearcherEmail('');
              setIrbApprovalNumber('');
            }}})
  }
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>

      </View>
        <Text style={styles.title}>Create a New Participant</Text>

        {/*Text field for Participant ID*/}

         {/*Participant ID*/}
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

          {/*Text field for Assigned Researcher Name*/}

          {/* Assigned Researcher Name */}
          <Text style={styles.label}>Assigned Researcher Name</Text>
          <TextInput
              style={styles.input}
              placeholder='Assigned Researcher Name'
              placeholderTextColor='#cccccc'
              value={assignedResearcher}
              onChangeText={setAssignedResearcher}
          />

          {/*Text field for Researcher Email*/}

          {/* Researcher Email */}
          <Text style={styles.label}>Researcher Email</Text>
          <TextInput
              style={styles.input}
              placeholder='Researcher Email'
              placeholderTextColor='#cccccc'
              value={researcherEmail}
              onChangeText={setResearcherEmail}
          />

          {/*Text field for IRB Approval #*/}

          {/* IRB Approval # */}
          <Text style={styles.label}>IRB Approval #</Text>
          <TextInput
              style={styles.input}
              placeholder='IRB Approval #'
              placeholderTextColor='#cccccc'
              value={irbApprovalNumber}
              onChangeText={setIrbApprovalNumber}
          />

          {/*Dropdown menu for list of studies #*/}

          <Menu visible={visibleStudies} onDismiss={() => setVisibleStudies(false) } anchor={
            <Button
                mode = "outlined" onPress={() => setVisibleStudies(true)} textColor = "white">
              {study}
            </Button>
          }
          >
            {studiesList.length > 0 ? (
                studiesList.map((study) => (
                    <Menu.Item
                        key={study._id}
                        onPress={() => {
                          setStudy(study.studyName);
                          setVisibleStudies(false);
                        }}
                        title={study.studyName}
                    />
                ))
            ) : (
                <Menu.Item title="No studies found" disabled />
            )}
          </Menu>

        {/*Button to register*/}

          <TouchableOpacity style={styles.registerButton} onPress={RegisterParticipant}>
            <Text style={styles.registerButtonText}>Create</Text>
          </TouchableOpacity>
      </View>

      {/*Preliminary links to toggle Register/Sign In **** WILL BE DELETED*******/}

        <View style={styles.linkContainer}>
          <Link href='/admin-dashboard' style={styles.linkText}>
            Go to Dashboard
          </Link>
          <Link href='/' style={styles.linkText}>
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
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  imageContainer: {
    width: '30%',
    height: '30%',
    alignSelf: 'center',
    marginTop: 0,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: "center"
  },
  form:{
    width: '100%',
    max: 400
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 3,
  },
  input: {
    backgroundColor: '#333840',
    color: '#FFFFFF',
    fontSize: 14,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8
  },
  registerButton: {
    backgroundColor: '#338a7eff',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginVertical: 2,
  },

});
