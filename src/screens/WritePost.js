import React, { useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useInput from "../hooks/useInput";
import contentInput from "../hooks/contentInput";

export default function UploadForm({ navigation }) {
    const titleInput = useInput();
    const _contentInput = contentInput();
    const UploadPost = async() => {
        const { value: title } = titleInput;
        const { value: content } = _contentInput;
        console.log(title);
        console.log(content);
    }
    const HeaderRight = () => (
        <TouchableOpacity onPress={() => UploadPost()}>
            <Text style={FontStyle.HeaderRightText}>Next</Text>
        </TouchableOpacity>
    );
    useEffect(() => {
        navigation.setOptions({
            headerRight: HeaderRight,
        })
    }, [])
    return (
        <View style={Style.Container}>
            <View style={Style.Header}>
                <TextInput 
                    {...titleInput}
                    style={Style.Input}
                    placeholder={'제목'}
                    onEndEditing={() => console.log("onEndEditing")}
                    onSubmitEditing={() => console.log("onSubmitEditing")}
                    returnKeyType="next"
                />
            </View>
            <View style={Style.Body}>
                <TextInput 
                    {..._contentInput}
                    style={Style.Content}
                    placeholder={'내용'}
                    onEndEditing={() => console.log("onEndEditing")}
                    onSubmitEditing={() => console.log("onSubmitEditing")}
                    returnKeyType="next"
                    multiline ={true}
                />
            </View>
            <View style={Style.Bottom}>
                <TouchableOpacity onPress={() => navigation.navigate("UploadImage")}>
                    <Text>UploadImage</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    Header: {
        width: '100%',
        height: 80,
        marginTop: 0,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Body: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
    },
    Bottom: {
        width: '100%',
        height: 300,
        marginBottom: 0,
        backgroundColor: 'pink',
    },
    Input: {
        width: 360,
        height: 40,
        backgroundColor: '#f5f5f5',
        paddingLeft: 10,
    },
    Content:{
        width: 360,
        height: 340,
        backgroundColor: '#f5f5f5',
        paddingLeft: 10,
        textAlignVertical: 'top',
    },
    Photo: {
        width: '100%',
        height: 50,
    },
    HeaderRightText: {
        color: 'blue',
        fontSize: 16,
        marginRight: 7,
    }
})

const FontStyle = StyleSheet.create({
    HeaderRightText: {
        color: 'blue',
        fontSize: 16,
        marginRight: 7,
    }
})
