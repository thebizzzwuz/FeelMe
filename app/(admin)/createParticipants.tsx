// import ImageViewer from '@/components/ImageViewer';
import axios from 'axios';
import { navigate } from 'expo-router/build/global-state/routing';
import * as React from "react";
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Card, Menu } from "react-native-paper";
import { styles } from '../../app/src/styles/styles';

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        <Card style={styles.gridCard}>
          <Text style={styles.text}>Register a New Participant</Text>
        </Card>
          
          {/*Dropdown menu for list of studies #*/}

          <Menu visible={visibleStudies} onDismiss={() => setVisibleStudies(false) } anchor={
            <Button
                style={styles.button}
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

          {/*Text field for Participant ID*/}

          {/*Participant ID*/}
          <Card style={styles.gridCard}>
            <Text style={styles.text3}>Participant ID</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter Participant ID'
                placeholderTextColor='#cccccc'
                value={participantId}
                onChangeText={setParticipantId}
            />

          {/*Text field for Password*/}

            {/* Password */}
            <Text style={styles.text3}>Password</Text>
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
            <Text style={styles.text3}>Assigned Researcher Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Assigned Researcher Name'
                placeholderTextColor='#cccccc'
                value={assignedResearcher}
                onChangeText={setAssignedResearcher}
            />

            {/*Text field for Researcher Email*/}

            {/* Researcher Email */}
            <Text style={styles.text3}>Researcher Email</Text>
            <TextInput
                style={styles.input}
                placeholder='Researcher Email'
                placeholderTextColor='#cccccc'
                value={researcherEmail}
                onChangeText={setResearcherEmail}
            />

            {/*Text field for IRB Approval #*/}

            {/* IRB Approval # */}
            <Text style={styles.text3}>IRB Approval #</Text>
            <TextInput
                style={styles.input}
                placeholder='IRB Approval #'
                placeholderTextColor='#cccccc'
                value={irbApprovalNumber}
                onChangeText={setIrbApprovalNumber}
            />
          
  

        {/*Button to register*/}

          <TouchableOpacity style={styles.registerButton} onPress={RegisterParticipant}>
            <Text style={styles.registerButtonText}>Create</Text>
          </TouchableOpacity>
        </Card>
        
        {/*Button to Return to Dashboard*/}
        <Card style={styles.gridCard}>
            <Button style= {styles.button} mode='elevated' onPress={() => navigate('/admin-dashboard')}> Return to
                Dashboard </Button>
        </Card>
        
      </ScrollView>
    </View>
  );
}

