import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';


const StartScreen = () => {

    const router = useRouter();

    const handleStartPress = () => {
        console.log('Start button pressed');
        router.push('/VisualAcuityTest');
    };

    const handleGridButtonPress = (index: number) => {
        console.log(`Grid button ${index + 1} pressed`);
    };

    const handleMenuPress = () => {
        console.log('Menu button pressed');
    };

    return (
        <View style={styles.container}>
            {/* Top Bar with Menu Button */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                    <Text style={styles.menuText}>☰</Text>
                </TouchableOpacity>
            </View>

            {/* Top Half with Start Button */}
            <View style={styles.topHalf}>
                <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
                    <Text style={styles.startText}>Start</Text>
                </TouchableOpacity>
            </View>

            {/* Separator Line */}
            <View style={styles.separator} />

            {/* Bottom Half with Grid Buttons */}
            <View style={styles.bottomHalf}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.gridButton}
                        onPress={() => handleGridButtonPress(index)}
                    >
                        <Text style={styles.gridButtonText}>{index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    topBar: {
        height: 50, // Height of the top bar
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF', // Bar color
        paddingHorizontal: 10,
    },
    menuButton: {
        width: 20,
        height: '50%', // Matches the height of the bar
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007AFF', // Same as the bar for seamless look
    },
    menuText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    topHalf: {
        flex: 1, // Occupies the top half of the screen
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 1, // Thickness of the line
        backgroundColor: '#cccccc', // Line color
        width: '100%', // Full width
    },
    bottomHalf: {
        flex: 1, // Occupies the bottom half of the screen
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    startButton: {
        width: Dimensions.get('window').width * 0.8, // 80% of screen width
        height: Dimensions.get('window').height * 0.2, // 20% of screen height
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 15,
    },
    startText: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
    },
    gridButton: {
        width: '25%', // Each grid button takes 25% of the width
        aspectRatio: 1, // Ensures the buttons are square
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    gridButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default StartScreen;