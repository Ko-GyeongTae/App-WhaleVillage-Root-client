import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUri } from '../../env';

export default function ImagePickerExample({navigation, route}) {
    const [image, setImage] = useState();
    const [uploadedImage, setUploadedImage] = useState();
    let obj;
    const uploadImage = async () => {
        const GetToken = async () => {
            const token = await AsyncStorage.getItem("jwt");
            return token;
        };
        const token = await GetToken();
       
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('media', {
            uri: obj.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });
        xhr.open('POST', `${baseUri.outter_net}/api/v1/media`);
        xhr.setRequestHeader('authentication', token);
        xhr.send(formData);
        xhr.addEventListener("progress", updateProgress);
        xhr.addEventListener("load", transferComplete);
        xhr.addEventListener("error", transferFailed);
        xhr.addEventListener("abort", transferCanceled);
        // progress on transfers from the server to the client (downloads)
        function updateProgress (oEvent) {
          if (oEvent.lengthComputable) {
            return <Text>Loading</Text>
            // ...
          } else {
            // Unable to compute progress information since the total size is unknown
          }
        }

        function transferComplete(evt) {
          console.log(xhr.responseText);
          Alert.alert('성공적으로 업로드했습니다.');
          route.params(xhr.response);
          setUploadedImage(xhr.responseText);
          console.log("The transfer is complete.");
        }

        function transferFailed(evt) {
          console.log("An error occurred while transferring the file.");
        }

        function transferCanceled(evt) {
          console.log("The transfer has been canceled by the user.");
        }

    }
    const HeaderRight = () => (
        <TouchableOpacity onPress={() => {
            navigation.navigate("WritePost", uploadedImage);
        }}>
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
        return console.log(uploadedImage);
    }, [uploadImage]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            //setImage(result);
            obj = result;
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{ height: '50%', alignItems: 'center', paddingTop: 50}}>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator = {true}
                    onMomentumScrollEnd ={
                        () => {console.log('Scrolling is End')}
                    }
                >
                    {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
                </ScrollView>
            </View>
            <View style={{ height: '50%' }}>
                <TouchableOpacity onPress={() => uploadImage()}>
                    <Text style={{fontSize: 24}}>Upload!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const FontStyle = StyleSheet.create({
    HeaderRightText: {
        color: 'blue',
        fontSize: 16,
        marginRight: 7,
    }
})
