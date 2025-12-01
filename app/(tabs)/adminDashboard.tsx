import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from '../../app/src/styles/styles';

export default function AdminDashboard() {
    return (

        // Title Bar

        <View style={styles.container}>
            <Text style={stylesAdminDashboard.text1}>ADMIN Page</Text>
            <Text style={stylesAdminDashboard.text2}>ADMIN - Stress and Anxiety Study</Text>

            <Button icon='pencil' mode='contained' onPress={() => console.log('Pressed')}
                    style={[styles.button]}
                    labelStyle={styles.button}
            >
                Daily Self-Rating
            </Button>

        </View>

    )
}

const stylesAdminDashboard = StyleSheet.create({

    // container: {
    //     backgroundColor: '#25282E',
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'flex-end',
    // },
    // content: {
    //     text: 'white',
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // segmented: {
    //     width: '90%',
    //     marginBottom: 60,
    // },
    text1: {
        color: 'white',
        fontSize: 70
    },
    text2: {
        paddingBottom: 150,
        color: 'white',
        fontSize: 30
    },
    // textButtonLarge: {
    //     color: '#000',
    //     fontSize: 22,
    //     fontWeight: 'bold',
    //     paddingBottom: 3
    // },

    // largeButton: {
    //     backgroundColor: '#ffffff',
    //     width: 300,
    //     height: 70,
    //     borderRadius: 15,
    //     justifyContent: 'center',
    //     marginTop: 20,
    //     marginBottom: 100,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //     elevation: 6,

    // },

});