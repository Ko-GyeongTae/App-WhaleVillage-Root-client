import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import PTRView from "react-native-pull-to-refresh";
import { baseUri } from "../../env";
import PodbbangBox from "../components/PodbbangBox";

export default ({navigation}) => {
    const [podbbangList, setPodbbangList] = useState([]);
    const getList = async() => {
        await axios.get(`${baseUri.outter_net}/api/v1/link/youtube`)
        .then(res => {
            setPodbbangList(res.data);
        })
        .catch(e => {
            console.log(e);
        })
    } 

    const count = podbbangList.length;
    useEffect(() => {
        getList()
    }, []);

    return (
        <View style={Component.Container}>
            <View style={Style.Body}>
                <PTRView
                    style={Component.List}
                    onRefresh={() => {
                        getList();
                        console.log('refresh!');
                    }}
                    pullHeight={400}
                >

                    <ScrollView
                        contentContainerStyle={{
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                        }}
                    >
                        {count === 0 && <Text>게시물이 없습니다.</Text>}
                        {podbbangList?.map(m => (
                            <PodbbangBox 
                                onPress={() => getList()}
                                key={m.uid}
                                title={m.title}
                                uid={m.uid}
                                isPrimary={m.isPrimary}
                            />
                        ))}
                    </ScrollView>
                </PTRView>
            </View>
        </View>
    );
};

const Style = StyleSheet.create({
    Body: {
        width: '100%',
        height: '90%',
    },
})

const Component = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
    },
    List:{
        backgroundColor: "#f0f0f0"
    }
})