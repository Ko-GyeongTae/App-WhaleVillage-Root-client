import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import PropTypes from "prop-types";

const Style = StyleSheet.create({
    Component: {
        width: '94%',
        height: 50,
        fontSize: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        elevation: 5,
        marginBottom: 10
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
    <TextInput
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

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool.isRequired,
    keyboardType: PropTypes.oneOf([
        "default",
        "number-pad",
        "decimal-pad",
        "numeric",
        "email-address",
        "phone-pad",
        "visible-password"
    ]),
    autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
    onChangeText: PropTypes.func,
    onChange: PropTypes.func,
    returnKeyType: PropTypes.oneOf(["done", "go", "next", "sear", "send"]),
    onSubmitEditing: PropTypes.func,
    autoCorrect: PropTypes.bool,
};


export default AuthInput;
