import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Pressable
} from "react-native";
import { Audio } from 'expo-av';
import Waveform from "./Waveform";

export default function VoiceScreen() {
  const [recording, setRecording] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let obj = {
      sound: '',
      milliseconds: '',
      duration: '1:20',
      file: '',
      play: false,
      sent: false
    }
    setMessages(prev => [...prev, obj])
  }, [])

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });

        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);

        setRecording(recording);
      } else {
        Alert.alert("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let newMessages = [...messages];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    newMessages.push({
      sound: sound,
      milliseconds: status.durationMillis,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
      play: false,
      sent: true
    });

    setMessages(newMessages);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function playAudio(item, index) {
    changeArray(item, index);
    if (item.play)
      item.sound.replayAsync();
    else {
      item.sound.pauseAsync();
      return
    }
    setTimeout(() => {
      if (item.play) changeArray(item, index);
    }, item.milliseconds)
  }

  function changeArray(item, index) {
    let newArray = messages;
    newArray[index].play = !newArray[index].play;
    setMessages([...newArray]);
  }

  return (
    <View style={{ backgroundColor: "#1429eb", flex: 1 }}>
      <View
        style={{ flex: 0.1, paddingHorizontal: 20, justifyContent: "center" }}
      >
        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
          John Smith
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#fafbfa",
          padding: 10,
          borderTopRadius: 5,
          flex: 0.8,
        }}
      >
        <Text
          style={{ color: "lightgrey", textAlign: "center", marginBottom: 10 }}
        >
          Today
        </Text>
        <FlatList
          style={styles.flatList}
          data={messages}
          extraData={messages}
          renderItem={({ item, index }) => {
            return (
              <View style={{ alignItems: item.sent ? 'flex-end' : 'flex-start', marginBottom: 5 }}>
                <View style={{ width: 220, backgroundColor: item.sent ? "#1429eb" : "#f1f4f2", borderRadius: 10, alignItems: 'center', padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => playAudio(item, index)}>
                      <Image source={item.play ? require('./assets/pause.png') : require('./assets/play.png')} style={{ width: 35, height: 35, marginBottom: 2 }} />
                    </TouchableOpacity>
                    <Text style={{ color: item.sent ? 'lightgrey' : 'grey', fontWeight: 'bold', fontSize: 12 }}>{item.duration}</Text>
                  </View>
                  <View>
                    <Waveform />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={{ backgroundColor: "#1429eb", padding: 10, flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: "#e1bc1e",
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 50,
            opacity: pressed ? 0.7 : 1
          })}
          onPressIn={startRecording}
          onPressOut={stopRecording}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', fontSize: 20 }}>Push to Talk</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    padding: 10,
  },
});
