import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Barometer } from 'expo-sensors';

export default function App() {
    const [{ pressure, relativeAltitude }, setData] = useState({
        pressure: 0,
        relativeAltitude: 0,
    });

    useEffect(() => {
        const subscription = Barometer.addListener(setData);
        return () => subscription.remove();
    }, []);

    return (
        <View>
            <Text>Pressure: {pressure.toFixed(2)} hPa</Text>
            <Text>Relative Altitude: {relativeAltitude?.toFixed(2) || "N/A"} m</Text>
        </View>
    );
}
