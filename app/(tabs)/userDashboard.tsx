import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import {Text, Button, SegmentedButtons} from 'react-native-paper';

export default function UserDashboard() {
    return (

        // Title Bar

        <View style={styles.container}>
            <Text style={styles.header}>Welcome!</Text>
            <Text style={styles.title}>Stress and Anxiety Study</Text>

            {/*Large Button for Participant to Log Data*/}

            <Button icon='pencil' mode='contained' onPress={() => console.log('Pressed')}
                    style={[styles.largeButton]}
                    labelStyle={styles.textLargeButton} >
               Daily Self-Rating
            </Button>

            {/*React Native Paper Segmented Buttons for View Progress and Download Data*/}

        <SegmentedButtons
            icon='pencil'
            // value={value}
            // onValueChange={setValue}
            buttons={[{value: 'View Progress',
                label: 'View Progress',
                icon: 'chart-line',
                buttonColor: '#6200ee',
                uncheckedColor: '#FFFFFF'},
                {value: 'Download Data',
                    label: 'Download Data',
                    icon: 'download',
                    buttonColor: '#6200ee',
                    uncheckedColor: '#FFFFFF',}]}
            style={styles.segmented}
            textColor='#ffffff'
        />
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
        width: '90%',
        marginBottom: 60,
    },
    header: {
    color: 'white',
        fontSize: 70
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

});