import axios from 'axios';
import { navigate } from 'expo-router/build/global-state/routing';
import * as React from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
// import {router} from "expo-router";
import { useRouter } from 'expo-router';
import { styles } from '../../app/src/styles/styles';
// import DropDown from 'react-native-paper-dropdown';


export default function CreateStudy() {

    const router = useRouter();

    // State variables for Create Study inputs

    const [chosenStudy, setChosenStudy] = React.useState('');
    const [studyName, setStudyName] = React.useState('');
    const [variable1, setVariable1] = React.useState('');
    const [variable2, setVariable2] = React.useState('');

    // Create a study function to send data to backend
    const CreateStudy = async () => {

        try {
            const res = await axios.post('http://192.168.1.43:3000/api/study/create', {
                studyName: studyName,
                xAxisName: variable1,
                yAxisName: variable2,
            });

            console.log(res.status);
            alert('Study Created!');
            
            // Restore input fields upon successful creation
            
            setStudyName('');
            setVariable1('');
            setVariable2('');

        }

        catch (error) {
                console.error(error.response?.data || error.message);
                alert('Study creation failed');

        }
    }
    
    return (

        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.grid}>
                <Card style={styles.gridCard}>
                    <Text style={styles.text}>Create a Study</Text>
                </Card>
                <Card style={styles.gridCard}>
                    <Text style={styles.text3}>Study</Text>
                    {/*Input field for name of Study*/}
                    <TextInput 
                        placeholder='Name of Study'
                        value={studyName}
                        onChangeText={setStudyName}
                        style={styles.input}
                        placeholderTextColor='#cccccc'
                    />

                    {/*Input field for Variable #1*/}

                    <Text style={styles.text3}>Variable #1</Text>
                    <TextInput 
                        placeholder='Variable #1'
                        value={variable1}
                        onChangeText={setVariable1}
                        style={styles.input}
                        placeholderTextColor='#cccccc'
                    
                    />

                    {/*Input field for Variable #2*/}

                    <Text style={styles.text3}>Variable #2</Text>
                    <TextInput 
                        placeholder='Variable #2'
                        placeholderTextColor='#cccccc'
                        value={variable2}
                        onChangeText={setVariable2}
                        style={styles.input}
                        
                    />

                    {/*Button to create study*/}
                    
                              <TouchableOpacity style={styles.registerButton} onPress={CreateStudy}>
                                <Text style={styles.registerButtonText}>Create Study</Text>
                              </TouchableOpacity>
                </Card>

                {/*Button to Return to Dashboard*/}
                <Card style={styles.gridCard}>
                    <Button style= {styles.button} mode='elevated' onPress={() => navigate('/admin-dashboard')}> Return to
                        Dashboard </Button>
                </Card>


                {/*React Native Paper Segmented Buttons for Return to Dashboard and Create*/}


                {/* <SegmentedButtons
                    value={chosenStudy}
                    onValueChange={async (val) => {
                        setChosenStudy(val);
                        if (val === "Create"){
                            await CreateStudy();
                            setChosenStudy("")

                        }

                        if (val === "Return to Dashboard"){
                            router.push('admin-dashboard')
                        }
                    }}
                    buttons={[{value: 'Return to Dashboard',
                        label: 'Return to Dashboard',
                        icon: 'home',
                        uncheckedColor: '#FFFFFF',    
                    },
                        {value: 'Create',
                            label: 'Create',
                            icon: 'plus',
                            uncheckedColor: '#FFFFFF',}]}
                    style={styles.segmented}
                /> */}
            </ScrollView>
        </View>

    )
}

// const styles = StyleSheet.create({

//     container: {
//         backgroundColor: '#25282E',
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//     },
//     content: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     segmented: {
//         width: '60%',
//         marginBottom: 10,
//     },
//     header: {
//         color: 'white',
//         fontSize: 40,
//         paddingBottom: 35
//     },
//     title: {
//         paddingBottom: 150,
//         color: 'white',
//         fontSize: 30
//     },

//     largeButton: {
//         backgroundColor: '#ffffff',
//         width: 300,
//         height: 70,
//         borderRadius: 15,
//         justifyContent: 'center',
//         marginTop: 20,
//         marginBottom: 100,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 6,

//     },
//     textLargeButton: {
//         color: '#000',
//         fontSize: 22,
//         fontWeight: 'bold',
//         paddingBottom: 3
//     },
//     inputContent: {
//         paddingVertical: 10,
//     },
//     input: {
//         backgroundColor: 'white',
//         width: '30%',
//         height: 30,
//         fontSize: 18,
//         marginBottom: 16,
//         borderRadius: 25,
//         elevation: 8,
//     },

//     titleBar: {
//         backgroundColor: 'white',
//         width: '10%',
//         paddingVertical: 1,
//         marginBottom: 10,
//         alignItems: 'center',
//         borderRadius: 10,
//         elevation: 3,
//     },
//     titleText: {
//         color: 'black',
//         fontSize: 15,
//         fontWeight: 'bold',
//     },

// });