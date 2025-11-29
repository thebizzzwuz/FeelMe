import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import { Text, useTheme, ActivityIndicator, Button } from 'react-native-paper'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryAxis, VictoryLabel, VictoryLine, VictoryArea } from 'victory';

const screenWidth = Dimensions.get("window").width;
const TEMP_USER_ID = 'participant_777'; 
const MIDPOINT = 5.0; 

const QUADRANT_COLORS = {
    "Ideal State": { 
        color: '#2ECC71', 
        rgba: 'rgba(46, 204, 113, 0.12)', 
        description: "Excellent work! Focus on maintaining low stress while continuing to boost well-being." 
    },
    "High Functioning / Burnout Risk": { 
        color: '#F39C12', 
        rgba: 'rgba(243, 156, 18, 0.12)',
        description: "High performance comes with high stress. Focus on effective coping mechanisms and boundaries."
    },
    "Disengaged / Bored": { 
        color: '#3498DB', 
        rgba: 'rgba(52, 152, 219, 0.12)',
        description: "Low energy and low pressure. Explore new challenges or passion projects to improve well-being."
    },
    "Danger Zone / Stress Out": { 
        color: '#E74C3C', 
        rgba: 'rgba(231, 76, 60, 0.12)',
        description: "A critical state. Prioritize self-care and stress reduction immediately."
    },
    "N/A": { color: '#95A5A6', rgba: 'rgba(149, 165, 166, 0.12)', description: "Data not available." },
};


interface RatingPoint {
    id: string; 
    stress: number; 
    wellBeing: number;
    label: string;
    color: string;
}

// Mocked Data
const MOCKED_DATA: RatingPoint[] = [
    { id: 'Pre', stress: 8.0, wellBeing: 4.5, label: 'Pre', color: QUADRANT_COLORS["Danger Zone / Stress Out"].color },
    { id: 'Post', stress: 3.2, wellBeing: 7.8, label: 'Post', color: QUADRANT_COLORS["Ideal State"].color },
];

const getQuadrantName = (stress: number, wellBeing: number) => {
    if (stress <= MIDPOINT && wellBeing > MIDPOINT) return "Ideal State"; 
    if (stress > MIDPOINT && wellBeing > MIDPOINT) return "High Functioning / Burnout Risk"; 
    if (stress <= MIDPOINT && wellBeing <= MIDPOINT) return "Disengaged / Bored"; 
    if (stress > MIDPOINT && wellBeing <= MIDPOINT) return "Danger Zone / Stress Out"; 
    return "N/A";
}

