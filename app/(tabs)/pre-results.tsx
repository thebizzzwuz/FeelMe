import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryScatter } from 'victory';

const MIDDLE_POINT = 5;
const CHART_WIDTH = 300;
const CHART_HEIGHT = 300;

interface LogEntry {
    logX: number;
    logY: number;
    createdAt: string;
    comment?: string;
}

const PreInterventionResults: React.FC = () => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const downloadCSV = async () => {
        const token = await AsyncStorage.getItem('jwtToken');
        const res = await fetch("http://localhost:3000/api/logs/download", {
            headers: { Authorization: `Bearer ${token}` }
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "my_logs.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    useEffect(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                const res = await fetch("http://localhost:3000/api/logs/pre", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const json = await res.json();
                setLogs(json.logs || []);
            } catch (err) {
                console.error("Error fetching logs:", err);
                setLogs([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <Text>Loading...</Text>;

    const scatterData = logs.map((log, index) => ({
        x: log.logX,
        y: log.logY,
        label: `W:${log.logY} S:${log.logX}`,
        time: new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    const generateGridLines = () => {
        const horizontalLines = [];
        const verticalLines = [];
        
        for (let i = 1; i <= 9; i++) {
            horizontalLines.push(
                <VictoryLine
                    key={`h-${i}`}
                    style={{
                        data: { stroke: "#E0E0E0", strokeWidth: 1 }
                    }}
                    data={[
                        { x: 0, y: i },
                        { x: 10, y: i }
                    ]}
                />
            );
        }
        
        for (let i = 1; i <= 9; i++) {
            verticalLines.push(
                <VictoryLine
                    key={`v-${i}`}
                    style={{
                        data: { stroke: "#E0E0E0", strokeWidth: 1 }
                    }}
                    data={[
                        { x: i, y: 0 },
                        { x: i, y: 10 }
                    ]}
                />
            );
        }
        
        return [...horizontalLines, ...verticalLines];
    };

    const verticalLine = [
        { x: MIDDLE_POINT, y: 0 },
        { x: MIDDLE_POINT, y: 10 }
    ];

    const horizontalLine = [
        { x: 0, y: MIDDLE_POINT },
        { x: 10, y: MIDDLE_POINT }
    ];

    return (
        <View style={[styles.mainView, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text variant="headlineMedium" style={styles.headline}>Baseline Assessment Results</Text>
                <Text variant="bodyMedium" style={styles.subTitle}>
                    Your starting point visualization, based on your self-reported Well-being and Stress Levels (1-10 scale).
                </Text>

                {/* QUADRANT CHART SURFACE */}
                <Surface style={styles.chartSurface} elevation={2}>
                    <Text variant="titleMedium" style={styles.chartTitle}>Well-being vs. Stress Matrix</Text>

                    <View style={styles.chartContainer}>
                        <VictoryChart
                            width={CHART_WIDTH}
                            height={CHART_HEIGHT}
                            domain={{ x: [0, 10], y: [0, 10] }}
                            padding={{ left: 60, right: 40, top: 30, bottom: 60 }} // Increased left padding for y-axis label
                        >
                            {/* Grid Lines */}
                            {generateGridLines()}
                            
                            {/* Quadrant Lines */}
                            <VictoryLine
                                data={verticalLine}
                                style={{
                                    data: { 
                                        stroke: theme.colors.onSurface, 
                                        strokeWidth: 2,
                                        strokeDasharray: "5,5"
                                    }
                                }}
                            />
                            <VictoryLine
                                data={horizontalLine}
                                style={{
                                    data: { 
                                        stroke: theme.colors.onSurface, 
                                        strokeWidth: 2,
                                        strokeDasharray: "5,5"
                                    }
                                }}
                            />
                            
                            {/* Scatter Points */}
                            <VictoryScatter
                                data={scatterData}
                                size={6}
                                style={{
                                    data: {
                                        fill: 'purple',
                                        stroke: 'white',
                                        strokeWidth: 2
                                    }
                                }}
                                labels={({ datum }) => datum.label}
                                labelComponent={
                                    <VictoryLabel
                                        dy={-15}
                                        style={[{ fontSize: 10, fill: theme.colors.onSurface }]}
                                        backgroundStyle={[{ fill: 'white', opacity: 0.8 }]}
                                        backgroundPadding={[{ left: 5, right: 5, top: 2, bottom: 2 }]}
                                    />
                                }
                            />
                            
                            {/* X-Axis - Stress Level */}
                            <VictoryAxis
                                label="Stress Level (1-10)"
                                axisLabelComponent={
                                    <VictoryLabel 
                                        dy={15} 
                                        style={{ 
                                            fontSize: 12, 
                                            fontWeight: 'bold',
                                            fill: theme.colors.onSurface 
                                        }}
                                    />
                                }
                                tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                style={{
                                    axis: { stroke: theme.colors.onSurface, strokeWidth: 1 },
                                    tickLabels: { 
                                        fontSize: 10, 
                                        padding: 5,
                                        fill: theme.colors.onSurface,
                                        fontWeight: 'bold'
                                    },
                                }}
                            />
                            
                            {/* Y-Axis - Well-being Score */}
                            <VictoryAxis
                                dependentAxis
                                tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                style={{
                                    axis: { stroke: theme.colors.onSurface, strokeWidth: 1 },
                                    tickLabels: { 
                                        fontSize: 10, 
                                        padding: 5,
                                        fill: theme.colors.onSurface,
                                        fontWeight: 'bold'
                                    },
                                }}
                            />
                        </VictoryChart>

                        {/* Custom Y-Axis Label positioned to the left */}
                        <Text 
                            variant="labelLarge" 
                            style={[
                                styles.yAxisLabel, 
                                { 
                                    color: theme.colors.onSurface,
                                    transform: [{ rotate: '-90deg' }]
                                }
                            ]}
                        >
                            Well-being Score (1-10)
                        </Text>
                    </View>
                </Surface>

            </ScrollView>
            <Text
                style={{
                    color: 'blue',
                    textDecorationLine: 'underline',
                    marginBottom: 15,
                    textAlign: 'center'
                }}
                onPress={downloadCSV}
            >
                Download My Pre-Intervention Data (CSV)
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    headline: {
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subTitle: {
        marginBottom: 20,
        textAlign: 'center',
        color: '#7F8C8D',
    },
    chartSurface: {
        width: '100%',
        maxWidth: 350,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    chartTitle: {
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    yAxisLabel: {
        position: 'absolute',
        left: -80, // Position to the left of the chart
        top: '50%', // Center vertically
        fontWeight: 'bold',
        fontSize: 12,
        width: 120,
        textAlign: 'center',
    },
    interpretationSurface: {
        width: '100%',
        padding: 15,
        borderRadius: 12,
        marginTop: 10,
    },
    quadrantRow: {
        marginBottom: 8,
    },
    quadrantChip: {
        borderRadius: 8,
    },
    chipText: {
        fontWeight: 'bold',
    },
});

export default PreInterventionResults;