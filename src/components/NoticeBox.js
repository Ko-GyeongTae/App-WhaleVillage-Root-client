import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    Bottom:{
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
    Day:{
        fontSize: 15,
        color: 'black',
    }
});

export default (props) => {
  const date = new Date(props.date);
  return (
    <TouchableOpacity style={Component.Component} onPress={() => props.onPress()}>
      <View style={Component.Header}>
        <Text style={FontStyle.Title}>{props.title}</Text>
      </View>
      <View style={Component.Bottom}>
        <Text style={FontStyle.Day}>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}일 ${date.getHours() > 12 ? `오후 ${date.getHours() - 12}` : `오전 ${date.getHours()}`}시 ${date.getMinutes()}분 ${date.getSeconds()}초`}</Text>
      </View>
    </TouchableOpacity>
  );
};
