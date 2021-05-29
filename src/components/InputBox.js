import React from "react";
import { StyleSheet, View } from "react-native";


const Style = StyleSheet.create({
    Component: {
        width: '94%',
        height: 50,
        fontSize: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        elevation: 5
    }
})

const AuthInput = ({
    secureTextEntry,
    placeholder,
    value,
    keyboardType = "default",
    autoCapitalize = "none",
    returnKeyType = "done",
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
