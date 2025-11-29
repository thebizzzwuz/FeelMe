import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

interface ScoreData {
    stress: number | null;
    wellBeing: number | null;
}

// Slider Component
interface RatingSliderProps {
    label: string;
    value: number | null;
    minLabel: string;
    maxLabel: string;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    theme: any;
}

const RatingSlider: React.FC<RatingSliderProps> = ({ label, value, minLabel, maxLabel, onChange, min, max, step, theme }) => {
    const sliderValue = value !== null ? value : min;

    const handleValueChange = (newValue: number) => {
        const roundedValue = Math.round(newValue / step) * step;
        onChange(roundedValue);
    };

    return (
        <View style={styles.inputGroup}>
            <Text variant="titleMedium" style={styles.inputLabel}>{label}</Text>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Text variant="headlineSmall" style={{ marginBottom: 15, color: theme.colors.primary, fontWeight: 'bold' }}>
                    {value !== null ? value.toFixed(0) : 'Move Slider'}
                </Text>
                <Slider
                    style={styles.slider}
                    minimumValue={min}
                    maximumValue={max}
                    step={step}
                    value={sliderValue}
                    onValueChange={handleValueChange}
                    onSlidingComplete={handleValueChange}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor="#DCDCDC"
                    thumbTintColor={theme.colors.primary}
                />
            </View>
            <View style={styles.scaleLabels}>
                <Text variant="labelSmall" style={styles.scaleLabelText}>{minLabel}</Text>
                <Text variant="labelSmall" style={styles.scaleLabelText}>{maxLabel}</Text>
            </View>
        </View>
    );
};

const PreRatingScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const router = useRouter();

    const [scores, setScores] = useState<ScoreData>({ stress: null, wellBeing: null });
    const [isSaving, setIsSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Ready to assess.');

    const isComplete = scores.stress !== null && scores.wellBeing !== null;

    const handleScoreChange = (type: 'stress' | 'wellBeing', value: number) => {
        setScores(prev => ({ ...prev, [type]: value }));
    }

    const handleSubmit = async () => {
        if (!isComplete) {
            setStatusMessage('Please rate both Stress and Well-being to continue.');
            return;
        }

        setIsSaving(true);
        setStatusMessage('Saving baseline scores...');

        try {
            // Get the logged-in user's JWT
            const token = await AsyncStorage.getItem('jwtToken');
            if (!token) {
                Alert.alert("Not logged in", "Please log in before submitting your ratings.");
                setIsSaving(false);
                return;
            }

            // Send data to your backend API
            const API_URL = 'http://localhost:3000/api/logs/submit-log'; // Replace with your server
            const response = await axios.post(API_URL, {
                studyId: 'study_001',
                logX: scores.wellBeing,
                logY: scores.stress,
                isPostIntervention: false,
                comment: '', // optional, you can add a TextInput for comments if you want
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setStatusMessage('Baseline saved! Proceeding to Intervention.');
            console.log("Pre-Intervention Scores submitted successfully:", scores, response.data);

            //  Navigate to the middle screen
            router.replace('/(tabs)/intervention');

        } catch (error: any) {
            const errorMessage = error.response?.data?.msg || error.message || 'Failed to save data.';
            console.error("MongoDB Save Error:", error);
            setStatusMessage(errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <View style={[styles.mainView, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <MaterialCommunityIcons 
                    name="calendar-check-outline" 
                    size={48} 
                    color={theme.colors.primary} 
                    style={{ marginBottom: 20 }}
                />
                <Text variant="headlineMedium" style={styles.headline}>
                    Step 1: Pre-Intervention Rating
                </Text>
                <Text variant="bodyLarge" style={styles.subTitle}>
                    Please rate your current stress and well-being before starting the guided exercise.
                </Text>

                <RatingSlider
                    label="Current Stress Level (1-10)"
                    value={scores.stress}
                    minLabel="1 (Very Low Stress)"
                    maxLabel="10 (Maximum Stress)"
                    onChange={(value) => handleScoreChange('stress', value)}
                    min={1}
                    max={10}
                    step={1}
                    theme={theme}
                />

                <RatingSlider
                    label="Current Well-being Score (1-10)"
                    value={scores.wellBeing}
                    minLabel="1 (Very Poor Well-being)"
                    maxLabel="10 (Excellent Well-being)"
                    onChange={(value) => handleScoreChange('wellBeing', value)}
                    min={1}
                    max={10}
                    step={1}
                    theme={theme}
                />

                <Button 
                    mode="contained" 
                    onPress={handleSubmit} 
                    disabled={!isComplete || isSaving}
                    loading={isSaving}
                    style={styles.actionButton}
                    icon="chevron-right"
                >
                    {isSaving ? 'Saving...' : 'Start Intervention'}
                </Button>

                <View style={styles.statusBox}>
                    <MaterialCommunityIcons 
                        name={isComplete ? "check-circle" : "alert-circle-outline"} 
                        size={16} 
                        color={isComplete ? theme.colors.primary : theme.colors.warning} 
                        style={{marginRight: 8}}
                    />
                    <Text variant="labelMedium" style={{color: theme.colors.outline}}>{statusMessage}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: { flex: 1 },
    scrollContainer: { flexGrow: 1, padding: 20, alignItems: 'center' },
    headline: { marginTop: 10, marginBottom: 5, textAlign: 'center', fontWeight: 'bold', color: '#2C3E50' },
    subTitle: { marginBottom: 40, textAlign: 'center', color: '#7F8C8D', paddingHorizontal: 10 },
    inputGroup: { width: '100%', marginBottom: 40, alignItems: 'center', paddingHorizontal: 20 },
    inputLabel: { marginBottom: 5, color: '#34495E', fontWeight: '600' },
    slider: { width: '100%', height: 40 },
    scaleLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 5, marginTop: -10 },
    scaleLabelText: { maxWidth: '40%', textAlign: 'center', color: '#95A5A6' },
    actionButton: { width: '90%', marginVertical: 15, borderRadius: 10 },
    statusBox: { flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 10, borderRadius: 8, backgroundColor: '#F0F3F4' },
});

export default PreRatingScreen;
