import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { useState } from 'react';
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
  Day: {
    fontSize: 15,
    color: 'black',
  }
});

export default (props) => {
  console.log(props);
  const [noticeList, setNoticeList] = useState([]);
  const date = new Date(props.date);
  const GetToken = async () => {
    const token = await AsyncStorage.getItem("jwt");
    return token;
  };
  const GetList = async () => {
    await axios.get(`${baseUri.outter_net}/api/v1/post`)
      .then(res => {
        console.log(res.data);
        setNoticeList(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  }
  const PostDelete = async () => {
    const token = await GetToken();

    const config = {
      headers: { authentication: token },
    };

    await axios
      .delete(`${baseUri.outter_net}/api/v1/post/${props.uid}`, config)
      .then(function (response) {
        console.log(response);
        GetList();
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert("게시물을 삭제할 수 없습니다.");
      });
  };

  const confirmAlert = () => {
    Alert.alert(
      "삭제하시겠습니까?",
      "",
      [
        {
          text: "No",
          onPress: () => null,
        },
        {
          text: "Yes",
          onPress: () => PostDelete(),
        },
      ],
      { cancelable: false }
    );
  };

  const PostUpdate = async() => {
    const token = await GetToken();

    const config = {
      headers: { authentication: token },
    };

    await axios
      .put(`${baseUri.outter_net}/api/v1/post/${props.uid}`, config)
      .then(res => {
        console.log(res);
        GetList();
      })
      .catch(e => {
        console.log(e);
        Alert.alert("게시물을 수정할 수 없습니다.");
      });
  }

  const onPressFunc = (type) => {
    if(type === "delete"){
      confirmAlert();
    }
    if(type === "update"){
      PostUpdate();
    }
  }

  return (
    <TouchableOpacity style={Component.Component} onPress={() => onPressFunc(props.type)}>
      <View style={Component.Header}>
        <Text style={FontStyle.Title}>{props.title}</Text>
      </View>
      <View style={Component.Bottom}>
        <Text style={FontStyle.Day}>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}일 ${date.getHours() > 12 ? `오후 ${date.getHours() - 12}` : `오전 ${date.getHours()}`}시 ${date.getMinutes()}분 ${date.getSeconds()}초`}</Text>
      </View>
    </TouchableOpacity>
  );
};
