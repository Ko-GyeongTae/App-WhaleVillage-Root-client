import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import NoticeSetting from "../screens/NoticeSetting";
import WritePost from "../screens/WritePost";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" options={{headerTitle: '홈'}}>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="WritePost" component={WritePost} options={{headerTitle: '공지작성'}}/>
      <Stack.Screen name="NoticeSetting" component={NoticeSetting} options={{headerTitle: '공지목록'}}/>
    </Stack.Navigator>
  </NavigationContainer>
);
