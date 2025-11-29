import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VictoryAxis, VictoryChart, VictoryLegend, VictoryLine, VictoryScatter, VictoryTheme } from 'victory';

const screenWidth = Dimensions.get("window").width;


interface DailyRating {
    date: Date; 
    stress: number;
    wellBeing: number;
}

interface ChartDataPoint {
    x: number; // Day Index 
    y: number; 
}

// Mock Data
const generateMockData = (numDays: number): DailyRating[] => {
    const mockData: DailyRating[] = [];

    for (let i = 0; i < numDays; i++) {
        const date = new Date(Date.now() - (numDays - 1 - i) * 24 * 60 * 60 * 1000); 

        const stress = Math.max(1, Math.min(10, 8 - i * 0.4 + Math.random() * 2));
        const wellBeing = Math.max(1, Math.min(10, 3 + i * 0.6 + Math.random() * 2));

        mockData.push({
            date: date,
            stress: Math.round(stress * 10) / 10,
            wellBeing: Math.round(wellBeing * 10) / 10,
        });
    }
    return mockData.sort((a, b) => a.date.getTime() - b.date.getTime());
};

const fetchProgressDataFromMongo = (userId: string): Promise<DailyRating[]> => {
    console.log(`Simulating fetch from MongoDB for user: ${userId}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = generateMockData(15); 
            resolve(data);
        }, 1500);
    });
};

const ProgressScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const [userId, setUserId] = useState<string>('MOCK_USER_ID_12345'); // Static ID for MongoDB simulation
    const [isLoading, setIsLoading] = useState(true);
    const [ratings, setRatings] = useState<DailyRating[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedData = await fetchProgressDataFromMongo(userId);
                setRatings(fetchedData);

            } catch (e) {
                console.error("MongoDB Fetch Error:", e);
                setError("Failed to load historical data from the simulated MongoDB backend.");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [userId]); 


    const { stressData, wellBeingData, xTickValues } = useMemo(() => {
        if (ratings.length === 0) return { stressData: [], wellBeingData: [], xTickValues: [] };

        const formattedStress: ChartDataPoint[] = [];
        const formattedWellBeing: ChartDataPoint[] = [];
        const tickValues: string[] = [];

        ratings.forEach((rating, index) => {
            const dayIndex = index + 1;
            const date = rating.date;

            formattedStress.push({ 
                x: dayIndex, 
                y: rating.stress,
            });

            formattedWellBeing.push({ 
                x: dayIndex, 
                y: rating.wellBeing,
            });

            const dayOfMonth = date.getDate();
            tickValues.push(`Day ${dayOfMonth}`);
        });

        return { 
            stressData: formattedStress, 
            wellBeingData: formattedWellBeing, 
            xTickValues: tickValues 
        };
    }, [ratings]);

    if (isLoading) {
        return (
            <View style={[styles.centered, { paddingTop: insets.top }]}>
                <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
                <Text variant="titleMedium" style={{ marginTop: 20 }}>Fetching data from MongoDB...</Text>
                <Text variant="labelSmall" style={styles.userIdText}>
                    Simulated User ID: {userId}
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.centered, { paddingTop: insets.top, paddingHorizontal: 20 }]}>
                 <MaterialCommunityIcons name="database-alert" size={48} color={theme.colors.error} />
                 <Text variant="titleMedium" style={{ marginTop: 10, color: theme.colors.error }}>Database Connection Error</Text>
                 <Text variant="bodyMedium" style={{ textAlign: 'center', marginTop: 10 }}>{error}</Text>
                 <Text variant="bodySmall" style={{ textAlign: 'center', marginTop: 10, color: theme.colors.outline }}>
                    The actual connection to MongoDB failed or the data structure was invalid.
                 </Text>
            </View>
        );
    }

    const chartWidth = screenWidth - 40;

    return (
        <View style={[styles.mainView, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <Text variant="headlineMedium" style={styles.headline}>Your Progress Over Time</Text>
                <Text variant="bodyMedium" style={styles.subTitle}>
                    Tracking Stress vs. Well-being scores across {ratings.length} days.
                </Text>

                {ratings.length > 0 ? (
                    <View style={[styles.chartContainer, { width: chartWidth }]}>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            height={350}
                            width={chartWidth}
                            padding={{ top: 40, bottom: 60, left: 45, right: 20 }}
                            domain={{ x: [1, xTickValues.length], y: [1, 10] }} 
                        >
                            <VictoryLabel 
                                text="Score (1 - 10)" 
                                x={30} y={10} 
                                style={[{ fill: theme.colors.onSurfaceVariant, fontSize: 12 }]}
                            />

                            <VictoryLine
                                data={stressData}
                                x="x" y="y"
                                style={{ data: { stroke: "#E74C3C", strokeWidth: 3 } }} // Red for Stress
                            />

                            <VictoryLine
                                data={wellBeingData}
                                x="x" y="y"
                                style={{ data: { stroke: "#2ECC71", strokeWidth: 3 } }} // Green for Well-being
                            />

                            <VictoryScatter
                                data={stressData}
                                x="x" y="y"
                                size={4}
                                style={{ data: { fill: "#E74C3C" } }}
                            />
                            <VictoryScatter
                                data={wellBeingData}
                                x="x" y="y"
                                size={4}
                                style={{ data: { fill: "#2ECC71" } }}
                            />

                            <VictoryAxis
                                label="Time (Day of Month)"
                                tickValues={xTickValues.map((_, i) => i + 1)} // 1, 2, 3...
                                tickFormat={xTickValues}
                                style={{ 
                                    axisLabel: { padding: 35, fontSize: 14, fontWeight: 'bold' },
                                    tickLabels: { angle: -45, textAnchor: 'end', fontSize: 10, padding: 10 },
                                    grid: { stroke: "#ECF0F1" }
                                }}
                            />

                            <VictoryAxis
                                dependentAxis
                                tickValues={[1, 3, 5, 8, 10]}
                                style={{ 
                                    axisLabel: { padding: 35, fontSize: 14, fontWeight: 'bold' },
                                    grid: { stroke: "#ECF0F1" } 
                                }}
                            />

                            <VictoryLegend x={40} y={15}
                                orientation="horizontal"
                                gutter={30}
                                data={[
                                    { name: "Stress Level", symbol: { fill: "#E74C3C" } },
                                    { name: "Well-being Score", symbol: { fill: "#2ECC71" } }
                                ]}
                            />
                        </VictoryChart>
                    </View>
                ) : (
                    <View style={styles.centered}>
                        <MaterialCommunityIcons name="chart-line-variant" size={48} color={theme.colors.onSurfaceDisabled} />
                        <Text variant="titleMedium" style={{ marginTop: 20 }}>No data recorded yet.</Text>
                        <Text variant="bodySmall" style={{ marginTop: 5, textAlign: 'center', color: theme.colors.onSurfaceVariant }}>
                            Complete your assessments to see your progress displayed here.
                        </Text>
                    </View>
                )}

                <Text variant="labelSmall" style={styles.userIdText}>
                    *Data is simulated to mimic retrieval from a MongoDB backend.*
                </Text>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: { flex: 1, },
    scrollContainer: { flexGrow: 1, alignItems: 'center', padding: 20, },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 300,
    },
    headline: { marginTop: 10, marginBottom: 5, textAlign: 'center', fontWeight: 'bold', },
    subTitle: { marginBottom: 30, textAlign: 'center', color: '#7F8C8D', paddingHorizontal: 10 },
    chartContainer: {
        borderRadius: 12,
        padding: 5,
        backgroundColor: '#fff', 
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
    },
    userIdText: {
        marginTop: 15,
        color: '#95A5A6',
        textAlign: 'center'
    }
});

export default ProgressScreen;