import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function App() {
    const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        Gyroscope.setUpdateInterval(100);
        const subscription = Gyroscope.addListener(setData);
        return () => subscription.remove();
    }, []);

    return (
        <View>
            <Text>x: {x.toFixed(2)}</Text>
            <Text>y: {y.toFixed(2)}</Text>
            <Text>z: {z.toFixed(2)}</Text>
        </View>
    );
}
