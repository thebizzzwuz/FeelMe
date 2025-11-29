import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;
const MOCK_USER_ID = "MOCK_USER_ID_12345";

interface Rating {
    type: 'pre-intervention' | 'post-intervention';
    stress: number;
    wellBeing: number;
    timestamp: string;
}

const fetchMockData = async (userId: string): Promise<Rating[]> => {
    await new Promise(resolve => setTimeout(resolve, 800)); 

    return [
        { type: 'pre-intervention', stress: 8, wellBeing: 3, timestamp: '2025-10-26T10:00:00Z' },
        { type: 'post-intervention', stress: 3, wellBeing: 8, timestamp: '2025-10-26T11:00:00Z' },
    ];
};

const PostResultsScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    
    const [data, setData] = useState<Rating[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedData = await fetchMockData(MOCK_USER_ID);
                setData(fetchedData);
            } catch (e) {
                setError("Failed to load data. Please check connection.");
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    if (isLoading) {
        return (
            <View style={[styles.centerView, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>
                <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
                <Text variant="titleMedium" style={{ marginTop: 20 }}>Loading results...</Text>
            </View>
        );
    }

    if (error) {
         return (
            <View style={[styles.centerView, { paddingTop: insets.top, backgroundColor: theme.colors.error }]}>
                <MaterialCommunityIcons name="alert-circle" size={48} color={theme.colors.onPrimaryContainer} />
                <Text variant="titleMedium" style={{ marginTop: 20, color: theme.colors.onPrimaryContainer }}>{error}</Text>
            </View>
        );
    }
    
    const preRating = data.find(d => d.type === 'pre-intervention');
    const postRating = data.find(d => d.type === 'post-intervention');
    
    const hasData = preRating && postRating;

    const preStress = preRating?.stress || 5;
    const postStress = postRating?.stress || 5;
    const preWellBeing = preRating?.wellBeing || 5;
    const postWellBeing = postRating?.wellBeing || 5;
    
    let scatterData = [
        { 
            value: 5.5, 
            dataPointText: 'Median (5.5, 5.5)',
            dataPointLabelShiftY: 20,
            dataPointColor: '#000000', 
            dataPointRadius: 10, 
            label: '5.5', 
        }, 
    ];

    if (hasData) {
        scatterData.push(
            { 
                value: preWellBeing, 
                dataPointText: `Pre: S=${preStress}, WB=${preWellBeing}`,
                dataPointLabelShiftY: -10, 
                dataPointLabelShiftX: -10,
                labelTextStyle: { color: theme.colors.text },
                dataPointColor: theme.colors.error, 
                dataPointRadius: 8,
                label: preStress.toString(), 
            },
            { 
                value: postWellBeing, 
                dataPointText: `Post: S=${postStress}, WB=${postWellBeing}`,
                dataPointLabelShiftY: 10,
                dataPointLabelShiftX: 10,
                labelTextStyle: { color: theme.colors.text },
                dataPointColor: theme.colors.success, 
                dataPointRadius: 8,
                label: postStress.toString(), 
            },
        );
    }

    const stressChange = preStress - postStress; 
    const wellBeingChange = postWellBeing - preWellBeing; 
    
    const SummaryCard = ({ title, value, unit, icon, color }: { title: string, value: number, unit: string, icon: string, color: string }) => (
        <View style={[styles.summaryCard, { borderColor: color, backgroundColor: theme.colors.surface }]}>
            <MaterialCommunityIcons name={icon} size={32} color={color} />
            <Text variant="titleLarge" style={[styles.summaryValue, { color }]}>{Math.abs(value)} {unit}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.text }}>{title}</Text>
        </View>
    );

    return (
        <View style={[styles.mainView, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <MaterialCommunityIcons 
                    name="chart-scatter-plot-hexbin" 
                    size={48} 
                    color={theme.colors.primary} 
                    style={{ marginBottom: 20 }}
                />

                <Text variant="headlineMedium" style={styles.headline}>
                    Intervention Results: The 4 Quadrant View
                </Text>
                
                <Text variant="bodyLarge" style={styles.subTitle}>
                    The plot maps Stress (X-axis) against Well-being (Y-axis). The large black dot marks the Median (5.5).
                </Text>

                {hasData && (
                    <View style={styles.summaryContainer}>
                        <SummaryCard 
                            title="Stress Reduction" 
                            value={stressChange} 
                            unit="points" 
                            icon={stressChange > 0 ? "arrow-down-bold-circle" : "arrow-up-bold-circle"}
                            color={stressChange > 0 ? theme.colors.success : theme.colors.error}
                        />
                        <SummaryCard 
                            title="Well-being Gain" 
                            value={wellBeingChange} 
                            unit="points" 
                            icon={wellBeingChange > 0 ? "arrow-up-bold-circle" : "arrow-down-bold-circle"}
                            color={wellBeingChange > 0 ? theme.colors.primary : theme.colors.error}
                        />
                    </View>
                )}

                <Text variant="titleMedium" style={styles.chartTitle}>Stress (X) vs. Well-being (Y)</Text>
                <View style={styles.chartWrapper}>
                    <LineChart 
                        data={scatterData}
                        width={screenWidth - 80}
                        height={300}
                        maxValue={10}
                        initialSpacing={30}
                        endSpacing={30}
                        animationDuration={1500}
                        
                        // Pure Scatter Plot Configuration 
                        strokeWidth={0} 
                        hideDataPoints={false} 
                        
                        // X-Axis (Stress: 1 to 10)
                        xAxisLabelTextStyle={{ color: theme.colors.text, fontSize: 10 }}
                        xAxisThickness={2}
                        xAxisColor={theme.colors.text}
                        xAxisLabelPrefix="Stress "
                        
                        // Y-Axis (Well-being: 1 to 10)
                        yAxisColor={theme.colors.text}
                        yAxisThickness={2}
                        yAxisLabelPrefix="Well-being "
                        yAxisTextStyle={{ color: theme.colors.text, fontSize: 10 }}
                        
                        // Vertical Median Line (Stress = 5.5)
                        verticalLines={[
                            { value: 5.5, color: '#000000', strokeDashArray: [5, 5], thickness: 3, zIndex: 1 }, // Thick, black line
                        ]}
                        // Horizontal Median Line (Well-being = 5.5)
                        yAxisExtraData={[
                            { value: 5.5, color: '#000000', strokeDashArray: [5, 5], thickness: 3, zIndex: 1 }, // Thick, black line
                        ]}

                        // Background and grid styling
                        backgroundColor={theme.colors.surface}
                        rulesColor={theme.colors.surfaceVariant}
                        showRules
                        rulesType='solid'
                        hideOrigin
                        
                        pointerConfig={{
                            pointerStripUptoDataPoint: true,
                            pointerVLineColor: 'lightgray',
                            pointerVLineStrokeDashArray: [2, 5],
                            pointerVLineThickness: 2,
                            pointerLabelComponent: items => (
                                <View style={styles.labelTooltip}>
                                    <Text variant="labelSmall" style={{ color: theme.colors.onPrimary }}>
                                        {items[0].dataPointText}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                </View>

                <View style={styles.quadrantLegend}>
                    <Text style={[styles.quadrantText, {color: theme.colors.success}]}><Text style={{ fontWeight: 'bold' }}>Top-Left (Optimal):</Text> Low Stress, High Well-being (Target Zone)</Text>
                    <Text style={[styles.quadrantText, {color: theme.colors.error}]}><Text style={{ fontWeight: 'bold' }}>Bottom-Right (Burnout):</Text> High Stress, Low Well-being (Danger Zone)</Text>
                    <Text style={styles.quadrantText}><Text style={{ fontWeight: 'bold' }}>Top-Right (Excited/Manic):</Text> High Stress, High Well-being</Text>
                    <Text style={styles.quadrantText}><Text style={{ fontWeight: 'bold' }}>Bottom-Left (Lethargic):</Text> Low Stress, Low Well-being</Text>
                </View>

                {!hasData && (
                     <Text variant="bodyLarge" style={{ marginTop: 20, textAlign: 'center', color: theme.colors.warning }}>
                        No score data shown. Please complete both Pre and Post ratings.
                    </Text>
                )}


                <Text variant="labelSmall" style={styles.userIdText}>
                    Simulated User ID: {MOCK_USER_ID}
                </Text>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: { flex: 1, },
    centerView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scrollContainer: { flexGrow: 1, padding: 20, alignItems: 'center' },
    headline: { marginTop: 10, marginBottom: 5, textAlign: 'center', fontWeight: 'bold', color: '#2C3E50' },
    subTitle: { marginBottom: 30, textAlign: 'center', color: '#7F8C8D', paddingHorizontal: 10 },
    
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    summaryCard: {
        width: '48%',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    summaryValue: {
        marginTop: 5,
        fontWeight: 'bold',
    },

    chartTitle: { 
        marginTop: 20, 
        marginBottom: 10, 
        textAlign: 'center', 
        fontWeight: '600', 
        color: '#34495E' 
    },
    chartWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
        padding: 10,
        alignItems: 'center',
    },
    labelTooltip: {
        backgroundColor: '#333',
        padding: 8,
        borderRadius: 4,
    },
    quadrantLegend: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    quadrantText: {
        fontSize: 12,
        lineHeight: 20,
        color: '#5D6D7E'
    },
    userIdText: { marginTop: 15, color: '#95A5A6', textAlign: 'center' }
});

export default PostResultsScreen;