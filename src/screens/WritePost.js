import React, { useEffect } from "react";
import { Text, View, StyleSheet, Alert, TextInput, Keyboard, Image, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useInput from "../hooks/useInput";
import contentInput from "../hooks/contentInput";
import { useState } from "react";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { baseUri } from "../../env";

export default function UploadForm({ navigation, route }) {
    const [writing, setWriting] = useState(true);
    const [uploadedImage, setUploadedImage] = useState([]);
    const [uploadingImage, setUploadingImage] = useState(false);
    let image = {};
    const titleInput = useInput("");
    const _contentInput = contentInput("");
    const GetToken = async () => {
        const token = await AsyncStorage.getItem("jwt");
        return token;
    };
    const PreLoad = async () => {
        if (!route.params) {
            return;
        }
    }
    const UploadPost = async () => {
        const { value: title } = titleInput;
        const { value: content } = _contentInput;
        const token = await GetToken();
        if (title !== "" && content !== "") {
            await axios.post(`${baseUri.outter_net}/api/v1/post`, {
                "title": title,
                "content": content,
                "medias": uploadedImage,
            }, {
                headers: {
                    'authentication': token
                }
            })
                .then(res => {
                    console.log(res.data);
                })
                .catch(e => {
                    console.log(e);
                })
            titleInput.onChangeText("");
            _contentInput.onChangeText("");
            navigation.navigate("Home");
            Keyboard.dismiss();
            Alert.alert("게시글 작성에 성공하였습니다.");
        } else {
            Keyboard.dismiss();
            Alert.alert("내용을 확인해주세요.");
        }
    }
    const pickImage = async () => {
        setWriting(false);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All
        });
        if (!result.cancelled) {
            //setImage(result);
            image = result;
            console.log(result);
        }
        Alert.alert(
            '업로드하시겠습니까?',
            '',
            [
                {
                    text: '예',
                    onPress: () => uploadImage(),
                },
                {
                    text: '아니오',
                    onPress: () => null,
                }
            ],
        );
    };

    const uploadImage = async () => {
        setUploadingImage(true);
        Alert.alert("이미지 업로드 중입니다. 잠시만 기다려주세요.")
        const token = await GetToken();
        const media = new FormData();
        
        media.append('media', {
            uri: image.uri,
            name: "media",
            type: 'multipart/form-data'
        });
        const config = { headers: { 
            'Content-Type': 'multipart/form-data',
            'authentication': token,  
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted)
            }
        } };
        console.log(media, config);
        await axios
            .post(`${baseUri.outter_net}/api/v1/media`, media, config)
            .then(res => {
                console.log(res.data);
                Alert.alert('이미지 업로드에 성공했습니다.');
                setUploadedImage(oldList => [...oldList, res.data.uid]);
                console.log(uploadedImage);
                setUploadingImage(false);
            })
            .catch(err => {
                console.log(err);
                setUploadingImage(false);
                Alert.alert('이미지 업로드에 실패했습니다.');
            });
            
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
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        PreLoad();
        console.log(image, uploadedImage);
    }, [writing, uploadingImage]);
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
                    returnKeyType="done"
                    multiline={true}
                    autoCorrect={false}
                />
            </View>
            <View style={Style.Bottom}>
                <TouchableOpacity style={Style.Button} onPress={() => pickImage()}>
                    <Text>UploadImage</Text>
                </TouchableOpacity>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    onMomentumScrollEnd={
                        () => { console.log('Scrolling is End') }
                    }
                >
                    {uploadedImage.map(img => {
                        <Image source={{uri: `${baseUri.outter_net}/api/v1/media/${img}`}}/>
                    })}
                </ScrollView>
            </View>
        </View>
    );
}

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#687DFB",
    },
    Header: {
        width: '100%',
        height: '10%',
        marginTop: 0,
        backgroundColor: "#687DFB",
        alignItems: 'center',
        justifyContent: 'center',
    },
    Body: {
        height: '30%',
        backgroundColor: "#687DFB",
        alignItems: 'center',
    },
    Bottom: {
        width: '100%',
        height: '45%',
        marginBottom: 0,
        backgroundColor: "#f5f5f5",
    },
    Input: {
        width: 340,
        height: 40,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
    },
    Content: {
        width: 340,
        height: 200,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        textAlignVertical: 'top',
        flexShrink: 1,
        textAlign: "left",
        textAlignVertical: "top"
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
        backgroundColor: '#ffffff',
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
