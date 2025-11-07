import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
// install the slider package: npm install @react-native-community/slider
import Slider from '@react-native-community/slider'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import axios from 'axios'; 
import { useRouter } from 'expo-router'; 

// imports solely for react native paper -- use this for layout.tsx
import { Text, TextInput, Button, Surface, useTheme } from 'react-native-paper'; 

// example user ID -- replace with MongoDB data
const TEMP_USER_ID = 'participant_001'; 

interface RatingState {
    wellBeing: number;
    stressLevel: number;
    comments: string;
}

const PreInterventionRating: React.FC = () => { 
    const insets = useSafeAreaInsets();
    const router = useRouter(); 
    const theme = useTheme(); // Access the Paper theme for colors and spacing
    
    const [state, setState] = useState<RatingState>({
        wellBeing: 5.0, 
        stressLevel: 5.0,
        comments: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    
    // userId is hardcoded temporarily -- login/auth patch needed
    const userId = TEMP_USER_ID; 

    // Function for saving the initial baseline data to the Express server (MongoDB)
    const handleSaveRating = async () => {
        if (!userId) {
            Alert.alert("Error", "User identification missing.");
            return;
        }

        if (state.wellBeing < 1 || state.stressLevel < 1) {
            Alert.alert("Missing Data", "Please set both Well-being and Stress ratings.");
            return;
        }

        setIsLoading(true);

        const dataToSave = {
            ...state,
            type: 'baseline_pre_intervention', 
            userId: userId, 
        };

        // Update this IP address to match your local server / deployment URL
        const API_URL = 'http://192.168.1.8:3000/api/ratings/baseline'; 

        try {
            const response = await axios.post(API_URL, dataToSave);
            
            Alert.alert("Success", response.data.msg || "Baseline data saved! Starting intervention phase.");
            
            // Navigate to the Dashboard which lives inside the (tabs) folder
            router.replace('/(tabs)/dashboard'); 
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Could not connect to the server. Please check network.';
            console.error("MongoDB Save Error:", error);
            Alert.alert("Save Failed", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to get text for the slider label based on value -- replace with MongoDB data 
    const getSliderLabel = (value: number, type: 'wellBeing' | 'stressLevel') => {
        if (type === 'wellBeing') {
            if (value <= 3) return "Low";
            if (value <= 6) return "Moderate";
            return "High";
        } else { // stressLevel
            if (value <= 3) return "Low Stress";
            if (value <= 6) return "Moderate Stress";
            return "High Stress";
        }
    }

    return (
        <View style={[styles.mainView, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <Text variant="headlineMedium" style={styles.headline}>Baseline Self-Rating</Text>
                <Text variant="bodyMedium" style={styles.subTitle}>
                    Please provide your current well-being and stress scores before beginning the study.
                </Text>

                {/* SLIDER 1: WELL-BEING */}
                <Surface style={styles.ratingBlock} elevation={1}>
                    <Text variant="titleMedium" style={styles.ratingTitle}>Current Well-being Score (1-10)</Text>
                    <Text variant="displaySmall" style={[styles.scoreText, { color: theme.colors.primary }]}>
                        {state.wellBeing.toFixed(1)} / 10
                    </Text>
                    <Text variant="bodySmall" style={styles.feedbackText}>
                        Level: {getSliderLabel(state.wellBeing, 'wellBeing')}
                    </Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={10}
                        step={0.5} 
                        value={state.wellBeing}
                        onValueChange={(value) => setState(s => ({ ...s, wellBeing: value }))}
                        minimumTrackTintColor={theme.colors.primary} 
                        maximumTrackTintColor={theme.colors.backdrop}
                        thumbTintColor={theme.colors.primary}
                    />
                    <View style={styles.rangeLabelContainer}>
                        <Text style={styles.rangeLabel}>1 (Poor)</Text>
                        <Text style={styles.rangeLabel}>10 (Excellent)</Text>
                    </View>
                </Surface>

                {/* SLIDER 2: STRESS LEVEL */}
                <Surface style={styles.ratingBlock} elevation={1}>
                    <Text variant="titleMedium" style={styles.ratingTitle}>Current Stress Level (1-10)</Text>
                    <Text variant="displaySmall" style={[styles.scoreText, { color: theme.colors.error }]}>
                        {state.stressLevel.toFixed(1)} / 10
                    </Text>
                    <Text variant="bodySmall" style={styles.feedbackText}>
                        Level: {getSliderLabel(state.stressLevel, 'stressLevel')}
                    </Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={10}
                        step={0.5} 
                        value={state.stressLevel}
                        onValueChange={(value) => setState(s => ({ ...s, stressLevel: value }))}
                        minimumTrackTintColor={theme.colors.error} 
                        maximumTrackTintColor={theme.colors.backdrop}
                        thumbTintColor={theme.colors.error}
                    />
                    <View style={styles.rangeLabelContainer}>
                        <Text style={styles.rangeLabel}>1 (Low Stress)</Text>
                        <Text style={styles.rangeLabel}>10 (High Stress)</Text>
                    </View>
                </Surface>

                {/* COMMENTS TEXT INPUT */}
                <Text variant="titleMedium" style={[styles.ratingTitle, { marginTop: 20 }]}>Comments (Optional)</Text>
                <TextInput
                    style={{ width: '100%', marginBottom: 30 }}
                    mode="outlined" // Provides the standard React Native Paper outline style
                    placeholder="e.g., 'Feeling a bit burnt out from work.'"
                    multiline
                    numberOfLines={4}
                    value={state.comments}
                    onChangeText={(text) => setState(s => ({ ...s, comments: text }))}
                />

                {/* SAVE BUTTON */}
                <Button 
                    mode="contained" 
                    onPress={handleSaveRating}
                    loading={isLoading}
                    disabled={isLoading}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    {isLoading ? 'Saving...' : 'Start Intervention Phase'}
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
        padding: 20,
    },
    headline: {
        marginTop: 20,
        marginBottom: 5,
        textAlign: 'center',
    },
    subTitle: {
        marginBottom: 30,
        textAlign: 'center',
        color: '#7F8C8D',
    },
    ratingBlock: {
        width: '100%',
        marginBottom: 25,
        padding: 15,
        borderRadius: 12,
    },
    ratingTitle: {
        marginBottom: 8,
        textAlign: 'center',
    },
    scoreText: {
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    feedbackText: {
        textAlign: 'center',
        marginBottom: 15,
        color: '#7F8C8D',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    rangeLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 5,
    },
    rangeLabel: {
        fontSize: 12,
        color: '#95A5A6',
    },
    button: {
        width: '100%',
        paddingVertical: 5,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 8,
    },
    buttonLabel: {
        fontSize: 18,
    },
});

export default PreInterventionRating;