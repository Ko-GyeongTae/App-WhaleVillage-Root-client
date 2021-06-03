import React from "react";
import { Alert, Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import InputBox from "../components/InputBox";
import useInput from "../hooks/useInput";
import { useLogIn } from "../../AuthContext";
import axios from "axios";
import { baseUri } from "../../env";

export default () => {
    const idInput = useInput("");
    const pwInput = useInput("");
    const logIn = useLogIn();

    const Login = async () => {
        const { value: id } = idInput;
        const { value: password } = pwInput;
        console.log(id, password);
        await axios
            .post(`${baseUri.outter_net}/api/v1/admin/login`, {
                id: id,
                password: password
            })
            .then(response => {
                const res_obj = JSON.stringify(response.data);
                const Obj = JSON.parse(res_obj);
                console.log(res_obj);
                const token = Obj["accessToken"];
                logIn(token);
            })
            .catch(error => {
                console.log(baseUri.outter_net);
                Alert.alert('회원정보가 없거나 잘못되었습니다.');
                console.log(error);
            });
    }
    const HeaderImg = require('../../assets/whalevillage/admin/LoginHeader.png');
    return (
        <View style={Style.Container}>

            <Image style={Style.Image} source={HeaderImg}/>
            <View style={Style.Input}>
                <InputBox
                    {...idInput}
                    placeholder="Id"
                    secureTextEntry={false}
                    keyboardType="default"
                    autoCorrect={false}
                />
                <InputBox
                    {...pwInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    keyboardType="visible-password"
                    autoCorrect={false}
                />
            </View>
            <TouchableOpacity onPress={() => Login()}>
                <Text style={FontStyle.Button}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const FontStyle = StyleSheet.create({
    Button: {
        fontSize: 20,
        marginTop: 10,
    },
    Title: {
        fontSize: 60,
    }
})

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    Input: {
        marginTop: '10%',
        width: '80%',
        height: '20%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    Image: {
        width: 230,
        height: 180,
        marginTop: 100,
    }
})
