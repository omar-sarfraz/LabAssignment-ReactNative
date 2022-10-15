import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Waveform() {
    const [heights, setHeights] = useState([])

    useEffect(() => {
        let arr = heights;
        for (let i = 0; i < 30; i++) {
            arr[i] = Math.floor(Math.random() * (40 - 1) + 1)
        }
        setHeights(arr);
    }, [])

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {heights.map((height, index) => {
                return (
                    <View key={index} style={{ width: 3, height: height, backgroundColor: 'lightgrey', marginRight: 2, borderRadius: 5 }}></View>
                );
            })}
        </View>
    );
}