const PreResultsScreen: React.FC = () => { 
    const insets = useSafeAreaInsets();
    const theme = useTheme(); 

    const [data, setData] = useState<RatingPoint[]>(MOCKED_DATA);

    const latestPoint = data.find(p => p.id === 'Post') || data[0];
    const latestQuadrantName = latestPoint ? getQuadrantName(latestPoint.stress, latestPoint.wellBeing) : "N/A";
    const latestQuadrant = QUADRANT_COLORS[latestQuadrantName] || QUADRANT_COLORS["N/A"];

    const chartHeight = 350;
    const chartWidth = screenWidth - 40;

    const horizontalLineData = [{ x: 1, y: MIDPOINT }, { x: 10, y: MIDPOINT }];
    const verticalLineData = [{ x: MIDPOINT, y: 1 }, { x: MIDPOINT, y: 10 }];

    return (
        <View style={[styles.mainView, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <Text variant="headlineMedium" style={styles.headline}>Well-being & Stress Quadrant</Text>
                <Text variant="bodyMedium" style={styles.subTitle}>
                    Visualize your position across the Pre- and Post-Intervention phases.
                </Text>

                <View style={[styles.chartContainer, { width: chartWidth }]}>
                    <Text variant="titleLarge" style={styles.chartTitle}>Stress (X) vs. Well-being (Y)</Text>

                    <VictoryChart
                        theme={VictoryTheme.material}
                        height={chartHeight}
                        width={chartWidth}
                        padding={{ top: 20, bottom: 50, left: 45, right: 20 }}
                        domain={{ x: [1, 10], y: [1, 10] }} 
                    >

                        <VictoryArea
                            data={[{ x: 1, y: 10 }, { x: MIDPOINT, y: 10 }]}
                            x="x" y="y"
                            y0={() => MIDPOINT}
                            style={{ data: { fill: QUADRANT_COLORS["Ideal State"].rgba, strokeWidth: 0 } }}
                        />

                        <VictoryArea
                            data={[{ x: MIDPOINT, y: 10 }, { x: 10, y: 10 }]}
                            x="x" y="y"
                            y0={() => MIDPOINT}
                            style={{ data: { fill: QUADRANT_COLORS["High Functioning / Burnout Risk"].rgba, strokeWidth: 0 } }}
                        />

                        <VictoryArea
                            data={[{ x: 1, y: MIDPOINT }, { x: MIDPOINT, y: MIDPOINT }]}
                            x="x" y="y"
                            y0={() => 1}
                            style={{ data: { fill: QUADRANT_COLORS["Disengaged / Bored"].rgba, strokeWidth: 0 } }}
                        />


                        <VictoryArea
                            data={[{ x: MIDPOINT, y: MIDPOINT }, { x: 10, y: MIDPOINT }]}
                            x="x" y="y"
                            y0={() => 1}
                            style={{ data: { fill: QUADRANT_COLORS["Danger Zone / Stress Out"].rgba, strokeWidth: 0 } }}
                        />

                        <VictoryLine
                            data={horizontalLineData}
                            x="x"
                            y="y"
                            style={{ data: { stroke: "#95A5A6", strokeDasharray: "5,5", strokeWidth: 1 } }}
                        />
                        <VictoryLine
                            data={verticalLineData}
                            x="x"
                            y="y"
                            style={{ data: { stroke: "#95A5A6", strokeDasharray: "5,5", strokeWidth: 1 } }}
                        />

                        <VictoryScatter
                            data={data}
                            x="stress" 
                            y="wellBeing" 
                            size={7}
                            style={{ 
                                data: { 
                                    fill: ({ datum }) => datum.color, 
                                    opacity: 0.9,
                                    stroke: "#333",
                                    strokeWidth: 1.5,
                                },
                            }}
                            labels={({ datum }) => datum.label}
                            labelComponent={<VictoryLabel renderInPortal dx={8} dy={-8} style={[{ fontSize: 14, fontWeight: 'bold' }]} />}
                        />

                        <VictoryAxis
                            label="Stress Level (1 = Low, 10 = High)"
                            dependentAxis={false}
                            tickValues={[1, 3, MIDPOINT, 8, 10]}
                            style={{
                                axisLabel: { padding: 30, fontSize: 14, fontWeight: 'bold' },
                                grid: { stroke: "#ECF0F1" }
                            }}
                        />

                        <VictoryAxis
                            label="Well-being Score (1 = Poor, 10 = Excellent)"
                            dependentAxis={true}
                            tickValues={[1, 3, MIDPOINT, 8, 10]}
                            style={{
                                axisLabel: { padding: 35, fontSize: 14, fontWeight: 'bold' },
                                grid: { stroke: "#ECF0F1" }
                            }}
                        />
                    </VictoryChart>
                </View>

                <View style={[styles.interpretationBox, { borderLeftColor: latestQuadrant.color }]}>
                    <Text variant="titleMedium" style={{ marginBottom: 10, fontWeight: 'bold' }}>Your Current State (Post-Intervention)</Text>
                    <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color={latestQuadrant.color} style={{alignSelf: 'center', marginVertical: 8}} />
                    <Text variant="bodyLarge" style={{ textAlign: 'center', fontWeight: 'bold', color: latestQuadrant.color }}>
                        {latestQuadrantName}
                    </Text>
                    <Text variant="bodySmall" style={{ marginTop: 10, textAlign: 'center', color: theme.colors.onSurfaceVariant }}>
                        {latestQuadrant.description}
                    </Text>
                </View>

                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: MOCKED_DATA.find(d => d.id === 'Pre')?.color }]} />
                        <Text variant="bodyMedium">Pre-Intervention</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: MOCKED_DATA.find(d => d.id === 'Post')?.color }]} />
                        <Text variant="bodyMedium">Post-Intervention</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: { flex: 1, },
    scrollContainer: { flexGrow: 1, alignItems: 'center', padding: 20, },
    headline: { marginTop: 10, marginBottom: 5, textAlign: 'center', fontWeight: 'bold', },
    subTitle: { marginBottom: 30, textAlign: 'center', color: '#7F8C8D', },
    chartContainer: {
        borderRadius: 12,
        padding: 5,
        backgroundColor: '#fff', 
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
    },
    chartTitle: { marginVertical: 10, textAlign: 'center', color: '#2C3E50', fontWeight: 'bold' },
    interpretationBox: { 
        width: '100%', 
        marginTop: 10, 
        padding: 20, 
        borderRadius: 12, 
        backgroundColor: '#ECF0F1',
        borderLeftWidth: 5,
    },
    legendContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#F7F9F9',
        borderRadius: 8,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendColor: {
        width: 15,
        height: 15,
        borderRadius: 8,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#333'
    },
});

export default PreResultsScreen;