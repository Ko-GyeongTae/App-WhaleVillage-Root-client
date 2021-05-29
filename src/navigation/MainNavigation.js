import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import MediaList from '../screens/MediaList';
import NoticeList from '../screens/NoticeList';
import NoticeDetail from '../screens/NoticeDetail';
import Podbbang from '../screens/Podbbang';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MediaList" component={MediaList} />
      <Stack.Screen name="NoticeList" component={NoticeList} />
      <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
      <Stack.Screen name="Podbbang" component={Podbbang} />
    </Stack.Navigator>
  </NavigationContainer>
);
