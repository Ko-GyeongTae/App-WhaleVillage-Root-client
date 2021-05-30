import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import NoticeSetting from "../screens/NoticeSetting";
import WritePost from "../screens/WritePost";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="WritePost" component={WritePost} />
      <Stack.Screen name="NoticeSetting" component={NoticeSetting} />
    </Stack.Navigator>
  </NavigationContainer>
);
