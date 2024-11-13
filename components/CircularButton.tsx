import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Direction = 'Top' | 'Left' | 'Right' | 'Bottom';

interface CircularButtonProps {
    onDirectionPress: (direction: Direction) => void;
}

const CircularButton: React.FC<CircularButtonProps> = ({ onDirectionPress }) => {
    return (
        <View style={styles.circle}>

            {/* Cross Lines */}
            <View style={styles.crossDiagonalLeft} />
            <View style={styles.crossDiagonalRight} />

            {/* Top Section */}
            <TouchableOpacity style={[styles.section, styles.topSection]} onPress={() => onDirectionPress('Top')}>
                <Text style={styles.text}>Top</Text>
            </TouchableOpacity>

            {/* Bottom Section */}
            <TouchableOpacity style={[styles.section, styles.bottomSection]} onPress={() => onDirectionPress('Bottom')}>
                <Text style={styles.text}>Bottom</Text>
            </TouchableOpacity>

            {/* Left Section */}
            <TouchableOpacity style={[styles.section, styles.leftSection]} onPress={() => onDirectionPress('Left')}>
                <Text style={styles.text}>Left</Text>
            </TouchableOpacity>

            {/* Right Section */}
            <TouchableOpacity style={[styles.section, styles.rightSection]} onPress={() => onDirectionPress('Right')}>
                <Text style={styles.text}>Right</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#ddd',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    crossDiagonalLeft: {
        position: 'absolute',
        width: 2,
        height: '100%',
        backgroundColor: 'black',
        transform: [{ rotate: '45deg' }],
        left: '50%',
        top: '0%',
    },
    crossDiagonalRight: {
        position: 'absolute',
        width: 2,
        height: '100%',
        backgroundColor: 'black',
        transform: [{ rotate: '-45deg' }],
        left: '50%',
        top: '0%',
    },
    section: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topSection: {
        top: 0,
        left: '25%',
    },
    bottomSection: {
        bottom: 0,
        left: '25%',
    },
    leftSection: {
        top: '25%',
        left: -5,
    },
    rightSection: {
        top: '25%',
        right: -5,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default CircularButton;
