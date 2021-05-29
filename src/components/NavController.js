import React from "react";
import { View } from "react-native";
import { useIsLoggedIn } from "../../AuthContext";
import MainNavigation from "../navigation/MainNavigation";
import Login from "../screens/Login";

export default () => {
    const isLoggedIn = useIsLoggedIn();
    console.log(isLoggedIn);
    return (
        <View style={{flex:1}}>
            {isLoggedIn ? <MainNavigation/> : <Login/>}
        </View>
    );
}