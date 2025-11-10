import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import {Text, Button, SegmentedButtons, TextInput, Menu, Provider as PaperProvider} from 'react-native-paper';
// import DropDown from 'react-native-paper-dropdown';


export default function CreateStudy() {

    // State variables for drop-down menus

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

    return (

        <View style={styles.container}>

            <Text style={styles.header}>Admin Create a Study</Text>

            <View style={styles.titleBar}>
                <Text style={styles.titleText}>Study</Text>
            </View>

            {/*Input field for name of Study*/}

            <TextInput label='Name of Study'
                // value={text}
                // onChangeText={setText}
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
                // value={text}
                // onChangeText={setText}
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
                // value={text}
                // onChangeText={setText}
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
                icon='pencil'
                // value={value}
                // onValueChange={setValue}
                buttons={[{value: 'Return to Dashboard',
                    label: 'Return to Dashboard',
                    icon: 'home',
                    buttonColor: '#6200ee',
                    uncheckedColor: '#FFFFFF'},
                    {value: 'Create',
                        label: 'Create',
                        icon: 'plus',
                        buttonColor: '#6200ee',
                        uncheckedColor: '#FFFFFF',}]}
                style={styles.segmented}
                textColor='#ffffff'
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