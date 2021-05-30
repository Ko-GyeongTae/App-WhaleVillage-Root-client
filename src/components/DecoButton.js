import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, TouchableOpacity, StyleSheet, View, Text } from "react-native";

const default_color = "#84A9AC";
const white_color = "#ffffff";

const Style = StyleSheet.create({
  TouchArea:{
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  Container: {
    backgroundColor: default_color,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 25,
    width: '64.4%',
  }
})

const FontStyle = StyleSheet.create({
  ButtonText:{
    color: white_color,
    textAlign: 'center',
    fontSize: 20,
  }
})


const DecoButton = ({ text, onPress, bgColor = null}) => (
  <TouchableOpacity style={ Style.TouchArea} onPress={onPress}>
    <View style={Style.Container} bgColor={bgColor}>
      <Text stlye={FontStyle.ButtonText} bgColor={bgColor}>{text}</Text>
    </View>
  </TouchableOpacity>
);

DecoButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default DecoButton;
