import axios from 'axios';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu, Provider as PaperProvider, SegmentedButtons, Text, TextInput } from 'react-native-paper';
// import DropDown from 'react-native-paper-dropdown';


export default function CreateStudy() {

    // State variables for Create Study inputs

    const [studyName, setStudyName] = React.useState('');
    const [variable1, setVariable1] = React.useState('');
    const [variable2, setVariable2] = React.useState('');
    const [visibleLL, setVisibleLL] = React.useState(false);
    const [label, setLabel] = React.useState('Likert Labels');
    const [visible1, setVisible1] = React.useState(false);
    const [color1, setColor1] = React.useState('Quadrant 1 Color');
    const [visible2, setVisible2] = React.useState(false);
    const [color2, setColor2] = React.useState('Quadrant 2 Color');
    const [visible3, setVisible3] = React.useState(false);
    const [color3, setColor3] = React.useState('Quadrant 3 Color');
    const [visible4, setVisible4] = React.useState(false);
    const [color4, setColor4] = React.useState('Quadrant 4 Color');

    // Create a study function to send data to backend
    const CreateStudy = async () => {

        try {
            const res = await axios.post('localhost:8081/api/study/create', {
                studyName: studyName,
                variable1: variable1,
                variable2: variable2,
                color1: color1,
                color2: color2,
                color3: color3,
                color4: color4
            });

            console.log(res.status);
            alert('Study Created!');
            
            // Restore input fields upon successful creation
            
            setStudyName('');
            setVariable1('');
            setVariable2('');
            setColor1('Quadrant 1 Color');
            setColor2('Quadrant 2 Color');
            setColor3('Quadrant 3 Color');
            setColor4('Quadrant 4 Color');

        } catch (error) {
            console.error('Error during study creation:', error);
            alert('Study creation failed. Please check your inputs.');
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

            {/*Input field for Variable #1*/}

            <View style={styles.titleBar}>
                <Text style={styles.titleText}>Variable #1</Text>
            </View>


            <TextInput label='Variable #1'
                value={variable1}
                onChangeText={setVariable1}
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

            {/*Input field for Variable #2*/}

            <View style={styles.titleBar}>
                <Text style={styles.titleText}>Variable #2</Text>
            </View>

            <TextInput label='Variable #2'
                value={variable2}
                onChangeText={setVariable2}
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

<PaperProvider>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
                <Menu
                    visible={visibleLL}
                    onDismiss={() => setVisibleLL(false)}
                    anchor={
                        <Button mode='outlined' onPress={() => setVisibleLL(true)} textColor='#FFD700'>
                            {label}
                        </Button>
                    }
                >
                    <Menu.Item onPress={() => { setLabel('Admin'); setVisibleLL(false); }} title='Admin' />
                    <Menu.Item onPress={() => { setLabel('User'); setVisibleLL(false); }} title='User' />
                    <Menu.Item onPress={() => { setLabel('Guest'); setVisibleLL(false); }} title='Guest' />
                </Menu>
            </View>

    {/*Drop-down menu for Quadrant 1*/}

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
        <Menu
            visible={visible1}
            onDismiss={() => setVisible1(false)}
            anchor={
                <Button mode='outlined' onPress={() => setVisible1(true)}textColor='#FFD700'>
                    {color1}
                </Button>
            }
        >
            <Menu.Item onPress={() => { setColor1('Admin'); setVisible1(false); }} title='Admin' />
            <Menu.Item onPress={() => { setColor1('User'); setVisible1(false); }} title='User' />
            <Menu.Item onPress={() => { setColor1('Guest'); setVisible1(false); }} title='Guest' />
        </Menu>
    </View>

    {/*Drop-down menu for Quadrant 2*/}

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
        <Menu
            visible={visible2}
            onDismiss={() => setVisible2(false)}
            anchor={
                <Button mode='outlined' onPress={() => setVisible2(true)}textColor='#FFD700'>
                    {color2}
                </Button>
            }
        >
            <Menu.Item onPress={() => { setColor2('Admin'); setVisible2(false); }} title='Admin' />
            <Menu.Item onPress={() => { setColor2('User'); setVisible2(false); }} title='User' />
            <Menu.Item onPress={() => { setColor2('Guest'); setVisible2(false); }} title='Guest' />
        </Menu>
    </View>

    {/*Drop-down menu for Quadrant 3*/}

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
        <Menu
            visible={visible3}
            onDismiss={() => setVisible3(false)}
            anchor={
                <Button mode='outlined' onPress={() => setVisible3(true)}textColor='#FFD700'>
                    {color3}
                </Button>
            }
        >
            <Menu.Item onPress={() => { setColor3('Admin'); setVisible3(false); }} title='Admin' />
            <Menu.Item onPress={() => { setColor3('User'); setVisible3(false); }} title='User' />
            <Menu.Item onPress={() => { setColor3('Guest'); setVisible3(false); }} title='Guest' />
        </Menu>
    </View>

    {/*Drop-down menu for Quadrant 4*/}

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
        <Menu
            visible={visible4}
            onDismiss={() => setVisible4(false)}
            anchor={
                <Button mode='outlined' onPress={() => setVisible3(true)}textColor='#FFD700'>
                    {color4}
                </Button>
            }
        >
            <Menu.Item onPress={() => { setColor4('Admin'); setVisible4(false); }} title='Admin' />
            <Menu.Item onPress={() => { setColor4('User'); setVisible4(false); }} title='User' />
            <Menu.Item onPress={() => { setColor4('Guest'); setVisible4(false); }} title='Guest' />
        </Menu>
    </View>
</PaperProvider>

            {/*React Native Paper Segmented Buttons for Return to Dashboard and Create*/}

            <SegmentedButtons
                // value={value}
                // onValueChange={setValue}
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
                onValueChange={() => {}}
                 value={''}/>
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