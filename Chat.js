import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

export default function ChatScreen() {
  const flatListRef = useRef(null);
  const [input, setInput] = useState("");
  const [key, setKey] = useState(6);
  const [messages, setMessages] = useState([
    {
      key: 0,
      text: "Laboris ad ex duis amet ea. Non occaecat ea et deserunt tempor dolore.",
      sent: true,
    },
    {
      key: 1,
      text: "Anim Lorem ut do qui dolor ad pariatur ea pariatur id laborum in. Adipisicing ad officia consequat cupidatat id incididunt qui voluptate elit consectetur culpa elit reprehenderit.",
      sent: true,
    },
    {
      key: 2,
      text: "Incididunt elit Lorem mollit nostrud. Occaecat eiusmod cillum aliquip dolor enim reprehenderit qui veniam ex dolor. Proident consectetur id occaecat veniam consequat occaecat ipsum.",
      sent: false,
    },
    {
      key: 3,
      text: "Proident fugiat duis excepteur quis esse pariatur. Ea esse veniam adipisicing ex aliqua minim consequat ut irure. Aliqua ad laborum voluptate est qui ad anim Lorem veniam cillum nostrud. Eiusmod laboris minim excepteur reprehenderit officia eiusmod. Velit ullamco laboris elit cupidatat eu id cillum.",
      sent: true,
    },
    {
      key: 4,
      text: "Eiusmod laboris minim excepteur reprehenderit officia eiusmod. Velit ullamco laboris elit cupidatat eu id cillum.",
      sent: false,
    },
    {
      key: 5,
      text: "Eiusmod laboris minim excepteur reprehenderit officia eiusmod. Velit ullamco laboris elit cupidatat eu id cillum.",
      sent: true,
    },
  ]);

  function handleChangeText(text) {
    setInput(text);
  }

  function handleSend() {
    let message = {
      key: key,
      text: input,
      sent: true,
    };
    let newArray = messages;
    newArray.push(message);
    setMessages(newArray);
    setInput("");
    flatListRef.current.scrollToIndex({ index: key });
    setKey((prev) => ++prev);
  }

  function scrollToIndexFailed(error) {
    const offset = error.averageItemLength * error.index;
    flatListRef.current.scrollToOffset({ offset });
  }

  return (
    <View style={{ backgroundColor: "#1429eb", flex: 1, paddingTop: 10 }}>
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
          initialScrollIndex={key - 1}
          ref={flatListRef}
          onScrollToIndexFailed={scrollToIndexFailed}
          renderItem={({ item }) => {
            return (
              <View
                style={[
                  { flex: 1 },
                  item.sent
                    ? { alignItems: "flex-end" }
                    : { alignItems: "flex-start" },
                ]}
              >
                <View
                  style={[
                    styles.messageView,
                    item.sent ? styles.sentView : styles.receivedView,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      item.sent ? styles.sentText : styles.receivedText,
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.key}
        />
      </View>
      <View style={{ backgroundColor: "#1429eb", padding: 10, flex: 0.1 }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 10,
          }}
        >
          <TextInput
            value={input}
            multiline={true}
            placeholder="Type Message"
            style={styles.inputField}
            onChangeText={(text) => handleChangeText(text)}
          />
          <TouchableOpacity onPress={() => handleSend()}>
            <Image
              source={require("./assets/send-icon.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    padding: 10,
  },
  messageView: {
    backgroundColor: "#1429eb",
    marginBottom: 20,
    borderRadius: 5,
    padding: 5,
    width: "80%",
  },
  messageText: {
    color: "white",
  },
  sentText: {
    color: "white",
  },
  sentView: {
    backgroundColor: "#1429eb",
  },
  receivedText: {
    color: "grey",
  },
  receivedView: {
    backgroundColor: "white",
  },
  inputField: {
    color: "grey",
    padding: 5,
    backgroundColor: "white",
    width: "86%",
    borderRadius: 10,
  },
});
