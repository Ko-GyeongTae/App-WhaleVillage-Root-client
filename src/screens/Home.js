import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DecoButton from "../components/DecoButton.js";

export default ({ navigation }) => (
  
    <View style={Style.Container}>
        <Text style={FontStyle.Title}>이미지</Text>
      <View style={Style.ButtonArea}>
        <DecoButton
          text={"공지 설정"}
          onPress={() => navigation.navigate("NoticeSetting")}
        />
        <DecoButton
          text={"공지 수정"}
          onPress={() => navigation.navigate("EditPost")}
        />
        <DecoButton
          text={"공지 작성"}
          onPress={() => navigation.navigate("WritePost")}
        />
        <DecoButton
          text={"유튜브링크 설정"}
          onPress={() => navigation.navigate("SetYoutubeLink")}
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
    },
    Grid: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      alignItems: 'stretch',
      justifyContent: 'center',
    }
});

const FontStyle = StyleSheet.create({
    Title: {
        paddingTop: 50,
        fontSize: 60,
        color: 'white',
    }
})