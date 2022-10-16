import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function Waveform() {
    const [heights, setHeights] = useState([])
    const [waveform, setWaveform] = useState(false)

    useEffect(() => {
        let arr = heights;
        for (let i = 0; i < 30; i++) {
            arr[i] = Math.floor(Math.random() * (40 - 3) + 3)
        }
        setHeights(arr);
    }, [])

    useEffect(() => {
        setWaveform(true)
    }, [heights])

    const renderWaveForm = () => {
        return heights.map((height, index) => {
            return (
                <View key={index} style={{ width: 3, height: height, backgroundColor: 'lightgrey', marginRight: 2, borderRadius: 5 }}></View>
            );
        })
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {waveform && renderWaveForm()}
        </View>
    );
}