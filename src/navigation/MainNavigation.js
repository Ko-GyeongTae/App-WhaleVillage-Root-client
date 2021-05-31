import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import NoticeSetting from "../screens/NoticeSetting";
import WritePost from "../screens/WritePost";
import UploadImage from "../screens/UploadImage";
import EditPost from "../screens/EditPost";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" options={{headerTitle: '홈'}}>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="WritePost" component={WritePost} options={{headerTitle: '공지작성'}}/>
      <Stack.Screen name="EditPost" component={EditPost} options={{headerTitle: '공지수정'}}/>
      <Stack.Screen name="NoticeSetting" component={NoticeSetting} options={{headerTitle: '공지목록'}}/>
      <Stack.Screen name="UploadImage" component={UploadImage} options={{headerTitle: '업로드'}}/>
    </Stack.Navigator>
  </NavigationContainer>
);
