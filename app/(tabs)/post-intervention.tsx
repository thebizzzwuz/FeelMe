import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScoreData {
    stress: number | null;
    wellBeing: number | null;
}

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
                    {value !== null ? value.toFixed(1) : 'Move Slider'}
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

const PostRatingScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const router = useRouter();

    const [scores, setScores] = useState<ScoreData>({ stress: null, wellBeing: null });
    const [isSaving, setIsSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Ready to submit post-intervention scores.');

    const isComplete = scores.stress !== null && scores.wellBeing !== null;

    const handleScoreChange = (type: 'stress' | 'wellBeing', value: number) => {
        setScores(prev => ({ ...prev, [type]: value }));
    }

    const handleSubmit = async () => {
        if (!isComplete) {
            setStatusMessage('Please rate both Stress and Well-being before submitting.');
            return;
        }

        setIsSaving(true);
        setStatusMessage('Saving post-intervention scores...');

        try {
            // Get logged-in user's JWT
            const token = await AsyncStorage.getItem('jwtToken');
            if (!token) {
                Alert.alert("Not logged in", "Please log in before submitting your ratings.");
                setIsSaving(false);
                return;
            }

            // Get study name from AsyncStorage
            const studyName = await AsyncStorage.getItem('studyName');
            if (!studyName) {
            Alert.alert("Missing Study", "Could not determine your study. Please log in again.");
            setIsSaving(false);
            return;
            }


            //  Post to backend API
            const API_URL = 'https://feelme.onrender.com/api/logs/submit-log'; // replace with your server
            await axios.post(API_URL, {
                studyId: studyName,
                logX: scores.wellBeing,
                logY: scores.stress,
                isPostIntervention: true, // post-intervention flag
                comment: '', // optional, can add TextInput for comments
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setStatusMessage('Scores saved! View the results in the Progress tab.');
            console.log("Post-Intervention Scores submitted successfully:", scores);

            // navigate to progress page
            router.replace('/(tabs)/post-results'); // 

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
                    name="chart-line-variant" 
                    size={48} 
                    color={theme.colors.primary} 
                    style={{ marginBottom: 20 }}
                />
                <Text variant="headlineMedium" style={styles.headline}>
                    Step 2: Post-Intervention Rating
                </Text>
                <Text variant="bodyLarge" style={styles.subTitle}>
                    How do you rate your current stress and well-being *after* the guided exercise?
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
                >
                    {isSaving ? 'Submitting...' : 'Submit Post-Intervention'}
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

export default PostRatingScreen;
