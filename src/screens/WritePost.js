import React, { useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Keyboard, Image, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useInput from "../hooks/useInput";
import contentInput from "../hooks/contentInput";
import { useState } from "react";
import axios from "axios";
import { baseUri } from "../../env";

export default function UploadForm({ navigation, route }) {
    const param = route.params;
    const titleInput = useInput("");
    const _contentInput = contentInput("");
    const [images, setImages] = useState([]);
    const PreLoad = async () => {
        if (!param) {
            return;
        }
        await axios.get(`${baseUri.outter_net}/api/v1/post/${param.uid}`)
            .then(res => {
                console.log(res.data);
                titleInput.onChangeText(res.data.title);
                _contentInput.onChangeText(res.data.contents);
                setImages(res.data.media);
            })
            .catch(e => {
                console.log(e);
            });
    }
    const UploadPost = async () => {
        console.log("Upload!");
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
        });
        PreLoad();
    }, [])
    return (
        <View style={Style.Container}>
            <View style={Style.Header}>
                <TextInput
                    {...titleInput}
                    style={Style.Input}
                    placeholder={'제목'}
                    returnKeyType="next"
                />
            </View>
            <View style={Style.Body}>
                <TextInput
                    {..._contentInput}
                    style={Style.Content}
                    placeholder={'내용'}
                    returnKeyType="next"
                    multiline={true}
                    autoCorrect={false}
                />
            </View>
            <View style={Style.Bottom}>
                <TouchableOpacity style={Style.Button} onPress={() => navigation.navigate("UploadImage")}>
                    <Text>UploadImage</Text>
                </TouchableOpacity>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    onMomentumScrollEnd={
                        () => { console.log('Scrolling is End') }
                    }
                >

                    {images?.map(m => {
                        return (
                            <TouchableOpacity>
                                <Image style={Style.Photo} source={{ uri: `${baseUri.outter_net}/api/v1/media/${m}` }} />
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
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
        height: 280,
        marginBottom: 0,
        backgroundColor: 'pink',
    },
    Input: {
        width: 360,
        height: 40,
        backgroundColor: '#f5f5f5',
        paddingLeft: 10,
    },
    Content: {
        width: 360,
        height: 370,
        backgroundColor: '#f5f5f5',
        paddingLeft: 10,
        textAlignVertical: 'top',
    },
    Photo: {
        width: 150,
        height: 150,
    },
    HeaderRightText: {
        color: 'blue',
        fontSize: 16,
        marginRight: 7,
    },
    Button: {
        width: '100%',
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const FontStyle = StyleSheet.create({
    HeaderRightText: {
        color: 'blue',
        fontSize: 16,
        marginRight: 7,
    }
})
