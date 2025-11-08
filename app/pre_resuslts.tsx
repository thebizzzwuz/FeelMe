import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, useTheme, Chip } from 'react-native-paper'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

// created the x and y chart using cobination of two line charts
import { LineChart } from "react-native-gifted-charts"; 

// simmulated datapoints -- real will come from mongoDB

const MOCKED_BASELINE_DATA = [
    { wellBeing: 8.0, stressLevel: 3.0, label: 'Entry 1' }, // Ideal Zone
    { wellBeing: 7.5, stressLevel: 7.5, label: 'Entry 2' }, // Paradoxical Zone (High Risk)
    { wellBeing: 4.0, stressLevel: 8.5, label: 'Entry 3' }, // Burnout Zone
    { wellBeing: 3.5, stressLevel: 2.0, label: 'Entry 4' }, // Slump Zone
    { wellBeing: 5.0, stressLevel: 5.0, label: 'Entry 5' }, // Center Point
];

// centerpoints for line charts --> use later to make 4 quadrants
const MIDDLE_POINT = 5; 

// gifted charts layout -- DO NOT CHANGE
const scatterData = MOCKED_BASELINE_DATA.map((item, index) => ({
    value: item.wellBeing, // Y-axis
    dataPointText: `W: ${item.wellBeing.toFixed(1)}\nS: ${item.stressLevel.toFixed(1)}`,
    dataPointLabel: item.label,
    dataPointLabelShiftY: -20,
    dataPointLabelShiftX: 10,
    dataPointRadius: 8,
    customDataPoint: () => (
        // data point 'dot' style 
        <View style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: 'purple',
            borderWidth: 2,
            borderColor: 'white',
        }} />
    ),
 
    x: item.stressLevel, 
    y: item.wellBeing,
}));


const PreInterventionResults: React.FC = () => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();

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
                    
                    <LineChart 
                        data={scatterData}
                        // General Chart Setup
                        areaChart
                        hideRules
                        hideAxes
                        noOfSections={10} // Makes the grid have 10 steps
                        yAxisMax={10}
                        xAxisMax={10}
                        showYAxisIndices
                        showXAxisIndices
                        
                        // Scatter Plot Styling
                        isAnimated
                        thickness={0} // Hide the main line to make it a scatter plot
                        startFillColor="transparent"
                        endFillColor="transparent"
                        startOpacity={0}
                        endOpacity={0}

                        // Grid and Quadrant Lines
                        showVerticalLines 
                        showHorizontalLines
                        verticalLinesColor="#E0E0E0"
                        horizontalLinesColor="#E0E0E0"
                        
                        // Custom Mid-lines for Quadrants (Value 5 is the midpoint)
                        // Vertical Line (Separating Low Stress < 5 from High Stress > 5)
                        rulesThickness={2}
                        rulesColor={theme.colors.onSurfaceVariant}
                        // Horizontal Line (Separating Low Well-being < 5 from High Well-being > 5)
                        horizontalLine
                        horizontalLineData={{ value: MIDDLE_POINT, color: theme.colors.onSurface, thickness: 2, dashed: true }}
                        
                        // Vertical Mid Line is trickier in LineChart, we use the verticalLinesAt property
                        verticalLinesAt={[MIDDLE_POINT]}
                        verticalLinesThickness={2}
                        verticalLinesColor={theme.colors.onSurface}
                        verticalLinesDashed
                        
                        // Axis Labels
                        yAxisLabelTexts={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                        xAxisLabelTexts={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}

                        // axis positions need to be changed a litter better in sprint 3

                        // Data Points and Text
                        showDataPoint
                        dataPointsShape="circle"
                        dataPointColor="purple"
                        showDataPointLabel
                    />
                    
                    <Text variant="labelMedium" style={styles.xAxisLabel}>X-Axis: Stress Level (1 - 10)</Text>
                    <Text variant="labelMedium" style={styles.yAxisLabel}>Y-Axis: Well-being Score (1 - 10)</Text>
                </Surface>


                {/* rough quardrant simulation */}
                <Text variant="titleMedium" style={[styles.chartTitle, {marginTop: 20}]}>Matrix Interpretation</Text>
                <Surface style={styles.interpretationSurface} elevation={1}>
                    <View style={styles.quadrantRow}>
                        <Chip icon="check-decagram" style={[styles.quadrantChip, {backgroundColor: '#d0f0c0'}]} textStyle={styles.chipText}>
                            High Well-being / Low Stress: Ideal Zone
                        </Chip>
                    </View>
                    <View style={styles.quadrantRow}>
                         <Chip icon="alert-octagon" style={[styles.quadrantChip, {backgroundColor: '#ffdbd8'}]} textStyle={styles.chipText}>
                            Low Well-being / High Stress: Burnout Zone
                        </Chip>
                    </View>
                    <View style={styles.quadrantRow}>
                        <Chip icon="lightning-bolt" style={[styles.quadrantChip, {backgroundColor: '#fffad4'}]} textStyle={styles.chipText}>
                            High Well-being / High Stress: High-Risk Paradox
                        </Chip>
                    </View>
                </Surface>
                
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
        padding: 20,
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
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    chartTitle: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    xAxisLabel: {
        marginTop: 5,
        alignSelf: 'flex-end',
        color: '#7F8C8D',
    },
    yAxisLabel: {
        position: 'absolute',
        left: 5,
        top: 250,
        transform: [{ rotate: '-90deg'}],
        color: '#7F8C8D',
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
    }
});

export default PreInterventionResults;