import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const InterventionStart: React.FC = () => { 
    const insets = useSafeAreaInsets();
    const router = useRouter(); 
    const theme = useTheme(); // Access the Paper theme for colors and spacing

    const handleStartPostIntervention = () => {
        // route to get to post-intervention survey
        router.push('/postintervention'); 
    };

    return (
        <View style={[styles.mainView, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <MaterialCommunityIcons 
                    name="lightbulb-on" 
                    size={80} 
                    color={theme.colors.primary} 
                    style={styles.icon} 
                />

                <Text variant="headlineMedium" style={styles.headline}>Intervention Complete!</Text>
                
                <Text variant="titleMedium" style={styles.subTitle}>
                    You've successfully dedicated time to your well-being. {/* motivational messege */}
                </Text>
                <Text variant="bodyLarge" style={styles.bodyText}>
                    Thank you for participating fully in this study's intervention phase. Your commitment to the process is crucial for gathering accurate and meaningful results.
                </Text>
                <Text variant="bodyLarge" style={[styles.bodyText, {marginBottom: 40, fontWeight: 'bold'}]}>
                    We are now ready for the final step: the **Post-Intervention Assessment.**
                </Text>

                {/* button to start post-intervention survey */}
                <Button 
                    mode="contained" 
                    icon="arrow-right-circle"
                    onPress={handleStartPostIntervention}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Start Final Assessment
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: { 
        flex: 1,
    },
    scrollContainer: { 
        flexGrow: 1,
        alignItems: 'center',
        padding: 30,
        justifyContent: 'center', // Center content vertically
    },
    icon: {
        marginBottom: 20,
    },
    headline: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subTitle: {
        marginBottom: 20,
        textAlign: 'center',
        color: '#7F8C8D',
    },
    bodyText: {
        marginBottom: 15,
        textAlign: 'center',
        lineHeight: 25,
        paddingHorizontal: 10,
    },
    button: {
        width: '80%',
        paddingVertical: 8,
        marginTop: 20,
        borderRadius: 10,
    },
    buttonLabel: {
        fontSize: 18,
    },
});

export default InterventionStart;