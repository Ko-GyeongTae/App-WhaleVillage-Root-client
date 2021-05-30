import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default () => {
    const [noticeList, setNoticeList] = useState([]);
    const GetList = async () => {
        await axios.get(`${baseUri.outter_net}/api/v1/post`)
            .then(res => {
                console.log(res.data);
                setNoticeList(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }
    useEffect(() => {
        GetList();
    }, []);
    return (
        <View style={Style.Container}>
            <View style={Style.Header}>

            </View>
            <ScrollView
                contentContainerStyle={{
                    width: "100%",
                    height: "90%",
                    alignItems: "center",
                }}
            >
                {noticeList.length === 0 && <Text>게시물이 없습니다.</Text>}
                {noticeList?.map(notice => (
                    <NoticeBox
                        onPress={() => navigation.navigate("NoticeDetail", notice)}
                        key={notice.uid}
                        content={notice.content}
                        date={notice.date}
                        postUid={notice.uid}
                        title={notice.title}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%'
    },
    Header: {
        width: '100%',
        height: '10%',
        backgroundColor: '#ffffff',
    },
    Body: {
        width: '100%',
        height: '90%',
    }
});