// stylesheet for all screens
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#E6F2E0',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmented: {
        width: '90%',
        marginBottom: 60,
    },
    grid: {
        backgroundColor: '#11433a',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    header:{
        marginBottom: 20,
        fontWeight: 'bold',         
    },
    card: {
        borderRadius: 16,
        marginBottom: 20,
        elevation: 4,
    }, 
    gridCard: {
        backgroundColor: '#E6F2E0',
        width: 430,
        alignContent: 'center',
        marginBottom: 50,
  },
    flavorDescription: {
        marginBottom: 12,
        color: '#4A7C59'
    },
    illustration: {
        height: 120,
        resizeMode: 'contain',
        marginBottom: 12,
    },
    button: {
        borderRadius: 24,
        backgroundColor: '#11433a',
        marginBottom: 12,
        marginTop: 12,
        marginLeft: 20,
        marginRight: 20,
    },
    text: {
        color: '#11433a',
        fontSize: 30,
        marginVertical: 10,
        textAlign: 'center',
  },
  text2: {
        color: '#E6F2E0',
        fontSize: 50,
        marginVertical: 10,
        textAlign: 'center',
  }
});