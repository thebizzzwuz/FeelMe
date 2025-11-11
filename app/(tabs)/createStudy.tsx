import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import {Text, Button, SegmentedButtons, TextInput, Menu} from 'react-native-paper';
import axios from 'axios';
import {useRouter} from 'expo-router';

// import DropDown from 'react-native-paper-dropdown';

export default function CreateStudy() {

    // Used for link redirection
    const router = useRouter();

    // State variables for Study Name

    const [studyName, setStudyName] = React.useState('');

    // State variables for Study Variable #1

    const [variableOne, setVariableOne] = React.useState('');

    // State variables for Study Variable #2

    const [variableTwo, setVariableTwo] = React.useState('');

    // State variables for drop-down menus
    const [visibleLL, setVisibleLL] = React.useState(false);
    const [linkertLabel, setLinkertLabel] = React.useState('Likert Labels');
    const [visibleOne, setVisibleOne] = React.useState(false);
    const [colorOne, setColorOne] = React.useState('Quadrant 1 Color');
    const [visibleTwo, setVisibleTwo] = React.useState(false);
    const [colorTwo, setColorTwo] = React.useState('Quadrant 2 Color');
    const [visibleThree, setVisibleThree] = React.useState(false);
    const [colorThree, setColorThree] = React.useState('Quadrant 3 Color');
    const [visibleFour, setVisibleFour] = React.useState(false);
    const [colorFour, setColorFour] = React.useState('Quadrant 4 Color');

    //Creates the studies from text fields and drop-down menus

    const CreateStudy = async () => {

        try{
const res =  await axios.post('http://192.168.1.8:3000/createstudy', {
    nameStudy: studyName,
    variableOne: variableOne,
    variableTwo: variableTwo,
    linkertLabels: linkertLabel,
    quadrantOneColor: colorOne,
    quadrantTwoColor: colorTwo,
    quadrantThreeColor: colorThree,
    quadrantFourColor: colorFour
})

                //Restores inputs

                alert('Study Created');
                setStudyName('');
                setVariableOne('');
                setVariableTwo('');
                setLinkertLabel('Linkert Labels');
                setColorOne('Quadrant 1 Color');
                setColorTwo('Quadrant 2 Color');
                setColorThree('Quadrant 3 Color');
                setColorFour('Quadrant 4 Color');

        }
        catch(err){
            console.error('Error', err);
            alert('Did not create study');
        }
    }


    return (

        <View style={styles.container}>
            <Text style={styles.header}>Admin Create a Study</Text>

            <View style={styles.titleBar}>
                <Text style={styles.titleText}>Study</Text>
            </View>

            {/*Input field for name of Study*/}

            <TextInput label='Name of Study'
                value={studyName}
                onChangeText={setStudyName}
                mode='outlined'
                contentStyle={styles.inputContent}
                style={styles.input}
                theme={{
                    colors: {
                        text: 'black',
                        background: 'white',
                        primary: 'black',
                        onSurfaceVariant: 'black',
                    },
                }}
            />



            <View style={styles.titleBar}>
                <Text style={styles.titleText}>Variable #1</Text>
            </View>

            {/*Input field for Variable #1*/}

            <TextInput label='Variable #1'
                value={variableOne}
                onChangeText={setVariableOne}
                       mode='outlined'
                       contentStyle={styles.inputContent}
                       style={styles.input}
                       theme={{
                           colors: {
                               text: 'black',
                               background: 'white',
                               primary: 'black',
                               onSurfaceVariant: 'black',
                           },
                       }}
            />



            <View style={styles.titleBar}>
                <Text style={styles.titleText}>Variable #2</Text>
            </View>

            {/*Input field for Variable #2*/}

            <TextInput label='Variable #2'
                value={variableTwo}
                onChangeText={setVariableTwo}
                       mode='outlined'
                       contentStyle={styles.inputContent}
                       style={styles.input}
                       theme={{
                           colors: {
                               text: 'black',
                               background: 'white',
                               primary: 'black',
                               onSurfaceVariant: 'black',
                           },
                       }}
            />

         {/*Drop-down menu for Likert Labels*/}

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
                <Menu
                    visible={visibleLL}
                    onDismiss={() => setVisibleLL(false)}
                    anchor={
                        <Button mode='outlined' onPress={() => setVisibleLL(true)} textColor='#FFD700'>
                            {linkertLabel}
                        </Button>
                    }
                >
                    <Menu.Item onPress={() => { setLinkertLabel('Stress/Anxiety'); setVisibleLL(false); }} title='Stress/Anxiety' />
                    <Menu.Item onPress={() => { setLinkertLabel('Pain Threshold'); setVisibleLL(false); }} title='Pain Threshold' />
                    <Menu.Item onPress={() => { setLinkertLabel('Never/Always'); setVisibleLL(false); }} title='Never/Always' />
                    <Menu.Item onPress={() => { setLinkertLabel('Important/Not Important'); setVisibleLL(false); }} title='Important/Not Important' />
                    <Menu.Item onPress={() => { setLinkertLabel('Agree/Disagree'); setVisibleLL(false); }} title='Agree/Disagree' />

                </Menu>
            </View>

        {/*Drop-down menu for Quadrant 1 color*/}

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
        <Menu
            visible={visibleOne}
            onDismiss={() => setVisibleOne(false)}
            anchor={
                <Button mode='outlined' onPress={() => setVisibleOne(true)}textColor='#FFD700'>
                    {colorOne}
                </Button>
            }
        >
            <Menu.Item onPress={() => { setColorOne('Red'); setVisibleOne(false); }} title='Red' />
            <Menu.Item onPress={() => { setColorOne('Orange'); setVisibleOne(false); }} title='Orange' />
            <Menu.Item onPress={() => {setColorOne('Yellow'); setVisibleOne(false); }} title='Yellow' />
            <Menu.Item onPress={() => { setColorOne('Green'); setVisibleOne(false); }} title='Green' />
            <Menu.Item onPress={() => {setColorOne('Blue'); setVisibleOne(false); }} title='Blue' />
            <Menu.Item onPress={() => { setColorOne('Violet'); setVisibleOne(false); }} title='Violet' />

        </Menu>
    </View>

      {/*Drop-down menu for Quadrant 2 color*/}

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
        <Menu
            visible={visibleTwo}
            onDismiss={() => setVisibleTwo(false)}
            anchor={
                <Button mode='outlined' onPress={() => setVisibleTwo(true)}textColor='#FFD700'>
                    {colorTwo}
                </Button>
            }
        >
            <Menu.Item onPress={() => { setColorTwo('Red'); setVisibleTwo(false); }} title='Red' />
            <Menu.Item onPress={() => { setColorTwo('Orange'); setVisibleTwo(false); }} title='Orange' />
            <Menu.Item onPress={() => { setColorTwo('Yellow'); setVisibleTwo(false); }} title='Yellow' />
            <Menu.Item onPress={() => { setColorTwo('Green'); setVisibleTwo(false); }} title='Green' />
            <Menu.Item onPress={() => { setColorTwo('Blue'); setVisibleTwo(false); }} title='Blue' />
            <Menu.Item onPress={() => { setColorTwo('Violet'); setVisibleTwo(false); }} title='Violet' />
        </Menu>
    </View>

        {/*Drop-down menu for Quadrant 3 color*/}

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
        <Menu
            visible={visibleThree}
            onDismiss={() => setVisibleThree(false)}
            anchor={
                <Button mode='outlined' onPress={() => setVisibleThree(true)}textColor='#FFD700'>
                    {colorThree}
                </Button>
            }
        >
            <Menu.Item onPress={() => { setColorThree('Red'); setVisibleThree(false); }} title='Red' />
            <Menu.Item onPress={() => { setColorThree('Orange'); setVisibleThree(false); }} title='Orange' />
            <Menu.Item onPress={() => { setColorThree('Yellow'); setVisibleThree(false); }} title='Yellow' />
            <Menu.Item onPress={() => { setColorThree('Green'); setVisibleThree(false); }} title='Green' />
            <Menu.Item onPress={() => { setColorThree('Blue'); setVisibleThree(false); }} title='Blue' />
            <Menu.Item onPress={() => { setColorThree('Violet'); setVisibleThree(false); }} title='Violet' />
        </Menu>
    </View>

       {/*Drop-down menu for Quadrant 4 color*/}

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
        <Menu
            visible={visibleFour}
            onDismiss={() => setVisibleFour(false)}
            anchor={
                <Button mode='outlined' onPress={() => setVisibleFour(true)}textColor='#FFD700'>
                    {colorFour}
                </Button>
            }
        >
            <Menu.Item onPress={() => { setColorFour('Red'); setVisibleFour(false); }} title='Red' />
            <Menu.Item onPress={() => { setColorFour('Orange'); setVisibleFour(false); }} title='Orange' />
            <Menu.Item onPress={() => { setColorFour('Yellow'); setVisibleFour(false); }} title='Yellow' />
            <Menu.Item onPress={() => { setColorFour('Green'); setVisibleFour(false); }} title='Green' />
            <Menu.Item onPress={() => { setColorFour('Blue'); setVisibleFour(false); }} title='Blue' />
            <Menu.Item onPress={() => { setColorFour('Violet'); setVisibleFour(false); }} title='Violet' />
        </Menu>
    </View>

            {/*React Native Paper Segmented Buttons for Return to Dashboard and Create*/}

            <SegmentedButtons
                icon='pencil'
                // value={value}
                // onValueChange={setValue}

                // 'Return to Dashboard' button

                buttons={[{value: 'Return to Dashboard',
                    label: 'Return to Dashboard',
                    icon: 'home',
                    buttonColor: '#6200ee',
                    uncheckedColor: '#FFFFFF'},

                    // 'Create a Study' button

                    {value: 'Create',
                        label: 'Create',
                        icon: 'plus',
                        buttonColor: '#6200ee',
                        uncheckedColor: '#FFFFFF',}]}

                //Actionable buttons

                style={styles.segmented}
                textColor='#ffffff'
                onValueChange={(val) => {
                    if (val === 'Create'){
                        CreateStudy()
                    }
                    if (val === 'Return to Dashboard'){
                           router.push('./adminDashboard');
                    }
                }}
                 value={''}/>
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#25282E',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    content: {
        text: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmented: {
        width: '60%',
        marginBottom: 10,
    },
    header: {
        color: 'white',
        fontSize: 40,
        paddingBottom: 35
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
    inputContent: {
        paddingVertical: 10,
    },
    input: {
        backgroundColor: 'white',
        width: '30%',
        height: 30,
        fontSize: 18,
        marginBottom: 16,
        borderRadius: 25,
        elevation: 8,
    },

    titleBar: {
        backgroundColor: 'white',
        width: '10%',
        paddingVertical: 1,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3,
    },
    titleText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },

});