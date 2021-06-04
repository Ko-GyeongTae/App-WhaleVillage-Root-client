import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  const HomeHeader = require('../../assets/whalevillage/admin/AdminHeader.png');
  const SetPost = require('../../assets/whalevillage/admin/SetPost.png');
  const EditPost = require('../../assets/whalevillage/admin/EditPost.png');
  const WritePost = require('../../assets/whalevillage/admin/WritePost.png');
  const YoutubeLink = require('../../assets/whalevillage/admin/YoutubeLink.png');
  const PodbbangLink = require('../../assets/whalevillage/admin/Podbbang.png');
  return (
    <View style={Style.Container}>
      <Image style={Style.Image} source={HomeHeader} />
      <View style={Style.Grid}>
        <TouchableOpacity onPress={() => navigation.navigate("WritePost")}>
          <Image style={Style.ButtonArea} source={WritePost} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("EditPost")}>
          <Image style={Style.ButtonArea} source={EditPost} />
        </TouchableOpacity>
      </View>
      <View style={Style.Grid}>
        <TouchableOpacity onPress={() => navigation.navigate("NoticeSetting")}>
          <Image style={Style.ButtonArea} source={SetPost} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SetYoutubeLink")}>
          <Image style={Style.ButtonArea} source={YoutubeLink} />
        </TouchableOpacity>
      </View>
      <View style={Style.Bottom} source={Style.Bottom}>
        <TouchableOpacity onPress={() => navigation.navigate("SetPodbbangLink")}>
          <Image style={Style.Bottom} source={PodbbangLink} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

const Style = StyleSheet.create({
  Container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#687DFB',
  },
  ButtonArea: {
    width: 120,
    height: 130,
    backgroundColor: 'red',
    marginLeft: 5,
    marginRight: 5,
  },
  Grid: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    width: 240,
    height: 140,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  Image: {
    width: 265,
    height: 190,
    marginTop: 90,
    marginBottom: 30,
  },
  Bottom: {
    width: 250,
    height: 90,
  }
});