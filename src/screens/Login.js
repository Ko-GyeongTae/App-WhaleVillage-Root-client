import React from 'react';
import { StyleSheet, Text, View } from "react-native";

export default () => {

    return (
        <View style={Style.Container}>
            <Text>Login</Text>
            <View style={Style.LoginArea}>

            </View>
        </View>
    );
}

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    LoginArea: {
        width: 300,
        height: 180,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center'
    }
})