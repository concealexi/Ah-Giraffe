import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import PetScreen from "../screens/pet/PetScreen";
import TabNavigator from "./TabNavigator";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";


const AppStack = createStackNavigator();

const RootNavigator = () => (
    <NavigationContainer>
        <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"SignInScreen"}>
            <AppStack.Screen name="SignInScreen" component={SignInScreen}/>
            <AppStack.Screen name="SignUpScreen" component={SignUpScreen}/>
            <AppStack.Screen name="Tab" component={TabNavigator} />
            <AppStack.Screen name="PetScreen" component={PetScreen} />
        </AppStack.Navigator>
    </NavigationContainer>
);

export default RootNavigator;
