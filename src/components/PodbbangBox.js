import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { baseUri } from "../../env";

const Component = StyleSheet.create({
  Component: {
    flex: 1,
    width: 350,
    height: 80,
    marginTop: '3%',
    marginBottom: '3%',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  Header: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  Bottom: {
    alignItems: 'flex-end',
    paddingBottom: 5,
    paddingRight: 5,
  }
});

const FontStyle = StyleSheet.create({
  Title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default (props) => {
  console.log(props);
  const GetToken = async () => {
    const token = await AsyncStorage.getItem("jwt");
    return token;
  };

  const setPrimary = async () => {
    const token = await GetToken();
    console.log(props.uid);
    const config = {
      headers: { authentication: token },
    };

    await axios
      .post(`${baseUri.outter_net}/api/v1/primarylink/${props.type}`, {
        uid: props.uid
      }, config)
      .then(function (response) {
        Alert.alert("대표게시물로 등록되었습니다.");
      })
      .catch(function (error) {
        console.log(error.response);
        Alert.alert("게시물을 등록할 수 없습니다.");
      });
  };

  const confirmAlert = () => {
    Alert.alert(
      "대표게시물로 등록하시겠습니까?",
      "",
      [
        {
          text: "No",
          onPress: () => null,
        },
        {
          text: "Yes",
          onPress: () => setPrimary(),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <TouchableOpacity style={Component.Component} onPress={() => confirmAlert()}>
      <View style={Component.Header}>
        <Text style={FontStyle.Title}>{props.isPrimary ? `✅ ${props.title}` : props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
