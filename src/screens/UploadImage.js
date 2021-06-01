/*
import * as MediaLibrary from 'expo-media-library';
import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import axios from 'axios';
import { baseUri } from '../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ navigation }) => {
    const [ok, setOk] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [chosenPhoto, setChosenPhoto] = useState("");
    const getPhotos = async () => {
        const { assets: photos } = await MediaLibrary.getAssetsAsync();
        console.log(photos)
        setPhotos(photos);
        setChosenPhoto(photos[0]);
    };
    const GetToken = async () => {
        const token = await AsyncStorage.getItem("jwt");
        return token;
    };
    const getPermissions = async () => {
        const {
            accessPrivileges,
            canAskAgain,
        } = await MediaLibrary.getPermissionsAsync();
        if (accessPrivileges === "none" && canAskAgain) {
            const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
            if (accessPrivileges !== "none") {
                setOk(true);
                getPhotos();
            }
        } else if (accessPrivileges !== "none") {
            setOk(true);
            getPhotos();
        }
    };
    const uploadImage = async() => {
        const formData = new FormData();
        const token = await GetToken();

        const config = {
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                authentication: token 
            },
        };
        console.log(chosenPhoto);
        formData.append("media", chosenPhoto.uri);

        await axios.post(`${baseUri.outter_net}/api/v1/media`, formData, config)
            .then(res => {
                console.log(res.data);
                navigation.navigate("WritePost", res.data);
            })
            .catch(e => {
                console.log(e.response.data);
            });
    }
    const HeaderRight = () => (
        <TouchableOpacity
            onPress={() =>
                uploadImage()
            }
        >
            <Text style={FontStyle.HeaderRightText}>Next</Text>
        </TouchableOpacity>
    );
    useEffect(() => {
        getPermissions();
    }, []);
    useEffect(() => {
        navigation.setOptions({
            headerRight: HeaderRight,
        });
    }, []);
    const numColumns = 4;
    const { width } = useWindowDimensions();
    const choosePhoto = (uri) => {
        console.log(uri);
        setChosenPhoto(uri);
    };
    const renderItem = ({ item: photo }) => (
        console.log(photo),
        <TouchableOpacity onPress={() => choosePhoto(photo)}>
            <Image
                source={{ uri: photo.uri }}
                style={{ width: width / numColumns, height: 100 }}
            />
            <View style={Style.IconContainer}>
                <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={photo.uri === chosenPhoto.uri ? 'blue' : "white"}
                />
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={Style.Container}>
            <View style={Style.Top}>
                {chosenPhoto !== "" ? (
                    <Image
                        source={{ uri: chosenPhoto.uri }}
                        style={{ width, height: "100%" }}
                    />
                ) : null}
            </View>
            <View style={Style.Bottom}>
                <FlatList
                    data={photos}
                    numColumns={numColumns}
                    keyExtractor={(photo) => photo.id}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
}

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'black',
    },
    Top: {
        flex: 1,
        backgroundColor: 'black',
    },
    Bottom: {
        flex: 1,
        backgroundColor: 'black',
    },
    IconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 0,
    }
});

const FontStyle = StyleSheet.create({
    HeaderRightText: {
        color: 'blue',
        fontSize: 16,
        marginRight: 7,
    }
})
*/
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUri } from '../../env';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const uploadImage = async() => {
    const formData = new FormData();
    const GetToken = async () => {
        const token = await AsyncStorage.getItem("jwt");
        return token;
    };
    const token = await GetToken();

    const config = {
        headers: { 
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            authentication: token 
        },
    };
    console.log(image.uri);
    formData.append('media', image.uri);
    console.log(formData);

    await axios.post(`${baseUri.outter_net}/api/v1/media`, formData, config)
        .then(res => {
            console.log(res.data);
            navigation.navigate("WritePost", res.data);
        })
        .catch(e => {
            console.log(e.response.data);
        });
 }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity onPress={() => uploadImage()}>
          <Text>Upload!</Text>
      </TouchableOpacity>
    </View>
  );
}
