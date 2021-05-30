
import * as MediaLibrary from 'expo-media-library';
import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import {
    Button,
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";

export default () => {
    const [ok, setOk] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [chosenPhoto, setChosenPhoto] = useState("");
    const getPhotos = async () => {
        const { assets: photos } = await MediaLibrary.getAssetsAsync();
        setPhotos(photos);
        setChosenPhoto(photos[0]?.uri);
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
        }
    };
    useEffect(() => {
        getPermissions();
        getPhotos();
    }, []);
    const numColumns = 4;
    const { width } = useWindowDimensions();
    const choosePhoto = (uri) => {
        setChosenPhoto(uri);
    };
    const renderItem = ({ item: photo }) => (
        <TouchableOpacity onPress={() => choosePhoto(photo.uri)}>
            <Image
                source={{ uri: photo.uri }}
                style={{ width: width / numColumns, height: 100 }}
            />
            <View style={Style.IconContainer}>
                <Ionicons name="checkmark-circle" size={18} color="white" />
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={Style.Container}>
            <View style={Style.Top}>
                {chosenPhoto !== "" ? (
                    <Image
                        source={{ uri: chosenPhoto }}
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
})
