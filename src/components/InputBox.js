import React from "react";
import { StyleSheet, View } from "react-native";


const Style = StyleSheet.create({
    Component: {
        width: '100%',
        height: 50,
        padding: 10,
        fontSize: (props) => props.fontSize,
        fontWeight: 100,
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
    }
})

const AuthInput = ({
    secureTextEntry,
    placeholder,
    value,
    keyboardType = "default",
    autoCapitalize = "none",
    returnKeyType = "done",
    fontSize = "20px",
    onChangeText,
    onChange,
    onSubmitEditing = () => null,
    autoCorrect = true,
}) => (
    <View
        style={Style.Component}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onChange={onChange}
        keyboardType={keyboardType}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={autoCorrect}
        value={value}
    />
);

export default AuthInput;
