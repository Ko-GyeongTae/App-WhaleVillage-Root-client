import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import AuthInput from '../components/InputBox';
import useInput from '../hooks/useInput';

export default () => {
    const idInput = useInput("");
    const pwInput = useInput("");
    return (
        <View style={Style.Container}>
            <Text>Login</Text>
            <View style={Style.LoginArea}>
                <View style={Style.eachArea}>
                    <AuthInput 
                        {...idInput}
                        placeholder="id"
                    />
                </View>
                <View style={Style.eachArea}>
                    <AuthInput 
                        {...pwInput}
                        secureTextEntry={true}
                        placeholder="password"
                    />
                </View>
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
    },
    eachArea: {
        width:'100%',
        height:'30%',
        marginTop:5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red'
    }
})