import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Audio } from 'expo-av';

export default function App() {
    const [shakeDetected, setShakeDetected] = useState(false);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        async function loadSound() {
            const { sound } = await Audio.Sound.createAsync(
                require('./788090__hand-drum.wav') // Adjust path if needed
            );
            setSound(sound);
        }
        loadSound();

        Accelerometer.setUpdateInterval(100);
        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            if (Math.sqrt(x * x + y * y + z * z) > 1.5) {
                setShakeDetected(true);
                playSound();
            } else {
                setShakeDetected(false);
            }
        });

        return () => {
            subscription.remove();
            if (sound) sound.unloadAsync();
        };
    }, []);

    async function playSound() {
        if (sound) await sound.replayAsync();
    }

    return <View>{shakeDetected && <Text>SHAKE</Text>}</View>;
}
