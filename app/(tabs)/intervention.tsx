import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const InterventionScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const router = useRouter();

    const handleStartIntervention = () => {
        console.log("Intervention Start button pressed. (Placeholder action)");
        //  Navigate to post-intervention
        router.replace('/(tabs)/post-intervention');
    };

    return (
        <View style={[styles.mainView, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>
            <View style={styles.centeredContainer}>
                <MaterialCommunityIcons 
                    name="meditation" 
                    size={64} 
                    color={theme.colors.primary} 
                    style={{ marginBottom: 20 }}
                />

                <Text variant="headlineMedium" style={styles.mainHeadline}>
                    Your Personalized Wellness Moment
                </Text>

                <Text variant="bodyLarge" style={styles.bodyText}>
                    This guided exercise is designed to help you recenter and reduce stress based on your current well-being assessment.
                </Text>

                <Text variant="bodyMedium" style={styles.subText}>
                    Find a quiet spot, sit comfortably, and click below to begin your 3-minute guided mindfulness session.
                </Text>

                <Button 
                    mode="contained" 
                    onPress={handleStartIntervention} 
                    style={styles.actionButton}
                    icon="play"
                >
                    Proceed to Post-Intervention
                </Button>

                <Text variant="labelSmall" style={styles.footerText}>
                    Intervention Module V1.0 (Static Placeholder)
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: { 
        flex: 1, 
        paddingHorizontal: 20 
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        textAlign: 'center',
    },
    mainHeadline: { 
        marginBottom: 15, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        color: '#2C3E50' 
    },
    bodyText: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#34495E',
        lineHeight: 25,
    },
    subText: {
        textAlign: 'center',
        marginBottom: 40,
        color: '#7F8C8D',
        fontStyle: 'italic'
    },
    actionButton: {
        width: '80%',
        paddingVertical: 5,
        borderRadius: 10,
    },
    footerText: {
        marginTop: 50,
        color: '#BDC3C7'
    }
});

export default InterventionScreen;