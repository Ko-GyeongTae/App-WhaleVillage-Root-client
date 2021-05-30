import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DecoButton from "../components/DecoButton.js";

export default ({ navigation }) => (
  
    <View style={Style.Container}>
        <Text style={FontStyle.Title}>고래산마을</Text>
      <View style={Style.ButtonArea}>
        <DecoButton
          text={"공지 설정"}
          onPress={() => navigation.navigate("NoticeSetting")}
        />
        <DecoButton
          text={"링크 설정"}
          bgColor={"#ffffff"}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </View>
  
);

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        color: 'white',
        backgroundColor: '#204051',
    },
    ButtonArea: {
        alignItems: 'center',
        marginTop: '37.9%',
        width: '100%',
    }
});

const FontStyle = StyleSheet.create({
    Title: {
        paddingTop: 50,
        fontSize: 60,
        color: 'white',
    }
})